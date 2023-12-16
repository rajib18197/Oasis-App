import BookingsTable from "../features/bookings/BookingsTable";
import BookingsTableOperations from "../features/bookings/BookingsTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

export default function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading>Bookings List</Heading>
        <BookingsTableOperations />
      </Row>

      <Row>
        <BookingsTable />
      </Row>
    </>
  );
}
