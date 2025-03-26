import { Navigate } from "react-router";
import LoginPage from "../pages/LoginPage";

interface User {
  email: string;
}

// ProtectedLogin Component: Redirects authenticated users away from login page
const ProtectedLogin = () => {
  // Retrieve stored user data from sessionStorage or localStorage
  const storedUser = sessionStorage.getItem("user") || localStorage.getItem("user");

  let user: User | null = null;

  try {
    user = storedUser ? (JSON.parse(storedUser) as User) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
  }

  // If user is already authenticated, redirect to books page, otherwise show login page
  return user ? <Navigate to="/books" replace /> : <LoginPage />;
};

export default ProtectedLogin;
