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
  const navigate = useNavigate();
  // const searchFlight = useSelector((state) => state?.searchFlights?.flights);
  const filteredFlights = useSelector(
    (state) => state?.searchFlights?.filteredFlights
  );

  useEffect(() => {
    setFlightData(filteredFlights);
  }, [filteredFlights]);
console.log(filteredFlights,"filteredflight from flightlisting")
  const handleViewDetails = (flightId) => {
    navigate(`/flights/details/${flightId}`); // Navigate to FlightDetailPage with flightId
  };
  
  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
  };
  // Helper function to parse travel time in the format "xh ym" to minutes
  // const parseTravelTime = (travelTime) => {
  //   const [hours, minutes] = travelTime.split(" ");
  //   const totalMinutes = parseInt(hours) * 60 + (parseInt(minutes) || 0);
  //   return totalMinutes;
  // };
  // // Sort flights based on the selected sort option
  // const sortedFlights = filteredFlights
  //   .slice() // Create a shallow copy of flightData to avoid mutating the original array
  //   .sort((a, b) => {
  //     if (sortOption === "Cheapest") {
  //       // Sort by the lowest price in travel_classes
  //       const minPriceA = Math.min(...a.travel_classes.map((cls) => cls.price));
  //       const minPriceB = Math.min(...b.travel_classes.map((cls) => cls.price));
  //       return minPriceA - minPriceB;
  //     } else if (sortOption === "Quickest") {
  //       // Sort by total travel time
  //       const timeA = parseTravelTime(a.total_travel_time);
  //       const timeB = parseTravelTime(b.total_travel_time);
  //       return timeA - timeB;
  //     } else {
  //       // Default "Best" option - could be sorted by airline or left as is
  //       return 0; // Leave the array as is for the "Best" option
  //     }
  //   });

  return (
    <Box>
      <FlightSortTabs onSortChange={handleSortChange} />

      <Grid container spacing={2} mt={2}>
        {filteredFlights.map((flight) => (
          <Grid item xs={12} key={flight.id}>
            <FlightCard
              flight={flight}
              onViewDetails={() => handleViewDetails(flight.flight_id)} // Pass onViewDetails prop
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FlightListing;

