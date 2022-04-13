import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts";

export default function RequiresAuth({ children }) {
  const { authState } = useAuth();
  const { isSignnedIn, token } = authState;

  const location = useLocation();
  return isSignnedIn ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
}
