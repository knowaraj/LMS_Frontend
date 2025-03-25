"use client";
import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Container,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Email, Home, Person, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { listById, updateUser } from "../util/api";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" }, // Changed to blue
    secondary: { main: "#ff7043" },
  },
  typography: {
    fontFamily: "Open Sans, sans-serif",
  },
});

export default function Profile() {
  const [profileData, setProfileData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    number: "",
    address: "",
    username: "",
    password: "",
    role: "",
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editData, setEditData] = useState({ ...profileData });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found in localStorage");
        return;
      }
      try {
        const data = await listById(userId);
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchData();
  }, []);

  const handleOpenDialog = () => {
    setEditData({ ...profileData });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }
    try {
      const response = await updateUser(userId, editData);
      if (response) {
        setProfileData(editData);
        setIsDialogOpen(false);
        alert("Profile updated successfully!");
      } else {
        console.error("Profile update failed.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: "40px",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
          }}
        >
          {/* Profile Picture */}
          <Avatar
            src="/images/profile.jpg"
            sx={{ width: 100, height: 100, marginBottom: "15px" }}
          />

          {/* Name & Role */}
          <Typography variant="h5" fontWeight="bold">
            {profileData.firstname} {profileData.lastname}
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            {profileData.role }
          </Typography>

          {/* Profile Information (Left-Aligned with Icons) */}
          <Box sx={{ width: "100%", marginTop: "15px" }}>
            {[
              { icon: <Email />, label: "Email", value: profileData.email },
              { icon: <Home />, label: "Address", value: profileData.address },
              { icon: <Person />, label: "Username", value: profileData.username },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  borderBottom: "1px solid #ddd",
                  paddingBottom: "8px",
                  marginBottom: "8px",
                }}
              >
                {item.icon}
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.label}:
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            ))}

            {/* Password Field (Hidden Dots Matching Length) */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                borderBottom: "1px solid #ddd",
                paddingBottom: "8px",
                marginBottom: "8px",
              }}
            >
              <Lock />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Password:
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {showPassword ? profileData.password : "•".repeat(profileData.password.length)}
                </Typography>
              </Box>
              <IconButton onClick={() => setShowPassword(!showPassword)} size="small">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Container>

    </ThemeProvider>
  );
}
