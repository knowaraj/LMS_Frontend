"use client";
import { Box, Typography, Grid } from "@mui/material";

export default function LibraryAdminHomepage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 4,
        padding: 5,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 3,
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
        width: "100%",
        height: "100vh",
        margin: "auto",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundImage: "url('/background1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          padding: 2,
          borderRadius: 2,
        }}
      >
        <img
          src="/logo.png"
          alt="Library Logo"
          style={{ width: "150px", marginBottom: "15px" }}
        />
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#000" }}
        >
          Welcome to the Library Management System!
        </Typography>
        <Typography variant="h3" sx={{ color: "#000" }} paragraph>
          Manage books, track borrowing records, and enhance the library experience.
        </Typography>
      </Box>

      {/* Grid for Features */}
      <Grid container spacing={4} justifyContent="center">
        {/* Book Collection */}
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              padding: 3,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: 3,
              textAlign: "center",
              boxShadow: "0 6px 14px rgba(0, 0, 0, 0.2)",
            }}
          >
            <img
              src="logo.png"
              alt="Books"
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "12px",
                marginBottom: "12px",
              }}
            />
            <Typography variant="h5" sx={{ color: "#000", fontWeight: "bold" }}>
              Vast Book Collection
            </Typography>
            <Typography variant="body1" sx={{ color: "#000" }}>
              Explore thousands of books across genres.
            </Typography>
          </Box>
        </Grid>

        {/* Digital Resources */}
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              padding: 3,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: 3,
              textAlign: "center",
              boxShadow: "0 6px 14px rgba(0, 0, 0, 0.2)",
            }}
          >
            <img
              src="logo.png"
              alt="E-Books"
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "12px",
                marginBottom: "12px",
              }}
            />
            <Typography variant="h5" sx={{ color: "#000", fontWeight: "bold" }}>
              Multiple Views
            </Typography>
            <Typography variant="body1" sx={{ color: "#000" }}>
              Access as Admin or Student
            </Typography>
          </Box>
        </Grid>

        {/* Efficient Borrowing */}
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              padding: 3,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: 3,
              textAlign: "center",
              boxShadow: "0 6px 14px rgba(0, 0, 0, 0.2)",
            }}
          >
            <img
              src="logo.png"
              alt="Borrowing System"
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "12px",
                marginBottom: "12px",
              }}
            />
            <Typography variant="h5" sx={{ color: "#000", fontWeight: "bold" }}>
              Easy Borrowing & Returns
            </Typography>
            <Typography variant="body1" sx={{ color: "#000" }}>
              Track book checkouts with ease.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
