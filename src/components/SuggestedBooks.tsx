import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";

import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

type Props = {
  bookId: string;
};

const SuggestedBooks = (props: Props) => {
  const { books } = useSelector((state: RootState) => state.books);

  const navigate = useNavigate();
  const suggestedBooks = books.filter((b) => b.id !== props.bookId).slice(0, 3);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: 350 }}>
      {suggestedBooks.map((suggestedBook) => (
        <Paper
          key={suggestedBook.id}
          sx={{
            display: "flex",
            alignItems: "center",
            padding: 3,
            cursor: "pointer",
            boxShadow: 2,
            borderRadius: 2,
            "&:hover": { boxShadow: 4 },
          }}
          onClick={() => navigate(`/books/${suggestedBook.id}`)}
        >
          <Box
            sx={{
              width: 80,
              height: 120,
              overflow: "hidden",
              marginRight: 3,
              flexShrink: 0,
            }}
          >
            <img
              src={
                suggestedBook.imageUrl || "https://via.placeholder.com/80x120"
              }
              alt={suggestedBook.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {suggestedBook.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              by {suggestedBook.author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {suggestedBook.genre}
            </Typography>
            <Typography variant="body2" color="text">
              {suggestedBook.publishedDate}
            </Typography>
          </Box>
        </Paper>
      ))}

      {/* Back Button - Outside Card, Below Suggested Books */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/books")}
        sx={{
          mt: 3,
          bgcolor: "black",
          color: "white",
          borderRadius: 2,
          textTransform: "none",
          "&:hover": { bgcolor: "#333" },
        }}
      >
        Back
      </Button>
    </Box>
  );
};

export default SuggestedBooks;
