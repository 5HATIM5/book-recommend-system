import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Box } from "@mui/material";
import PolygonTop from "../components/Global/PolygonTop";
import PolygonBottom from "../components/Global/PolygonBottom";
import Loader from "../components/Global/Loader";
import StatusAlert from "../components/Global/StatusAlert";
import SuggestedBooks from "../components/BookDetail/SuggestedBooks";
import BookInfo from "../components/BookDetail/BookInfo";

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { books, loading, error } = useSelector(
    (state: RootState) => state.books
  );

  if (loading) return <Loader />;
  if (error) return <StatusAlert message="Problem Fetching Data" />;

  const book = books.find((b) => b.id.toString() === id);
  if (!book) return <StatusAlert message="Book not found" />;

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "140vh",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(32px)",
          zIndex: -1,
        }}
      />

      <PolygonTop />
      <PolygonBottom />

      <Box
        sx={{ display: "flex", gap: 4, maxWidth: 1200, width: "100%", mt: 12 }}
      >
        {/* Left: Book Detail */}
        <BookInfo bookInfo={book} />

        {/* Right: Suggested Books */}
        <SuggestedBooks bookId={book.id} />
      </Box>
    </Box>
  );
};

export default BookDetailPage;
