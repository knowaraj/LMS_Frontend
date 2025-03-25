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
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import { getBooks } from "../util/api";
import Image from "next/image";

export default function BooksTable() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

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
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
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
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No books available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
