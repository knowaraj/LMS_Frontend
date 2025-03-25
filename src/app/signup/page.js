"use client"; 

import { useState } from "react";
import { Box, Button, Grid, TextField, Typography, MenuItem, Select, InputLabel, FormControl, Link } from "@mui/material";
import { useRouter } from "next/navigation";
import { add } from "../util/api";  
import Image from "next/image";

export default function Signup() {
    const [signupData, setSignupData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        username: "",
        password: "",
        role: "",  
    });

    const router = useRouter(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validRoles = ["user", "admin"];

        if (validRoles.includes(signupData.role)) {
            try {
                // Call the add function to submit 
                const userResponse = await add(signupData);  
                if (userResponse) {
                    router.push("/login");  // Navigate to login
                } else {
                    console.error("Registration failed.");
                    alert("Registration failed. Please try again.");
                }
            } catch (error) {
                console.error("Error submitting the form: ", error);
                alert(`An error occurred: ${error.message || "Unknown error"}`);
            }
        } else {
            alert("Invalid role provided. Please select either 'user' or 'admin'.");
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
                    SignUp
                </Typography>

                {/* Form Layout */}
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            variant="outlined"
                            value={signupData.firstName}
                            onChange={handleChange}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            variant="outlined"
                            value={signupData.lastName}
                            onChange={handleChange}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            type="email"
                            value={signupData.email}
                            onChange={handleChange}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="address"
                            name="address"
                            label="Address"
                            variant="outlined"
                            value={signupData.address}
                            onChange={handleChange}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="username"
                            name="username"
                            label="Username"
                            variant="outlined"
                            value={signupData.username}
                            onChange={handleChange}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={signupData.password}
                            onChange={handleChange}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <FormControl fullWidth>
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                labelId="role-label"
                                id="role"
                                name="role"
                                value={signupData.role}
                                onChange={handleChange}
                                label="Role"
                                sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                                }}
                            >
                                <MenuItem value="admin">Admin</MenuItem>
                                <MenuItem value="user">Student</MenuItem>
                            </Select>
                        </FormControl>
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
                            SIGNUP
                        </Button>
                    </Grid>

                    {/* Login Link */}
                    <Grid item xs={12} sx={{ textAlign: 'center', marginTop: 2 }}>
                        <Typography variant="body2">
                            Already a member?{' '}
                            <Link href="/login" sx={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}>
                                Login
                            </Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
