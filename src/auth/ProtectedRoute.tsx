import { Navigate, Outlet } from "react-router";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

// ProtectedRoute Component: Restricts access to authenticated users only
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const storedUser =
    sessionStorage.getItem("user") || localStorage.getItem("user");

  const user: { email?: string } | null = storedUser
    ? JSON.parse(storedUser)
    : null;
  const isAuthenticated: boolean = !!(user && user.email);

  return isAuthenticated ? (
    <>{children || <Outlet />}</>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
