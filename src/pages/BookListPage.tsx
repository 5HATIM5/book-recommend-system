import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Box, Paper, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridPaginationModel, GridToolbar } from "@mui/x-data-grid";
import PolygonTop from "../components/Global/PolygonTop";
import PolygonBottom from "../components/Global/PolygonBottom";
import { useNavigate } from "react-router";
import { Book } from "../redux/slice/BookSlice";
import Loader from "../components/Global/Loader";
import StatusAlert from "../components/Global/StatusAlert";
import { useState } from "react";

// Extend Book with an additional index field
interface BookWithIndex extends Book {
  index: number;
}

const BookListPage = () => {
  const { books, loading, error } = useSelector(
    (state: RootState) => state.books
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  let navigate = useNavigate();

  if (loading) return <Loader />;
  if (error) return <StatusAlert message="Problem Fetching Data" />;

  // Ascending ID for each row
  const booksWithIds: BookWithIndex[] = books.map((book, index) => ({
    index: index + 1,
    ...book,
  }));

  // Filter books based on Title or Author search
  const filteredBooks: BookWithIndex[] = booksWithIds.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //DataGrid columns
  const columns: GridColDef<BookWithIndex>[] = [
    { field: "index", headerName: "ID", width: 80 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "author", headerName: "Author", flex: 1 },
    { field: "genre", headerName: "Genre", flex: 1 },
  ];

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Search Field */}
      <Box
        sx={{
          position: "absolute",
          top: 140,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold",marginRight:1 }}>
          Quick Search:
        </Typography>
        <TextField
          label="Search by Title or Author"
          variant="outlined"
          sx={{ width: "500px", backgroundColor: "white" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>

      {/* Background Blur Layer */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(30px)",
          zIndex: -1,
        }}
      />

      {/* Books Table List */}
      <Paper
        sx={{
          height: 500,
          width: "70%",
          position: "relative",
          zIndex: 1,
          marginTop: "150px",
          border: "1px solid lightgray",
        }}
      >
        <DataGrid
          rows={filteredBooks}
          columns={columns}
          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          slots={{ toolbar: GridToolbar }}
          onRowClick={(params) => {
            const bookId: string = params.row.id;
            navigate(`/books/${bookId}`);
          }}
          sx={{
            cursor: "pointer",
          }}
        />
      </Paper>

      <PolygonTop />
      <PolygonBottom />
    </Box>
  );
};

export default BookListPage;
