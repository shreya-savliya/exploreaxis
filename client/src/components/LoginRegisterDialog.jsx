import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Tab,
  Tabs,
  Box,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSearchParams } from "react-router-dom";
import { colors } from "../styles/colors";
import axios from "axios";

function LoginRegisterDialog({ onUserAuthenticated }) {
  const [open, setOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0); // 0 for Sign Up, 1 for Login
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
      fetch(`${process.env.REACT_APP_API_URL}/auth/session`, {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tabValue === 0) {
      // Register User
      await registerUserAxios({
        ...formData,
        email: formData.email.toLowerCase(),
      });
    } else {
      // Login User
      await loginUserAxios({
        ...formData,
        email: formData.email.toLowerCase(),
      });
    }
  };

  const handleGoogleSignIn = () => {
    // Redirect to the backend for Google Sign-In
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/signin`;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const registerUserAxios = async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/register`,
        formData
      );
      alert(response.data.message);
      Cookies.set("token", response.data.token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });

      onUserAuthenticated({ name: formData.name, email: formData.email });

      handleClose();
    } catch (error) {
      console.error("Registration Error:", error);
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  const loginUserAxios = async (formData) => {
    console.log(formData, "formData");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        formData
      );
      alert("Login successful!");
      Cookies.set("token", response.data.token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });

      // Call the callback to notify parent component
      onUserAuthenticated({ name: formData.name, email: formData.email });
      handleClose();
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{ borderColor: colors.basics.primary }}
      >
        Login
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{ style: { backgroundColor: "white" } }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding={1}
        >
          <DialogTitle>
            {tabValue === 0
              ? googleSignIn
                ? "Complete Your Signup"
                : "Sign Up"
              : "Login"}
          </DialogTitle>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          {loading ? (
            <Typography variant="h6">Loading...</Typography>
          ) : (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {tabValue === 0 && (
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
                )}
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
                {(!googleSignIn || tabValue === 1) && (
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
                    fullWidth
                    sx={{ borderColor: colors.basics.primary }}
                  >
                    {tabValue === 0
                      ? googleSignIn
                        ? "Complete Signup"
                        : "Sign Up"
                      : "Login"}
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
                variant="contained"
                sx={{ borderColor: colors.basics.primary }}
                fullWidth
              >
                Sign in with Google
              </Button>
              <Typography align="center" my={2}>
                {tabValue === 0 ? (
                  <Button onClick={() => setTabValue(1)} variant="text">
                    Already have an account? Login
                  </Button>
                ) : (
                  <Button onClick={() => setTabValue(0)} variant="text">
                    Don't have an account? Sign Up
                  </Button>
                )}
              </Typography>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default LoginRegisterDialog;
