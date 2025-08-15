import { Navigate } from "react-router";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.user);

  if (!user) {
    toast.error("You must be logged in to access this page.");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
