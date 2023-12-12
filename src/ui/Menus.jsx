import { createContext, useContext, useEffect, useRef, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: var(--color-grey-600);
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-200);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  top: ${(props) => `${props.position.y}px`};
  right: ${(props) => `${props.position.x}px`};
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

export default function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState({});
  const open = setOpenId;
  const close = () => setOpenId("");

  useEffect(
    function () {
      if (openId) {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft =
          window.scrollX || document.documentElement.scrollLeft;

        window.onscroll = function () {
          window.scrollTo(scrollLeft, scrollTop);
        };
      } else {
        window.onscroll = function () {};
      }
    },
    [openId]
  );

  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, position, setPosition, open, close } =
    useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    // openId === id || openId !== "" ? close() : open(id);
    open((cur) => (cur === id ? "" : id));
    // console.log(openId);
    // console.log(id);
    // openId === id ? close() : open(id);

    const targetElementCoords = e.target
      .closest("button")
      .getBoundingClientRect();

    // console.log(targetElementCoords);
    // console.log(
    //   window.innerWidth - (targetElementCoords.left + targetElementCoords.width)
    // );
    // Need to fix it
    setPosition({
      x: window.innerWidth - targetElementCoords.x - targetElementCoords.width,
      y: targetElementCoords.y + targetElementCoords.height + 8,
    });
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ windowId, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const refEl = useRef();

  useEffect(
    function () {
      function handleClose(e) {
        if (refEl.current && !refEl.current.contains(e.target)) {
          close();
        }
      }

      document.addEventListener("click", handleClose);

      return () => {
        document.removeEventListener("click", handleClose);
      };
    },
    [close]
  );

  if (windowId !== openId) return null;

  return (
    <StyledList ref={refEl} position={position}>
      {children}
    </StyledList>
  );
}

function Button({ icon, children }) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    close();
  }

  return (
    <StyledButton onClick={handleClick}>
      {icon}
      <span>{children}</span>
    </StyledButton>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
