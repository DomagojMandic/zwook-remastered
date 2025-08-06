import supabase from "./supabase";
import defaultUserData from "../data/userCreationConfig";

export async function createUser(userData) {
  const { email, password, full_name, ...rest } = userData;

  console.log(rest, "Rest of the data");

  // Checking if the email is already registered
  const { data: existingUser, error: existingUserError } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  // It is handling error codes because it uses .single(). Without this error check,
  // we could check the users.length

  if (existingUserError && existingUserError.code !== "PGRST116") {
    throw new Error(
      `Error checking existing user: ${existingUserError.message}`
    );
  }

  if (existingUser) {
    throw new Error("User with this email already exists.");
  }

  // If the user doesn't exist, proceed to create a new user
  // Unlike when we use .select, createdUser will be an object with prop .user
  let { data: createdUser, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        ...rest,
      },
    },
  });

  if (signUpError) {
    throw new Error(`Error creating user: ${signUpError.message}`);
  }
  // If the user was created successfully in the Auth table,, insert the user data into the users table
  // with the rest of the data provided in the userData object.

  console.log(createdUser.user.user_metadata, "User");
  if (createdUser?.user) {
    const userMeta = createdUser.user.user_metadata || {};

    // Preparing the user object to insert into the users table
    // (the one that we will update) later

    const userToInsert = {
      user_id: createdUser.user.id, // This will be the UUID from the auth.user
      email: createdUser.user.email, // email from auth.user
      // Starting from here, everything is from user_metadata
      full_name: userMeta.full_name || null,
      setup_finished: userMeta.setup_finished || false,
      email_verified: userMeta.verified || false,
      subscribed: userMeta.subscribed || false,
      subscription_start_date: userMeta.subscription_start_date || null,
      subscription_end_date: userMeta.subscription_end_date || null,
      cover_url: userMeta.cover_url || null,
      display_name: userMeta.display_name || "",
    };

    const { error: insertError } = await supabase
      .from("users")
      .insert([userToInsert]);

    if (insertError) {
      // If registering is successful and inserting into the additional table fails
      await supabase.auth.admin.deleteUser(createdUser.user.id);
      throw new Error(`Error inserting user record: ${insertError.message}`);
    }
  }

  return createdUser.user.user_metadata;
}
