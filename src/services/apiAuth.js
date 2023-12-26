import { SUPABASE_URL, supabase } from "./Supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(err);
    throw err;
  }

  return data;
}

export async function getCurrentUser() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  console.log(session);
  if (!session) return null;

  if (error) {
    console.error(err);
    throw err;
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error(userError);
    throw err;
  }
  console.log(user);
  return user;
}

export async function updateCurrentUser({ fullName, password, avatar }) {
  let updatedData = {};
  if (password) updatedData = { password };
  if (fullName) updatedData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updatedData);

  if (error) {
    console.error(err);
    throw err;
  }

  console.log(data);
  if (!avatar) return;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { data: avatarData, error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  console.log(avatarData);

  const { data: updatedUser, error: updatedError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  console.log(updatedUser);

  if (updatedError) {
    console.error(updatedError);
    throw err;
  }
}
