import { useNavigation } from "../../contexts/NavigationContext";
import Link from "../../ui/Link";

export default function Router({ path, element }) {
  const { currentPath } = useNavigation();

  const Element = element;

  if (path === currentPath) return Element;

  return null;
}

function Container() {
  return (
    <div>
      <Link to={"/sports"}>Sports</Link>
      <Link to={"/running"}>Running</Link>

      <Router path="/sports" element={<Sports />} />
      <Router path="/running" element={<Running />} />
    </div>
  );
}

export function Sports() {
  return <h1>Sports Component</h1>;
}

export function Running() {
  return <h1>Running Component</h1>;
}
