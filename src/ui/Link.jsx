import { useNavigation } from "../contexts/NavigationContext";

export default function Link({ to, children, activeClass }) {
  const { currentPath, navigate } = useNavigation();

  function handleClick(e) {
    e.preventDefault();
    navigate(to);
  }

  return (
    <a
      href={to}
      onClick={handleClick}
      style={currentPath === to ? activeClass : null}
    >
      {children}
    </a>
  );
}
