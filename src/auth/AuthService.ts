import { AuthProvider, AuthResponse } from "@toolpad/core/SignInPage";
import { authenticateUser } from "./AuthApi";
import { fetchBooks } from "../redux/slice/BookSlice";
import { AppDispatch } from "../redux/store";

// logIn function: Handles user authentication and navigation
export const logIn = async (
  provider: AuthProvider,
  formData: FormData,
  navigate: (path: string) => void,
  dispatch: AppDispatch
): Promise<AuthResponse> => {
  return new Promise<AuthResponse>((resolve) => {
    setTimeout(() => {
      console.log(`Signed in with ${provider.name}`);

      // Extract email and password from form data
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const rememberMe = formData.get("remember");

      // Validate user credentials
      if (!authenticateUser(email, password)) {
        resolve({ error: "Invalid credentials" });
        return;
      }

      // Store user session based on 'remember me' option
      const userData = JSON.stringify({ email });
      if (rememberMe) {
        localStorage.setItem("user", userData);
      } else {
        sessionStorage.setItem("user", userData);
      }

      dispatch(fetchBooks()); // Fetch books after login

      // Redirect user to books page upon successful login
      navigate("/books");

      resolve({ error: undefined });
    }, 500);
  });
};
