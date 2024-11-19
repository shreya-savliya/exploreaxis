import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [googleSignIn, setGoogleSignIn] = useState(false);

  useEffect(() => {
    // Check if the user was redirected from Google Sign-In
    const isGoogleSignIn = searchParams.get("google") === "true";
    setGoogleSignIn(isGoogleSignIn);

    if (isGoogleSignIn) {
      setLoading(true);
      // Fetch Google user data from the backend
      fetch("http://localhost:8000/auth/session", {
        credentials: "include", // Include cookies
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setFormData((prev) => ({
              ...prev,
              name: data.user.name || "",
              email: data.user.email || "",
            }));
          }
        })
        .catch((err) => console.error("Error fetching session:", err))
        .finally(() => setLoading(false));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Sign-Up Successful!\nName: ${formData.name}\nEmail: ${formData.email}`
    );
  };

  const handleGoogleSignIn = () => {
    // Redirect to the backend for Google Sign-In
    window.location.href = "http://localhost:8000/auth/signin";
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
      p={2}
    >
      <Box
        bgcolor="white"
        p={4}
        borderRadius={4}
        boxShadow={3}
        maxWidth={400}
        width="100%"
      >
        <Typography variant="h4" gutterBottom>
          {googleSignIn ? "Complete Your Signup" : "Sign Up"}
        </Typography>
        {loading ? (
          <Typography variant="h6">Loading...</Typography>
        ) : (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                  disabled={googleSignIn} // Disable editing for Google sign-in users
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  required
                  disabled={googleSignIn} // Disable editing for Google sign-in users
                />
              </Grid>
              {!googleSignIn && (
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  {googleSignIn ? "Complete Signup" : "Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
        {!googleSignIn && (
          <>
            <Typography align="center" my={2}>
              OR
            </Typography>
            <Button
              onClick={handleGoogleSignIn}
              variant="outlined"
              color="secondary"
              fullWidth
            >
              Sign in with Google
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SignUp;
