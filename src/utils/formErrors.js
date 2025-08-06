import { toast } from "react-hot-toast";

/**
 * Handle form errors by displaying a toast notification for the first error.
 * @param {*} errors - The errors object from react-hook-form.
 */

export const onError = (errors) => {
  // Find the first error and toast it
  const firstError = Object.values(errors)[0];
  if (firstError) {
    toast.error(firstError.message, {
      position: "bottom-center",
    });
  }
};
