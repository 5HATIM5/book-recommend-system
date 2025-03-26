import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router";

// NotFound Component: Displays a 404 error page with a message and a button to return home
const NotFoundPage = () => {
  return (
    <Box
      sx={{
        display: "flex", 
        justifyContent: "center",
        alignItems: "center",
        width: "100vw", 
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Box>
        {/* 404 Error Code */}
        <Typography variant="h4" color="primary" fontWeight="bold">
          404
        </Typography>
        
        {/* Page Not Found Message */}
        <Typography variant="h3" fontWeight="bold" sx={{ mt: 2 }}>
          Page not found
        </Typography>
        
        {/* Additional Message */}
        <Typography variant="body1" sx={{ mt: 2, color: "gray" }}>
          Sorry, we couldn’t find the page you’re looking for.
        </Typography>
        
        {/* Navigation Button to Home */}
        <Box sx={{ mt: 4 }}>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            sx={{
              backgroundColor: "primary", // Primary color for button
              "&:hover": { backgroundColor: "black", color: "white" }, // Hover effect
            }}
          >
            Go back home
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
