// import { useEffect, useState } from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link, useNavigate } from "react-router";

// Navigation links
// const navigation: {
//   name: string;
//   href: string;
//   target: string;
// }[] = [
//   { name: "Home", href: "/", target: "_self" },
//   { name: "Features", href: "/features", target: "_self" },
//   { name: "About", href: "/about", target: "_self" },
// ];

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "transparent",
        transition: "all 0.3s ease-in-out",
        boxShadow: 0,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 10 } }}>
        {/* Logo */}
        <Link
          to="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="https://cdn.freebiesupply.com/logos/large/2x/basf-logo-png-transparent.png"
            alt="Logo"
            height="90"
          />
        </Link>

        {/* <Box sx={{ display: "flex", gap: 3 }}>
          {navigation.map((item, index) => (
            <Button
              key={index}
              component="a"
              href={item.href}
              target={item.target}
              sx={{
                color: "black",
                textTransform: "none",
                ":hover": { backgroundColor: "transparent" },
              }}
            >
              {item.name}
            </Button>
          ))}
        </Box> */}

        {/* Contact Button */}
        <Button
          component="a"
          onClick={handleLogout}
          sx={{
            color: "black",
            textTransform: "none",
            ":hover": { background: "transparent" },
          }}
        >
          Sign Out &rarr;
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
