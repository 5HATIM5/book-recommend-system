import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage, type AuthProvider } from "@toolpad/core/SignInPage";
import { useTheme, Theme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import { logIn } from "../auth/AuthService";

// Authentication providers available for login
const providers: AuthProvider[] = [
  { id: "credentials", name: "Email and Password" },
];

// Branding configuration for the application
const BRANDING = {
  logo: (
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/BASF-Logo_bw.svg/1024px-BASF-Logo_bw.svg.png"
      alt="MUI logo"
      style={{ height: 40 }}
    />
  ),
  title: "BookNest",
};

// LoginPage Component: Handles user authentication and login interface
const LoginPage = () => {
  const theme: Theme = useTheme(); 
  let navigate = useNavigate(); 

  return (
    <Box
      sx={{
        display: "flex", // Centers the login box
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        textAlign: "center",
        backgroundImage:
          "url(https://img.freepik.com/free-vector/geometric-pattern-background-vector-white_53876-126684.jpg)",
      }}
    >
      <AppProvider branding={BRANDING} theme={theme}>
        <SignInPage
          signIn={(provider, formData) => logIn(provider, formData, navigate)} 
          providers={providers} 
          slotProps={{
            emailField: { autoFocus: true }, 
            passwordField: { type: "password" }, 
            form: { noValidate: false }, 
          }}
          sx={{
            "& form > .MuiStack-root": {
              marginTop: "1rem",
              rowGap: "0.1rem",
            },
            width: "900px",
            maxWidth: "100%",
            margin: "auto",
          }}
        />
      </AppProvider>
    </Box>
  );
};

export default LoginPage;
