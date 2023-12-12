import styled from "styled-components";
import Table from "../../ui/Table";
import { format } from "date-fns";
import { formatCurrency } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { HiPencil, HiTrash } from "react-icons/hi2";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const {
    id: cabinId,
    image,
    name,
    regularPrice,
    discount,
    maxCapacity,
  } = cabin;

  return (
    <Table.Row>
      <Img src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{discount}</Discount>
      <div>
        <Menus.Menu>
          <Menus.Toggle id={cabinId} />
          <Menus.List windowId={cabinId}>
            <Menus.Button icon={<HiPencil />}>Update</Menus.Button>
            <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </div>
    </Table.Row>
  );
}

// https://stackoverflow.com/questions/69153796/deeper-understanding-of-react-event-bubbling-propagation-and-state-management
