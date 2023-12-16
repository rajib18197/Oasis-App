import { FilterRegular } from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

export default function BookingsTableOperations() {
  return (
    <TableOperations>
      <FilterRegular
        filterFields={"status"}
        options={[
          { value: "all", label: "All" },
          { value: "checked-in", label: "Checked in" },
          { value: "checked-out", label: "Checked out" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-asc", label: "Sort By Date (earlier first)" },
          { value: "startDate-desc", label: "Sort By Date (recents first)" },
          { value: "totalPrice-asc", label: "Sort By Date (low first)" },
          { value: "totalPrice-desc", label: "Sort By Date (high first)" },
        ]}
      />
    </TableOperations>
  );
}
