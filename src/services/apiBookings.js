import { supabase } from "./Supabase";

export async function getBookings({ filters, sort, page }) {
  let query = supabase
    .from("bookings")
    .select(
      "id, startDate, endDate, status, numNights, numGuests, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" }
    );

  if (filters) {
    query = query[filters.method || "eq"](filters.field, filters.value);
  }

  if (sort) {
    query = query.order(sort.field, { ascending: sort.direction === "asc" });
  }

  if (page) {
    const from = (page - 1) * 10;
    const to = page * 10 - 1;
    query = query.range(from, to);
  }

  const { data: bookings, error, count } = await query;

  if (error) {
    throw new Error("Bookings could not be loaded");
  }

  return { bookings, count };
}
