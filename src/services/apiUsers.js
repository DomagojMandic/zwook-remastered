import { getStorageImagePath } from "../helpers/helpers";
import supabase, { SUPABASE_URL } from "./supabase";

const DEFAULT_PROFILE_PIC =
  "https://abawfcbqrulsptzzrfta.supabase.co/storage/v1/object/public/images/users/defaultProfilePicture.jpg";

/* User UUID is in the user_id column of the users table (non auth table) */
export async function getUser(uuid) {
  const { data: user, error: getUserError } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", uuid)
    .single();

  if (getUserError) {
    throw new Error(`Error fetching user: ${getUserError.message}`);
  }

  return user;
}

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

  if (createdUser?.user) {
    const userMeta = createdUser.user.user_metadata || {};

    // Preparing the user object to insert into the users table
    // (the one that we will update later)

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
      // we delete the user in the auth table
      await supabase.auth.admin.deleteUser(createdUser.user.id);
      throw new Error(`Error inserting user record: ${insertError.message}`);
    }
    return userToInsert;
  }
}

export async function signInUser(email, password) {
  let { data: user, error: signInError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (signInError) {
    throw new Error(`Error while signing in: ${signInError.message}`);
  }

  if (user.user.id) {
    return getUser(user.user.id);
  }
}

/**
 * Updates user profile with new information and optionally a new profile image
 * Handles rollback if any part of the update process fails
 */
export async function updateUser(uuid, userData) {
  // Input validation
  if (!userData) {
    throw new Error("User data is required");
  }

  if (userData.HasNewImage && !userData.file) {
    throw new Error("File is required when HasNewImage is true");
  }

  // If no new image, just update the database directly
  if (!userData.HasNewImage || !userData.file) {
    const { data, error } = await supabase
      .from("users")
      .update({
        display_name: userData.displayName,
        full_name: userData.fullName || null,
      })
      .eq("user_id", uuid)
      .select();

    if (error) {
      throw new Error(`Failed to update user data: ${error.message}`);
    }

    return data;
  }

  // Keeping track of initial state for potential rollback
  const originalCoverUrl = userData.cover_url;
  let newCoverUrl = originalCoverUrl;
  let newUploadedPath = null;
  let bucket = null;
  let oldRelativePath = null;

  try {
    // Handle image upload if a new image is provided
    if (userData.HasNewImage && userData.file) {
      // Extract storage bucket info from current cover URL
      const storageInfo = getStorageImagePath(userData.cover_url);
      bucket = storageInfo.bucket;
      oldRelativePath = storageInfo.relativePath;

      // Create new filename with users/ prefix
      const newFileName = `users/${userData.fileName}`;
      newUploadedPath = newFileName;

      // Upload the new image to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(newFileName, userData.file, { upsert: true });

      // If upload fails, we don't need to rollback anything yet
      if (uploadError) {
        throw new Error(`Failed to upload new image: ${uploadError.message}`);
      }

      // Construct the new public URL
      newCoverUrl = `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${newFileName}`;
    }

    // Try to update user record in database first
    const { data, error: updateError } = await supabase
      .from("users")
      .update({
        cover_url: newCoverUrl,
        display_name: userData.displayName,
        full_name: userData.fullName || null,
      })
      .eq("user_id", uuid)
      .select();

    if (updateError) {
      throw new Error(`Failed to update user data: ${updateError.message}`);
    }

    // Only delete old image after successful database update
    if (userData.cover_url !== DEFAULT_PROFILE_PIC && oldRelativePath) {
      const { error: deleteError } = await supabase.storage
        .from(bucket)
        .remove([oldRelativePath]);

      // Log deletion error but don't fail the entire operation
      if (deleteError) {
        console.warn(`Failed to delete old image: ${deleteError.message}`);
      }
    }

    return data;
  } catch (error) {
    // Rollback process if anything fails
    try {
      // Delete any newly uploaded image
      if (newUploadedPath && bucket) {
        await supabase.storage.from(bucket).remove([newUploadedPath]);
      }
    } catch (rollbackError) {
      // Log rollback errors but throw the original error
      console.error(
        "Error during rollback - failed to delete uploaded image:",
        rollbackError
      );
    }

    try {
      // Revert database changes if cover_url was changed
      if (newCoverUrl !== originalCoverUrl) {
        await supabase
          .from("users")
          .update({ cover_url: originalCoverUrl })
          .eq("user_id", uuid);
      }
    } catch (rollbackError) {
      // Log rollback errors but throw the original error
      console.error(
        "Error during rollback - failed to revert database changes:",
        rollbackError
      );
    }

    // Throw the original error
    throw error;
  }
}
