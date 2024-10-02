import { Box, Container } from "@mui/material";
import React from "react";
import FilterSidebar from "../components/FilterSidebar";
import FlightSearch from "../components/FlightSearch";
import FlightListing from "../components/FlightListing";

const Flight = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ my: "25px" }}>
        <FlightSearch />
      </Box>
      <Box sx={{ display: "flex", margin: "auto", gap: "24px" }}>
        <FilterSidebar />
        <Box sx={{ flex: 1 }}>
          <FlightListing />
        </Box>
      </Box>
    </Container>
  );
};

export default Flight;
