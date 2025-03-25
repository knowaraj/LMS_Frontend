"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Typography,
  Box,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import { deleteBook, getBooks, updateBook } from "../../util/api";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { RemoveRedEye } from "@mui/icons-material";
import Image from "next/image";

export default function BooksTable() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      setBooks(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching books:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleEditClick = (book) => {
    setCurrentBook(book);
    setIsEditing(true);
  };

  const handleEditSave = async () => {
    try {
      await updateBook(currentBook.bid, currentBook);
      setIsEditing(false);
      fetchBooks();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Box
      sx={{
        padding: 3,
        backgroundImage: 'url("/bg2.jpg")',
        backgroundSize: "cover",
        minHeight: "100vh",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Logo and Title Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={150}
          height={150}
          style={{ borderRadius: "50%", marginRight: 2 }}
        />
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "#2c3e50",
              fontWeight: "bold",
              textAlign: "center",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            Book List
          </Typography>
        </Box>
      </Box>

      {/* Table Container */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 5 }}>
        <Table sx={{ minWidth: 650 }} aria-label="books table">
          <TableHead sx={{ backgroundColor: "#34495e", color: "white" }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold", backgroundColor: "#5d6d7e" }}>
                ID
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", backgroundColor: "#5d6d7e" }}>
                Book Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", backgroundColor: "#5d6d7e" }}>
                Author
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", backgroundColor: "#5d6d7e" }}>
                Genre
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", backgroundColor: "#5d6d7e" }}>
                Count
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", backgroundColor: "#5d6d7e" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : books.length > 0 ? (
              books.map((book) => (
                <TableRow
                  key={book.bid}
                  sx={{
                    "&:hover": { backgroundColor: "#ecf0f1" },
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <TableCell align="center">{book.bid}</TableCell>
                  <TableCell align="center">{book.bookName}</TableCell>
                  <TableCell align="center">{book.bookAuthor}</TableCell>
                  <TableCell align="center">{book.bookGenre}</TableCell>
                  <TableCell align="center">{book.count}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleEditClick(book)}
                      color="primary"
                      title="Edit Book"
                      sx={{
                        "&:hover": { backgroundColor: "#2196f3", color: "white" },
                        marginRight: 1,
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(book.bid)}
                      color="error"
                      title="Delete Book"
                      sx={{
                        "&:hover": { backgroundColor: "#f44336", color: "white" },
                        marginRight: 1,
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No books available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Editing Book */}
      <Modal open={isEditing} onClose={() => setIsEditing(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" align="center" sx={{ mb: 2 }}>
            Edit Book
          </Typography>
          <TextField
            label="Book Name"
            fullWidth
            margin="normal"
            value={currentBook?.bookName || ""}
            onChange={(e) => setCurrentBook({ ...currentBook, bookName: e.target.value })}
          />
          <TextField
            label="Author"
            fullWidth
            margin="normal"
            value={currentBook?.bookAuthor || ""}
            onChange={(e) => setCurrentBook({ ...currentBook, bookAuthor: e.target.value })}
          />
          <TextField
            label="Genre"
            fullWidth
            margin="normal"
            value={currentBook?.bookGenre || ""}
            onChange={(e) => setCurrentBook({ ...currentBook, bookGenre: e.target.value })}
          />
          <TextField
            label="Count"
            type="number"
            fullWidth
            margin="normal"
            value={currentBook?.count || ""}
            onChange={(e) => setCurrentBook({ ...currentBook, count: e.target.value })}
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button onClick={handleEditSave} variant="contained" sx={{ mr: 2 }}>
              Save
            </Button>
            <Button onClick={() => setIsEditing(false)} variant="outlined">
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
