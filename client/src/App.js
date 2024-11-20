import React from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { lightTheme } from './styles/theme'; // Ensure you have lightTheme defined
import Navbar from './components/Navbar'; // Your Navbar component
import Footer from './components/Footer'; // Your Footer component
import { Route, Routes } from 'react-router-dom'; // Import routing components
import Home from './pages/Home'; // Your Home page component
import Flight from './pages/Flight'; // Your Flight page component
import Hotels from './pages/Hotels'; // Your Hotels page component
import FlightDetailPage from './components/FlightDetailPage'; // Your Flight detail page component
import HotelDetails from './pages/HotelDetails'; // Your Hotel details page component
import TravelerDetailsForm from './pages/TravelerDetailsForm'; // Traveler details form component
import CheckoutPage from './pages/CheckoutPage'; // Import the CheckoutPage component

const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          height: '100%',
        }}
      >
        {/* Navbar Component */}
        <Navbar />
        
        {/* Main Content */}
        <Box component="main" sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flights" element={<Flight />} />
            <Route path="/flights/details/:flightId" element={<FlightDetailPage />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotels/details/:hotelId" element={<HotelDetails />} />
            <Route path="/travelers" element={<TravelerDetailsForm />} /> {/* Traveler details form route */}
            <Route path="/checkout" element={<CheckoutPage />} /> {/* Checkout page route */}
          </Routes>
        </Box>

        {/* Footer Component */}
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default App;




