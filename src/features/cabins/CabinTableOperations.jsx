import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

const options = [
  { label: "All", value: "all" },
  {
    label: "Guests(2) - price(250 to 350)",
    value: {
      number: 2,
      range: { min: 250, max: 350 },
    },
  },

  {
    label: "Guests(4) - price(300 to 500)",
    value: {
      number: 4,
      range: { min: 300, max: 500 },
    },
  },

  {
    label: "Guests(6) - price(350 to 800)",
    value: {
      number: 6,
      range: { min: 350, max: 800 },
    },
  },

  {
    label: "Guests(8) - price(600 to 1200)",
    value: {
      number: 8,
      range: { min: 600, max: 1200 },
    },
  },

  {
    label: "Guests(10) - price(1200 to 1800)",
    value: {
      number: 10,
      range: { min: 1200, max: 1800 },
    },
  },
];

export default function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter filterFields="guests-pricerange" options={options} />
    </TableOperations>
  );
}
