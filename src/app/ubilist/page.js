"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { getBookIssues } from "../util/api";

export default function BookIssuesListPage() {
  const [bookIssues, setBookIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    getBookIssues()
      .then((response) => {
        // Convert localStorage user ID to number
        const loggedInUserId = Number(localStorage.getItem("userId"));
  
        console.log("Fetched Book Issues:", response);
        console.log("Logged In User ID:", loggedInUserId);
  
        // Ensure filtering works correctly
        const userBookIssues = response.filter(
          (bookIssue) => bookIssue.user.id === loggedInUserId
        );
  
        console.log("Filtered Book Issues for Logged-In User:", userBookIssues);
        setBookIssues(userBookIssues);
      })
      .catch((error) => {
        console.error("Error fetching book issues:", error);
        setErrorMessage("Error fetching book issues.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleBack = () => {
    router.push("/issue/ibook");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 4,
        minHeight: "100vh",
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          color: "#2c3e50",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        Book Issues List
      </Typography>

      {loading && (
        <CircularProgress
          sx={{ display: "block", margin: "auto", marginBottom: 2 }}
        />
      )}
      {errorMessage && (
        <Typography sx={{ color: "red", textAlign: "center" }}>
          {errorMessage}
        </Typography>
      )}

      {/* Table to display the book issues */}
      <TableContainer
        component={Paper}
        sx={{ borderRadius: 2, boxShadow: 5, width: "80%" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="book issues table">
          <TableHead sx={{ backgroundColor: "#34495e", color: "white" }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Book ID
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Book Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                User ID
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                User Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Issue Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookIssues.length > 0 ? (
              bookIssues.map((bookIssue) => (
                <TableRow
                  key={bookIssue.id}
                  sx={{
                    "&:hover": { backgroundColor: "#ecf0f1" },
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <TableCell align="center">{bookIssue.book.bid}</TableCell>
                  <TableCell align="center">{bookIssue.book.bookName}</TableCell>
                  <TableCell align="center">{bookIssue.user.id}</TableCell>
                  <TableCell align="center">
                    {bookIssue.user.firstName + ' ' + bookIssue.user.lastName}
                  </TableCell>
                  <TableCell align="center">
                    {new Date(bookIssue.date).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No book issues available for this user.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      
    </Box>
  );
}
