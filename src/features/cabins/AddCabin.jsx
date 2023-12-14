import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

export default function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open name={"create-cabin"}>
          <Button>Add Button</Button>
        </Modal.Open>

        <Modal.Window windowName={"create-cabin"}>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}
