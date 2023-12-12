import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUser,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const navLinks = [
  { to: "/dashboard", icon: <HiOutlineHome />, label: "Home" },
  { to: "/bookings", icon: <HiOutlineCalendarDays />, label: "Bookings" },
  { to: "/cabins", icon: <HiOutlineHomeModern />, label: "Cabins" },
  { to: "/users", icon: <HiOutlineUser />, label: "Users" },
  { to: "/settings", icon: <HiOutlineCog6Tooth />, label: "Settings" },
];

export default function MainNav() {
  return (
    <nav>
      <NavList>
        {navLinks.map((link) => (
          <StyledNavLink to={link.to} key={link.to}>
            {link.icon} <span>{link.label}</span>
          </StyledNavLink>
        ))}
      </NavList>
    </nav>
  );
}
