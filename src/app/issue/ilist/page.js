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
  IconButton,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { deleteBookIssue, getBookIssues } from "../../util/api";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import { RemoveRedEye } from "@mui/icons-material";

export default function BookIssuesListPage() {
  const [bookIssues, setBookIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    getBookIssues()
      .then((response) => {
        setBookIssues(response);
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

  const handleDelete = async (id) => {
    try {
      const response = await deleteBookIssue(id);
      console.log("API Response:", response); // Check the full response
      if (response && response.success) {
        console.log("Book issue deleted successfully");
        setBookIssues(prev => {
          const updatedIssues = prev.filter(issue => issue.id !== id);
          console.log("Updated Issues after deletion:", updatedIssues); // Log updated issues
          return updatedIssues;
        });
      } else {
        console.log("Error after response:", response);
        setErrorMessage("Failed to delete the book issue.");
      }
    } catch (error) {
      console.error("Error deleting book issue:", error);
      window.location.reload();
    }

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
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Actions
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
                  <TableCell align="center">{bookIssue.user.firstName + ' ' + bookIssue.user.lastName}</TableCell>
                  <TableCell align="center">
                    {new Date(bookIssue.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleDelete(bookIssue.id)}
                      color="error"
                      title="Delete Issue"
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
                  No book issues available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Button to go back to the "Create Book Issue" page */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#1976d2",
          "&:hover": { backgroundColor: "#115293" },
          marginTop: 4,
        }}
        onClick={handleBack}
      >
        Go Back to Create Book Issue
      </Button>
    </Box>
  );
}
