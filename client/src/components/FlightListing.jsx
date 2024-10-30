import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import FlightSortTabs from "./FlightSortTabs";
import FlightCard from "./FlightCard";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useSelector } from "react-redux";

const FlightListing = () => {
  const [sortOption, setSortOption] = useState("Best");
  const [flightData, setFlightData] = useState([]);

  useEffect(() => {
    GetAllFlightsData();
  }, []);

  useEffect(() => {
    setFlightData(searchFlight);
  }, [searchFlight]);

  const GetAllFlightsData = async () => {
    // const response = await axios.get("http://localhost:4000/getflights");
    setFlightData(searchFlight);
  };

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
  };

  const handleViewDetails = (flightId) => {
    navigate(`/flights/details/${flightId}`); // Navigate to FlightDetailPage with flightId
  };

  const sortedFlights = flightData.filter((flight) => {
    if (sortOption === "Cheapest") return flight.type === "Cheapest";
    if (sortOption === "Quickest") return flight.stops === "0";
    return flight.type === "Best";
  });

  return (
    <Box>
      <FlightSortTabs onSortChange={handleSortChange} />

      <Grid container spacing={2} mt={2}>
        {flightData.map((flight) => (
          <Grid item xs={12} key={flight.id}>
            <FlightCard
              flight={flight}
              onViewDetails={() => handleViewDetails(flight.id)} // Pass onViewDetails prop
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FlightListing;

