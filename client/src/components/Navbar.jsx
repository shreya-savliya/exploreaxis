import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#022B3A",
        boxShadow: "none",
        padding: "0 20px",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            fontFamily: "El Messiri, sans-serif",
            letterSpacing: 2,
            color: "#ffffff",
          }}
        >
          Hotel Finder
        </Typography>
        <Box sx={{ display: "flex", gap: "20px" }}>
          <Link
            to="/"
            style={{
              color: "#ffffff",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: "500",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#EDD4D4")}
            onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
          >
            Home
          </Link>
          <Link
            to="/hotels"
            style={{
              color: "#ffffff",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: "500",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#EDD4D4")}
            onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
          >
            Hotels
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
