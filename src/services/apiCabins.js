import { SUPABASE_URL, supabase } from "./Supabase";

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

export async function createUpdateCabin({ id, newCabin }) {
  console.log(id, newCabin);
  const hasImagePath = newCabin.image?.startsWith?.(SUPABASE_URL);

  const imageName = hasImagePath
    ? newCabin.image
    : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${SUPABASE_URL}/storage/v1/object/public/images/${imageName}`;

  // https://vgialvtyczmfhhusvvkm.supabase.co/storage/v1/object/public/images/cabin-001.jpg
  let query = supabase.from("cabins");

  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select();

  if (error) {
    console.log(error);
    throw error;
  }

  if (hasImagePath) {
    return { cabin: data };
  }

  const { data: storage, error: storageError } = await supabase.storage
    .from("images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await deleteCabin(data.id);
    console.log(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  console.log(storage);

  return { cabin: data, storageImage: storage };
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
