import { useSearchParams } from "react-router-dom";
import Error from "../../ui/Error";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Menus from "../../ui/Menus";

export default function CabinTable() {
  const { cabins, isPending, isError, error } = useCabins();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;

  if (isError)
    return (
      <Error>{error.message || "Could not loaded Cabins. Try again!"}</Error>
    );

  // 1) Filters
  let filteredCabins;

  const filterValueRaw = searchParams.get("guests-pricerange")
    ? searchParams.get("guests-pricerange").split("-")
    : "all";

  const filterValue =
    filterValueRaw !== "all"
      ? {
          guests: Number(filterValueRaw[0]),
          priceRange: {
            min: Number(filterValueRaw[1].split("to")[0]),
            max: Number(filterValueRaw[1].split("to")[1]),
          },
        }
      : filterValueRaw;

  // console.log(filterValue);

  if (filterValue === "all") filteredCabins = cabins;

  if (filterValue !== "all")
    filteredCabins = cabins.filter((cabin) => {
      return (
        cabin.maxCapacity === filterValue.guests &&
        (cabin.regularPrice >= filterValue.priceRange.min ||
          cabin.regularPrice <= filterValue.priceRange.max)
      );
    });

  // console.log(filteredCabins);

  return (
    <Menus>
      <Table columns=".6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div>Image</div>
          <div>Name</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
          data={filteredCabins}
        />
        {/* {filteredCabins.map((cabin) => (
            <CabinRow key={cabin.id} cabin={cabin} />
          ))} */}
      </Table>
    </Menus>
  );
}

// You only know that much information that powerful peoples want you to know.
