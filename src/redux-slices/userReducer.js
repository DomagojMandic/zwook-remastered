import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadKey, removeKey, saveKey } from "../helpers/localStorageHelpers";
import { createUser, signInUser, updateUser } from "../services/apiUsers";
import defaultUserData from "../data/userCreationConfig";

const initialState = {
  user: loadKey("user"),
  isLoadingUser: false,
  isUpdatingUser: false, // Separate loading state for updates
  error: null,
};

/* We are refactoring the AuthContext to use Redux Toolkit. We moved all the logic from
   the AuthContext to the userReducer. */

export const registerUserThunk = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { fullName: full_name, email, password } = userData;
      const signUpData = { full_name, email, password, ...defaultUserData };
      const createdUser = await createUser(signUpData);
      saveKey("user", createdUser);
      return createdUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { cleanEmail: email, password } = userData;
      const loggedUser = await signInUser(email, password);
      saveKey("user", loggedUser);
      return loggedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfileThunk = createAsyncThunk(
  "user/updateProfile",
  async ({ userId, userData }, { rejectWithValue, getState }) => {
    try {
      const updatedUserData = await updateUser(userId, userData);

      // Get current user from state and merge with updated data
      const currentUser = getState().user.user;
      const mergedUser = { ...currentUser, ...updatedUserData[0] };

      // Save updated user to localStorage
      saveKey("user", mergedUser);

      return mergedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Logging users out - it is not async so it doesn't need the builder
    clearUser: (state) => {
      state.user = null;
      state.error = null;
      removeKey("user");
    },
    // Clear error manually if needed
    clearError: (state) => {
      state.error = null;
    },
    // Update user data locally without API call (for optimistic updates if needed)
    updateUserLocal: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        saveKey("user", state.user);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Register thunk used for registering the user to the application
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoadingUser = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoadingUser = false;
        state.error = null;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.error = action.payload;
      })
      // Login thunk used for logging in existing users to the application
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoadingUser = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoadingUser = false;
        state.error = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoadingUser = false;
        state.error = action.payload;
      })
      // Update user profile thunk
      .addCase(updateUserProfileThunk.pending, (state) => {
        state.isUpdatingUser = true;
        state.error = null;
      })
      .addCase(updateUserProfileThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isUpdatingUser = false;
        state.error = null;
      })
      .addCase(updateUserProfileThunk.rejected, (state, action) => {
        state.isUpdatingUser = false;
        state.error = action.payload;
      });
  },
});

export const { clearUser, clearError, updateUserLocal } = userSlice.actions;
export default userSlice.reducer;
