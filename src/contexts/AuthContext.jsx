import { createContext, use, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { AUTH_CONFIG } from "../data/authConfig";
import defaultUserData from "../data/userCreationConfig";
import toast from "react-hot-toast";
import { createUser, signInUser } from "../services/apiUsers";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const AuthContext = createContext();

function AuthProvider({ children }) {
  /* Getting information from local storage upon initial render */
  const [user, setUser] = useLocalStorageState(null, "user");
  const location = useLocation();
  const navigate = useNavigate();

  // Auth functions
  const login = async () => {};
  const logout = () => setUser(null);

  const registerUser = async (userData) => {
    try {
      // Receives the user data from the register form and combines it with
      // default user data to create a new user in the database
      const { fullName: full_name, email, password } = userData;

      const signUpData = { full_name, email, password, ...defaultUserData };

      const createdUser = await createUser(signUpData);

      if (createdUser) {
        setUser(createdUser);
        localStorage.setItem("user", createdUser);
        toast.success("User created successfully!");
      }
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  const loginUser = async (userData) => {
    const { cleanEmail: email, password } = userData;

    const loggedUser = await signInUser(email, password);

    if (loggedUser) {
      setUser(loggedUser);
      toast.success("Log in successful !");
    }
    setTimeout(() => {
      navigate("/home");
    }, 1500);
  };

  // Form config - used only on login and register pages
  const getFormConfig = () => {
    if (location.pathname === "/login") return AUTH_CONFIG.login;
    if (location.pathname === "/register") return AUTH_CONFIG.register;
    return null;
  };

  const value = {
    user,
    login,
    logout,
    formConfig: getFormConfig(),
    registerUser,
    loginUser,
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
