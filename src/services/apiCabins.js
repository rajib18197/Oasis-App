import { supabase } from "./Supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("Could not load cabins data. //CUSTOMIZE//");
  }

  return cabins;
}

export async function getCabin(id) {
  const { data: cabin, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id);

  if (error) {
    throw new Error("Could not load cabin data. //CUSTOMIZE//");
  }

  return cabin;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Could not load cabins data. //CUSTOMIZE//");
  }

  return {
    data: `Cabin Id- ${id} successfully deleted. //CUSTOMIZE_DELETE_MESSAGE//`,
  };
}
