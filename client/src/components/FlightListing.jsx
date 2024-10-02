import React, { useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import FlightSortTabs from "./FlightSortTabs";
import FlightCard from "./FlightCard";

// Sample flight data
const flightData = [
  {
    id: 1,
    price: 99,
    duration: "2h 18m",
    airline: "Emirates",
    rating: 4.2,
    type: "Cheapest",
  },
  {
    id: 2,
    price: 150,
    duration: "1h 50m",
    airline: "Emirates",
    rating: 4.5,
    type: "Quickest",
  },
  {
    id: 3,
    price: 130,
    duration: "2h 28m",
    airline: "Emirates",
    rating: 4.6,
    type: "Best",
  },
];

const FlightListing = () => {
  const [sortOption, setSortOption] = useState("Best");

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
  };

  const sortedFlights = flightData.filter((flight) => {
    if (sortOption === "Cheapest") return flight.type === "Cheapest";
    if (sortOption === "Quickest") return flight.type === "Quickest";
    return flight.type === "Best";
  });

  return (
    <Box>
      <FlightSortTabs onSortChange={handleSortChange} />

      <Grid container spacing={2} mt={2}>
        {sortedFlights.map((flight) => (
          <Grid item xs={12} key={flight.id}>
            <FlightCard flight={flight} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FlightListing;
