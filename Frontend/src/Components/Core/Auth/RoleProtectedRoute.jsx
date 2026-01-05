import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function RoleProtectedRoute({ children, allowedRoles }) {
  const { user } = useSelector((state) => state.profile);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.accountType)) {
    return <Navigate to="/dashboard/my-profile" />;
  }

  return children;
}

export default RoleProtectedRoute;
