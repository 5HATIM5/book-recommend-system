import { FavoriteBorder, Close } from "@mui/icons-material";
import {
  Card,
  Box,
  Button,
  Typography,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  CardContent,
  Chip,
  IconButton,
} from "@mui/material";
import {
  addBookReview,
  Book,
  removeBookReview,
  setBookRating,
} from "../../redux/slice/BookSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

type Props = {
  bookInfo: Book;
};

const BookInfo = (props: Props) => {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);
  const [reviewText, setReviewText] = useState("");
  
  const handleRatingChange = (
    _: React.SyntheticEvent,
    newValue: number | null
  ) => {
    if (newValue !== null) {
      dispatch(setBookRating({ bookId: props.bookInfo.id, rating: newValue }));
    }
  };

  const handleReviewSubmit = () => {
    if (reviewText.trim()) {
      dispatch(
        addBookReview({ bookId: props.bookInfo.id, review: reviewText })
      );
      setReviewText("");
    }
  };

  const handleReviewDelete = (index: number) => {
    dispatch(
      removeBookReview({ bookId: props.bookInfo.id, reviewIndex: index })
    );
  };

  const [isReviewModalOpen, setReviewModalOpen] = useState(false);

  const handleReviewModalOpen = () => setReviewModalOpen(true);
  const handleReviewModalClose = () => setReviewModalOpen(false);
  return (
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
            src={
              props.bookInfo.imageUrl || "https://via.placeholder.com/250x350"
            }
            alt={props.bookInfo.title}
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

        {/* User Rating */}
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="subtitle1" gutterBottom>
            Rate this Book:
          </Typography>
          <Rating
            value={props.bookInfo.userRating}
            precision={0.5}
            onChange={handleRatingChange}
          />
        </Box>

        {/* Review Input */}
        <Button
          variant="contained"
          sx={{
            borderRadius: 2,
            background: "#CFA1D8",
            textTransform: "none",
            fontSize: "16px",
            padding: "10px 20px",
            mt: 2,
          }}
          onClick={handleReviewModalOpen}
        >
          Write a Review
        </Button>
        {/* Review Modal */}
        <Dialog
          open={isReviewModalOpen}
          onClose={handleReviewModalClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
            Share Your Thoughts
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              multiline
              minRows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              variant="outlined"
              sx={{ mt: 1 }}
            />
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
            <Button
              variant="contained"
              sx={{
                borderRadius: 2,
                background: "#CFA1D8",
                padding: "8px 20px",
              }}
              onClick={() => {
                handleReviewSubmit();
                handleReviewModalClose();
              }}
            >
              Submit Review
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      {/* Book Info */}
      <CardContent sx={{ flex: 1, padding: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {props.bookInfo.title}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {props.bookInfo.author}
        </Typography>

        {/* Rating & Total Reviews */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Rating
            value={props.bookInfo.averageRating}
            precision={0.5}
            readOnly
          />
          <Typography sx={{ ml: 1, fontWeight: "bold" }}>
            {props.bookInfo.averageRating} ({props.bookInfo.ratingsCount || "0"}{" "}
            ratings)
          </Typography>
        </Box>

        {/* Page Count */}
        <Typography variant="body2" color="text.secondary" mt={1}>
          {props.bookInfo.pageCount || "350"} pages
        </Typography>

        {/* Description */}
        <Typography variant="body1" mt={2}>
          {expanded
            ? `${props.bookInfo.description.substring(0, 600)}...`
            : `${props.bookInfo.description.substring(0, 200)}...`}
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
          {props.bookInfo.genre.split(",").map((g) => (
            <Chip key={g} label={g.trim()} sx={{ mr: 1, mb: 1 }} />
          ))}
        </Box>

        {/* Additional Book Info */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Published Date:</strong>{" "}
            {props.bookInfo.publishedDate || "Unknown"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Publisher:</strong>{" "}
            {props.bookInfo.publisher || "Not Available"}
          </Typography>
        </Box>

        {/* Display Reviews */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">User Reviews:</Typography>
          {props.bookInfo.userReviews &&
          props.bookInfo.userReviews.length > 0 ? (
            props.bookInfo.userReviews.map((review, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ fontStyle: "italic" }}>
                  {index + 1}. {review}
                </Typography>
                <IconButton onClick={() => handleReviewDelete(index)}>
                  <Close />
                </IconButton>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No reviews yet. Be the first to review!
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default BookInfo;
