import styled from "styled-components";
import Table from "../../ui/Table";
import { format, isToday } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import Tag from "../../ui/Tag";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import { HiCheck, HiOutlineEye, HiTrash } from "react-icons/hi2";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

export default function BookingRow({
  booking: {
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const mapStatusToColor = {
    unconfirmed: "blue",
    "checked-out": "green",
    "checked-in": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>
      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} stay
        </span>

        <span>
          {format(new Date(startDate), "MMM dd yy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd, yy")}
        </span>
      </Stacked>

      <Tag type={mapStatusToColor[status]}>{status.split("-").join("")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Menus.Menu>
        <Menus.Toggle />
        <Menus.List>
          <Menus.Button icon={<HiCheck />}>Check in</Menus.Button>

          <Menus.Button icon={""}>Check out</Menus.Button>

          <Menus.Button icon={<HiOutlineEye />}>See Details</Menus.Button>

          <Modal>
            <Modal.Open name={"delete-booking"}>
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>

            <Modal.Window windowName={"delete-booking"}></Modal.Window>
          </Modal>
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}
