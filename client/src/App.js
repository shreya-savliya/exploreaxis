import React from "react";
import { Box, ThemeProvider } from "@mui/material";
import { lightTheme } from "./styles/theme";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Hotels from "./pages/Hotels/Hotels";

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          height: "100%",
        }}
      >
        <Navbar />
        <Box component={"main"} sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/hotels" exact element={<Hotels />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;
