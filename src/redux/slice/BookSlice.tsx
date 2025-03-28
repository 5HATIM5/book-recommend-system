import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the shape of a book
export interface Book {
  id: string;
  title: string;
  publisher: string;
  publishedDate: string;
  author: string;
  genre: string;
  description: string;
  userRating: number;
  userReviews: string[];
  ratingsCount: number;
  averageRating: number;
  pageCount: number;
  imageUrl: string;
}

// Shape of API response
interface APIBook {
  id: string;
  volumeInfo: {
    title?: string;
    authors?: string[];
    categories?: string[];
    publisher?: string;
    pageCount?: number;
    ratingsCount?: number;
    averageRating: number;
    publishedDate?: string;
    userRating?: number;
    userReviews?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
    };
  };
}

// Define the slice state
interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
};

// Async thunk for fetching books from multiple genres
export const fetchBooks = createAsyncThunk<Book[], void>(
  "books/fetchBooks",
  async () => {
    try {
      // Fetch both fiction and horror books
      const fictionResponse = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=fiction"
      );
      const horrorResponse = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=horror"
      );

      // Extract books from both responses
      const fictionBooks = fictionResponse.data.items.map((book: APIBook) => ({
        id: book.id,
        title: book.volumeInfo.title || "Unknown Title",
        publisher: book.volumeInfo.publisher || "Unknown Publisher",
        publishedDate: book.volumeInfo.publishedDate || "Unknown Date",
        author: book.volumeInfo.authors?.join(", ") || "Unknown Author",
        genre: book.volumeInfo.categories?.join(", ") || "Fiction",
        description: book.volumeInfo.description || "No description available",
        userRating: 0,
        userReviews: [],
        ratingsCount: book.volumeInfo.ratingsCount || 0,
        averageRating: book.volumeInfo.averageRating || 0,
        pageCount: book.volumeInfo.pageCount || 0,
        imageUrl:
          book.volumeInfo.imageLinks?.thumbnail ||
          "https://via.placeholder.com/250x350",
      }));

      const horrorBooks = horrorResponse.data.items.map((book: APIBook) => ({
        id: book.id,
        title: book.volumeInfo.title || "Unknown Title",
        publisher: book.volumeInfo.publisher || "Unknown Publisher",
        publishedDate: book.volumeInfo.publishedDate || "Unknown Date",
        author: book.volumeInfo.authors?.join(", ") || "Unknown Author",
        genre: book.volumeInfo.categories?.join(", ") || "Horror",
        description: book.volumeInfo.description || "No description available",
        userRating: 0,
        userReviews: [],
        ratingsCount: book.volumeInfo.ratingsCount || 0,
        averageRating: book.volumeInfo.averageRating || 0,
        pageCount: book.volumeInfo.pageCount || 0,
        imageUrl:
          book.volumeInfo.imageLinks?.thumbnail ||
          "https://via.placeholder.com/250x350",
      }));

      // Merge both arrays
      return [...fictionBooks, ...horrorBooks];
    } catch (error) {
      throw new Error("Failed to fetch books");
    }
  }
);

// Create book slice
const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    // Action to set or update book ratings
    setBookRating: (
      state,
      action: PayloadAction<{ bookId: string; rating: number }>
    ) => {
      const { bookId, rating } = action.payload;
      const book = state.books.find((b) => b.id === bookId);
      if (book) {
        book.userRating = rating;
      }
    },
    addBookReview: (
      state,
      action: PayloadAction<{ bookId: string; review: string }>
    ) => {
      const { bookId, review } = action.payload;
      const book = state.books.find((b) => b.id === bookId);
      if (book) {
        book.userReviews.push(review);
      }
    },
    removeBookReview: (
      state,
      action: PayloadAction<{ bookId: string; reviewIndex: number }>
    ) => {
      const { bookId, reviewIndex } = action.payload;
      const book = state.books.find((b) => b.id === bookId);
      if (book) {
        book.userReviews.splice(reviewIndex, 1);
      }
    },
    clearBooks: () => initialState, 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.loading = false;
        state.books = [...state.books, ...action.payload];
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch books";
      });
  },
});

// Export actions
export const { setBookRating, addBookReview ,removeBookReview, clearBooks} = bookSlice.actions;

// Export reducer
export default bookSlice.reducer;
