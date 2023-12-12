import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const urlFilterSting = function (obj) {
  // Check if the value is an object or Not.
  // If typeof yourVariable === 'object', it's an object or null.
  // If you want null, arrays or functions to be excluded, just make it:

  const str =
    typeof obj === "object" && !Array.isArray(obj) && obj !== null
      ? `${obj.number}-${obj.range.min}to${obj.range.max}`
      : obj;

  return str;
};

export default function Filter({ filterFields, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilterValue =
    searchParams.get(filterFields) || options.at(0).value;

  function handleClick({ number, range }) {
    // If value is all then we remove the url string of this filter
    if (!number && !range) {
      searchParams.delete(filterFields);
      setSearchParams(searchParams);
      return;
    }

    searchParams.set(filterFields, `${number}-${range.min}to${range.max}`);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value?.number || option.value}
          active={
            currentFilterValue === urlFilterSting(option.value)
              ? "true"
              : undefined
          }
          onClick={() =>
            handleClick({
              number: option.value?.number,
              range: option.value?.range,
            })
          }
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}
