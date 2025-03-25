"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Link,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { getBooks, getUsers, createBookIssue } from "../../util/api";
import Image from "next/image";

export default function BookIssuePage() {
  const [bookBid, setBookBid] = useState("");
  const [userId, setUserId] = useState("");
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    Promise.all([getBooks(), getUsers()])
      .then(([booksResponse, usersResponse]) => {
        setBooks(booksResponse);
        setUsers(usersResponse);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setErrorMessage("Error fetching books or users.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (bookBid && userId) {
      // Find the selected book to check its count
      const selectedBook = books.find(
        (book) => String(book.bid) === bookBid.trim()
      );
  
      if (!selectedBook || selectedBook.count <= 0) {
        setErrorMessage("This book is out of stock.");
        return;
      }
  
      setLoading(true);
      setErrorMessage("");
  
      const bookIssueData = {
        book: { bid: bookBid },
        user: { id: userId },
      };
  
      try {
        const response = await createBookIssue(bookIssueData);
        if (response) {
          setSuccessMessage("Book issue created successfully!");
          setTimeout(() => {
            router.push("/issue/ilist");
          }, 1500);
        }
      } catch (error) {
        setErrorMessage(
          error.response ? error.response.data.message : "Error creating book issue."
        );
        console.error("Error submitting book issue:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setErrorMessage("Please enter both a book ID and a user ID.");
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          width: 800,
          padding: 4,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        {/* Logo Image */}
        <Box sx={{ textAlign: "center", marginBottom: 4 }}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={250}
            height={100}
            layout="intrinsic"
          />
        </Box>

        <Typography
          variant="h4"
          textAlign="center"
          gutterBottom
          sx={{ color: "#1976d2" }}
        >
          Issue Book to User
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
        {successMessage && (
          <Typography sx={{ color: "green", textAlign: "center" }}>
            {successMessage}
          </Typography>
        )}

        {/* Form Layout */}
        <Grid container spacing={3}>
          {/* Book ID TextField */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Book ID"
              value={bookBid}
              onChange={(e) => setBookBid(e.target.value)}
              variant="outlined"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
              }}
            />
          </Grid>

          {/* User ID TextField */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              variant="outlined"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#115293" },
              }}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Create Book Issue"}
            </Button>
          </Grid>

          {/* Link to go back to the book issue list */}
          <Grid item xs={12} sx={{ textAlign: "center", marginTop: 2 }}>
            <Typography variant="body2">
              Want to see the list of issues?{" "}
              <Link
                href="/issue/ilist"
                sx={{
                  color: "#1976d2",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                View Issued List
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
