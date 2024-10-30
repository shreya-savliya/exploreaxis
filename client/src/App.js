import React from "react";
import { Box, ThemeProvider } from "@mui/material";
import { lightTheme } from "./styles/theme";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Flight from "./pages/Flight";
import Hotels from "./pages/Hotels";
import FlightDetailPage from "./components/FlightDetailPage";
import HotelDetails from "./pages/HotelDetails";

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          height: "100%",
        }}
      >
        <Navbar />
        <Box component={"main"} sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/flights" exact element={<Flight />} />
            <Route path="/flights/details/:flightId" element={<FlightDetailPage />} /> 
            <Route path="/hotels" exact element={<Hotels />} />
            <Route path="/hotels/:id" element={<HotelDetails />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;
