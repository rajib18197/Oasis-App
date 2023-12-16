import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const queryClient = useQueryClient();

  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");

  const filters =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const sortByRaw = searchParams.get("sortBy");
  const [field, direction] = sortByRaw?.split("-") || [];

  const sort = field ? { field, direction } : null;

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const {
    data: { bookings, count } = {},
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookings", filters, sort, page],
    queryFn: () => getBookings({ filters, sort, page }),
  });

  const pageSize = Math.ceil(count / 10);

  if (page < pageSize) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filters, sort, page + 1],
      queryFn: () => getBookings({ filters, sort, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filters, sort, page - 1],
      queryFn: () => getBookings({ filters, sort, page: page - 1 }),
    });
  }

  return { bookings, isPending, isError, error, count };
}
