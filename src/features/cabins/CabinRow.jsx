import styled from "styled-components";
import Table from "../../ui/Table";
import { format } from "date-fns";
import { formatCurrency } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { HiDocumentDuplicate, HiPencil, HiTrash } from "react-icons/hi2";
import { useDeleteCabin } from "./useDeleteCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateCabinForm from "./CreateCabinForm";
import { useUpdateCabin } from "./useUpdateCabin";
import { useCreateCabin } from "./useCreateCabin";

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

  const {
    deleteCabin,
    isDeleting,
    isError: isDeleteError,
    error: deleteError,
  } = useDeleteCabin();

  const { createCabin, isPending, isError } = useCreateCabin();

  function handleDuplicate() {
    createCabin({
      newCabin: { name, image, regularPrice, discount, maxCapacity },
    });
  }

  return (
    <Table.Row>
      <Img src={image} alt={name} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{discount}</Discount>
      <div>
        <Menus.Menu>
          <Modal>
            <Menus.Toggle id={cabinId} />
            <Menus.List windowId={cabinId}>
              <Menus.Button
                icon={<HiDocumentDuplicate />}
                onClick={handleDuplicate}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open name="update-cabin">
                <Menus.Button icon={<HiPencil />}>Update</Menus.Button>
              </Modal.Open>

              <Modal.Open name="delete-cabin">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window windowName={"update-cabin"}>
              <CreateCabinForm cabinToUpdate={cabin} />
            </Modal.Window>

            <Modal.Window windowName={"delete-cabin"}>
              <ConfirmDelete
                resourceName={name}
                onConfirm={() => deleteCabin(cabinId)}
                disabled={isDeleting}
                isDeleting={isDeleting}
              />
            </Modal.Window>
          </Modal>
        </Menus.Menu>
      </div>
    </Table.Row>
  );
}

// https://stackoverflow.com/questions/69153796/deeper-understanding-of-react-event-bubbling-propagation-and-state-management
