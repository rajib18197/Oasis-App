import Error from "../../ui/Error";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import BookingRow from "./BookingRow";
import { useBookings } from "./useBookings";

export default function BookingsTable() {
  const { bookings, isPending, isError, error, count } = useBookings();
  console.log(bookings);

  if (isPending) return <Spinner />;

  if (isError) return <Error>{error}</Error>;

  return (
    <Menus>
      <Table columns={"0.6fr 1.2fr 1.8fr .6fr .6fr 3.2rem"}>
        <Table.Header>
          <div>Cabin</div>
          <div>Guests</div>
          <div>Dates</div>
          <div>status</div>
          <div>Price</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Menus>
  );
}
