import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get("sortBy") || "";

  function handleSelect(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return <Select options={options} onChange={handleSelect} value={value} />;
}
