import CabinTable from "../features/cabins/CabinTable";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

export default function Cabins() {
  return (
    <>
      <Row>
        <Heading as="h1">Cabins Table List</Heading>
        <CabinTableOperations />
      </Row>

      <CabinTable />
    </>
  );
}
