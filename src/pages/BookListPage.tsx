import { Box } from "@mui/material";
import PolygonBottom from "../components/PolygonBottom";
import PolygonTop from "../components/PolygonTop";

const BookListPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        filter: "blur(32px)",
        border: "1px solid black",
        height: "100vh",
        width: "100vw",
      }}
    >
      <PolygonTop />
      <PolygonBottom />
    </Box>
  );
};

export default BookListPage;
