import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router";
import { persistor } from "../../redux/store";
import { clearBooks } from "../../redux/slice/BookSlice";
import { useDispatch } from "react-redux";

// Navigation links
const navigation: {
  name: string;
  href: string;
  target: string;
}[] = [
  {
    name: "Google Books",
    href: "https://developers.google.com/books",
    target: "_blank",
  },
  { name: "Material UI", href: "https://shorturl.at/qEn3R", target: "_blank" },
  { name: "Redux", href: "https://redux-toolkit.js.org/", target: "_blank" },
  {
    name: "Axios",
    href: "https://axios-http.com/docs/intro",
    target: "_blank",
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleLogout = () => {
    sessionStorage.removeItem("user") 
    localStorage.removeItem("user");
    dispatch(clearBooks());
    persistor.purge();
    navigate("/login", { replace: true });
  };

  return (
    <AppBar
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

        <Box sx={{ display: "flex", gap: 3 }}>
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
        </Box>

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
