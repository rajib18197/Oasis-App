/**
 * Install all the project and Dev dependencies (react-router || react-query || supabase-client ||          react-hook-form || react-icons || react-toast || styled-components || date-fns )
 * Create and organize files & folders structures (features || pages || services || ui || utils || hooks || contexts || store)
 * Set up Routers (Page Navigation)
 * Create supabase.js file for config variables
 * ==============================
 

 * Then Do the project work feature wise (one by one)
 */

import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const results = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  console.log(results);

  const { data: cabins, isPending, isError, error } = results;

  return { cabins, isPending, isError, error };
}
