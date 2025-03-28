import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the shape of a book
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  pageCount: number;
  averageRating:number,
  ratingsCount: number;
  publishedDate: string;
  genre: string;
  publisher: string;
  imageUrl: string;
  userRating: number;
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
    averageRating:number,
    publishedDate?: string;
    userRating?: number;
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

// Async thunk for fetching books
export const fetchBooks = createAsyncThunk<Book[], void>(
  "books/fetchBooks",
  async () => {
    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes?q=fiction"
    );

    return response.data.items.map((book: APIBook) => ({
      id: book.id,
      title: book.volumeInfo.title || "Unknown Title",
      author: book.volumeInfo.authors?.join(", ") || "Unknown Author",
      description: book.volumeInfo.description || "No description available",
      genre: book.volumeInfo.categories?.join(", ") || "Unknown Genre",
      publisher: book.volumeInfo.publisher || "Unknown Publisher",
      pageCount: book.volumeInfo.pageCount || 0,
      userRating: 0,
      averageRating: book.volumeInfo.averageRating || 0,
      ratingsCount: book.volumeInfo.ratingsCount || 0, 
      publishedDate: book.volumeInfo.publishedDate || "Unknown Date",
      imageUrl:
        book.volumeInfo.imageLinks?.thumbnail ||
        "https://via.placeholder.com/250x350",
    }));
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch books";
      });
  },
});

// Export actions
export const { setBookRating } = bookSlice.actions;

// Export reducer
export default bookSlice.reducer;
