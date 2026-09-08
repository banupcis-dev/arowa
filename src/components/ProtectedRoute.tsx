import { Navigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
  role: "superadmin" | "unionadmin";
};

function ProtectedRoute({ children, role }: Props) {

  // Super Admin
  if (role === "superadmin") {

    const isSuperAdmin =
      localStorage.getItem("superAdminLogin") === "true";

    return isSuperAdmin
      ? children
      : <Navigate to="/login" replace />;
  }

  // Union Admin
  const currentAdmin = localStorage.getItem("currentAdmin");

  return currentAdmin
    ? children
    : <Navigate to="/login" replace />;
}

export default ProtectedRoute;