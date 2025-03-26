import { createBrowserRouter, RouterProvider } from "react-router";
import BookListPage from "../pages/BookListPage";
import ProtectedRoute from "../auth/ProtectedRoute";
import Navbar from "../components/Navbar";
import NotFound from "../pages/NotFoundPage";
import ProtectedLogin from "./ProtectedLogin";

// Define application routes
const router = createBrowserRouter([
  {
    path: "/login",
    element: <ProtectedLogin />, // Login page with access restrictions
  },
  {
    path: "/books",
    element: (
      <ProtectedRoute> {/* Ensures only authenticated users can access */}
        <Navbar />
        <BookListPage />
      </ProtectedRoute>
    ),  
  },
  {
    path: "*",
    element: <NotFound />, // Handles unknown routes with a 404 page
  },
]);

// AppRoutes Component: Provides routing configuration
const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;