import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Rating,
} from "@mui/material";
import { ShoppingCart, FavoriteBorder } from "@mui/icons-material";
import PolygonTop from "../components/PolygonTop";
import PolygonBottom from "../components/PolygonBottom";
import Loader from "../components/Loader";
import StatusAlert from "../components/StatusAlert";
import { useState } from "react";
import SuggestedBooks from "../components/SuggestedBooks";
import { setBookRating } from "../redux/slice/BookSlice";

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();

  const { books, loading, error } = useSelector(
    (state: RootState) => state.books
  );

  const [expanded, setExpanded] = useState(false);

  if (loading) return <Loader />;
  if (error) return <StatusAlert message="Problem Fetching Data" />;

  const book = books.find((b) => b.id.toString() === id);
  if (!book) return <StatusAlert message="Book not found" />;


  const handleRatingChange = (
    _: React.SyntheticEvent,
    newValue: number | null
  ) => {
    if (newValue !== null) {
      dispatch(setBookRating({ bookId: book.id, rating: newValue }));
    }
  };

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
          height: "100%",
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
        <Card sx={{ display: "flex", flex: 1, boxShadow: 3, borderRadius: 3 }}>
          {/* Book Cover & Actions */}
          <Box
            sx={{
              width: 250,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 2,
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: 350,
                overflow: "hidden",
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <img
                src={book.imageUrl || "https://via.placeholder.com/250x350"}
                alt={book.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>

            {/* Want to Read Button */}
            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 2, borderRadius: 2, background: "#CFA1D8" }}
              startIcon={<FavoriteBorder />}
            >
              Want to Read
            </Button>

            {/* Buy Button */}
            <Button
              variant="outlined"
              size="large"
              fullWidth
              sx={{
                mt: 2,
                borderRadius: 2,
                color: "black",
                outline: "black",
                border: "1px solid black",
              }}
              startIcon={<ShoppingCart />}
            >
              Buy Now
            </Button>

            {/* User Rating */}
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="subtitle1" gutterBottom>
                Rate this Book:
              </Typography>
              <Rating
                value={book.userRating}
                precision={0.5}
                onChange={handleRatingChange}
              />
            </Box>
          </Box>

          {/* Book Info */}
          <CardContent sx={{ flex: 1, padding: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {book.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {book.author}
            </Typography>

            {/* Rating & Total Reviews */}
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Rating value={book.averageRating} precision={0.5} readOnly />
              <Typography sx={{ ml: 1, fontWeight: "bold" }}>
                {book.averageRating} ({book.ratingsCount || "1,245"} ratings)
              </Typography>
            </Box>

            {/* Page Count */}
            <Typography variant="body2" color="text.secondary" mt={1}>
              {book.pageCount || "350"} pages
            </Typography>

            {/* Description */}
            <Typography variant="body1" mt={2}>
              {expanded
                ? `${book.description.substring(0, 600)}...`
                : `${book.description.substring(0, 200)}...`}
              <Button
                onClick={() => setExpanded(!expanded)}
                sx={{ ml: 1, color: "#CFA1D8" }}
                size="small"
              >
                {expanded ? "Read Less" : "Read More"}
              </Button>
            </Typography>

            {/* Genres */}
            <Box sx={{ mt: 2 }}>
              {book.genre.split(",").map((g) => (
                <Chip key={g} label={g.trim()} sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>

            {/* Additional Book Info */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Published Date:</strong>{" "}
                {book.publishedDate || "Unknown"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Publisher:</strong> {book.publisher || "Not Available"}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Right: Suggested Books */}
        <SuggestedBooks bookId={book.id} />
      </Box>
    </Box>
  );
};

export default BookDetailPage;
