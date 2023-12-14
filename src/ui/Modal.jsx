import { cloneElement, createContext, useContext, useState } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.4);
`;

const StyledModal = styled.div`
  padding: 3.2rem 4rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  color: white;
`;

const Button = styled.button`
  position: absolute;
  top: 0;
  right: 4px;
  width: 2rem;
  height: 2rem;
  background-color: var(--color-brand-600);
  color: white;
  border: none;
  outline: none;
  cursor: pointer;
`;

const ModalContext = createContext();

export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const open = setOpenName;
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ name, children }) {
  const { open } = useContext(ModalContext);
  // return
  return cloneElement(children, { onClick: () => open(name) });
}

function Window({ windowName, children }) {
  const { openName, close } = useContext(ModalContext);
  if (openName !== windowName) return null;

  return (
    <Overlay>
      <StyledModal>
        <Button>&times;</Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>
  );
}

Modal.Open = Open;
Modal.Window = Window;
