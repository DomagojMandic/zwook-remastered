import { createContext, use, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { AUTH_CONFIG } from "../data/authConfig";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import {
  clearUser,
  loginUserThunk,
  registerUserThunk,
} from "../redux-slices/userReducer";

const AuthContext = createContext();

function AuthProvider({ children }) {
  /* This Context is used for authenticating the user within the application.
  It's used to solely manage user authentication state and actions but it is refactored
  to Redux Toolkit for a more stable development (hot module fix).*/
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const registerUser = async (userData) => {
    try {
      await dispatch(registerUserThunk(userData)).unwrap();
      toast.success("User created successfully!");
      setTimeout(() => navigate("/home"), 1500);
    } catch (error) {
      toast.error(error);
    }
  };

  const loginUser = async (userData) => {
    try {
      await dispatch(loginUserThunk(userData)).unwrap();
      toast.success("Login successful!");
      setTimeout(() => navigate("/home"), 1500);
    } catch (error) {
      toast.error(error);
    }
  };

  const logoutUser = () => {
    navigate("/login");

    setTimeout(() => {
      dispatch(clearUser());
    }, 1500);
    toast.success("Logout successful!");
  };

  // Form config - used only on login and register pages
  const getFormConfig = () => {
    if (location.pathname === "/login") return AUTH_CONFIG.login;
    if (location.pathname === "/register") return AUTH_CONFIG.register;
    return null;
  };

  const value = {
    user,
    formConfig: getFormConfig(),
    registerUser,
    loginUser,
    logoutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthProvider;
