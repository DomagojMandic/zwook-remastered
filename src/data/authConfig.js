import { MdEmail, MdPerson } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

// This is the configuration for authentication forms.
// Should be used with the FormBase component and FormRows
export const AUTH_CONFIG = {
  login: {
    // Form configuration
    form: {
      title: "Welcome Back",
      subtitle: "Don't have an account yet ?",
      linkText: "Sign Up",
      linkTo: "/register",
      buttonText: "Login",
      googleButtonText: "Authorize with Google",
    },

    // Grid layout configuration
    layout: {
      gridColumnAreas: `"logo logo"
"register register"
"email email"
"password password"
"login login"
"other other"
"google google"`,
      gridTemplateAreasResponsive: `"logo"
"register"
"email"
"password"
"login"
"other"
"google"`,
      width: "max(320px, 50%)",
    },

    // Form fields configuration
    fields: [
      {
        name: "email",
        type: "email",
        placeholder: "Email",
        icon: MdEmail,
        area: "email",
        validation: {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        },
      },
      {
        name: "password",
        type: "password",
        placeholder: "Password",
        icon: RiLockPasswordFill,
        area: "password",
        validation: {
          required: "Password is required",
        },
      },
    ],
  },

  register: {
    // Form configuration
    form: {
      title: "Create Account",
      subtitle: "Already have an account ?",
      linkText: "Sign In",
      linkTo: "/login",
      buttonText: "Sign Up",
      googleButtonText: "Sign Up with Google",
    },

    // Grid layout configuration
    layout: {
      gridColumnAreas: `"logo logo"
"register register"
"name name"
"email email"
"password password"
"confirmPassword confirmPassword"
"login login"
"other other"
"google google"`,
      gridTemplateAreasResponsive: `"logo"
"register"
"name"
"email"
"password"
"confirmPassword"
"login"
"other"
"google"`,
      width: "max(320px, 50%)",
    },

    // Form fields configuration
    fields: [
      {
        name: "fullName",
        type: "text",
        placeholder: "Full Name",
        icon: MdPerson,
        area: "name",
        validation: {
          required: "Full name is required",
          minLength: {
            value: 2,
            message: "Name must be at least 2 characters",
          },
        },
      },
      {
        name: "email",
        type: "email",
        placeholder: "Email",
        icon: MdEmail,
        area: "email",
        validation: {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        },
      },
      {
        name: "password",
        type: "password",
        placeholder: "Password",
        icon: RiLockPasswordFill,
        area: "password",
        validation: {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        },
      },
      {
        name: "confirmPassword",
        type: "password",
        placeholder: "Confirm Password",
        icon: RiLockPasswordFill,
        area: "confirmPassword",
        validation: {
          required: "Please confirm your password",
          validate: (value, { password }) =>
            value === password || "Passwords don't match",
        },
      },
    ],
  },
};

export default AUTH_CONFIG;
