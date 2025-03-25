"use client";  

import { useState } from "react";
import { Box, Button, Grid, TextField, Typography, Link } from "@mui/material";
import { useRouter } from "next/navigation";
import { addBook } from "../../util/api";  
import Image from "next/image"; 

export default function AddBook() {
    const [bookData, setBookData] = useState({
        bookName: "",
        bookAuthor: "",
        bookGenre: "",
        bookCount: 1,  // Add bookCount to the state, defaulting to 1
    });

    const router = useRouter(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({
            ...bookData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure all fields are filled out
        if (bookData.bookName && bookData.bookAuthor && bookData.bookGenre && bookData.bookCount) {
            try {
                const bookResponse = await addBook(bookData);
                if (bookResponse) {
                    router.push("/books/list"); // Redirect to the book list page
                } else {
                    console.error("Adding book failed.");
                    alert("Adding book failed. Please try again.");
                }
            } catch (error) {
                console.error("Error submitting the form: ", error);
                alert(`An error occurred: ${error.message || "Unknown error"}`);
            }
        } else {
            alert("Please fill all the fields.");
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundImage: 'url("/background.jpg")', 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <Box
                sx={{
                    width: 800, 
                    padding: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    boxShadow: 3,
                    borderRadius: 2,
                }}
            >
                {/* Logo Image */}
                <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
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
                    sx={{ color: '#1976d2' }}
                >
                    Add Book
                </Typography>

                {/* Form Layout */}
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="bookName"
                            name="bookName"
                            label="Book Name"
                            variant="outlined"
                            value={bookData.bookName}
                            onChange={handleChange}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="bookAuthor"
                            name="bookAuthor"
                            label="Book Author"
                            variant="outlined"
                            value={bookData.bookAuthor}
                            onChange={handleChange}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="bookGenre"
                            name="bookGenre"
                            label="Genre"
                            variant="outlined"
                            value={bookData.bookGenre}
                            onChange={handleChange}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                            }}
                        />
                    </Grid>

                    {/* Add Count Field */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="bookCount"
                            name="bookCount"
                            label="Count"
                            type="number"
                            variant="outlined"
                            value={bookData.bookCount}
                            onChange={handleChange}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                            }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: '#1976d2',
                                '&:hover': { backgroundColor: '#115293' },
                            }}
                            onClick={handleSubmit}
                        >
                            ADD BOOK
                        </Button>
                    </Grid>

                    {/* Link to go back to the book list */}
                    <Grid item xs={12} sx={{ textAlign: 'center', marginTop: 2 }}>
                        <Typography variant="body2">
                            Want to see the book list?{' '}
                            <Link href="/book-list" sx={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}>
                                View Book List
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
