import React, { useEffect, useState } from "react";
import {
  Slider,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { colors } from "../styles/colors";
import { useSelector, useDispatch } from "react-redux"; // Add useDispatch import
import { updateFilteredFlights } from "../services/FlightDetails";

const FilterSidebar = () => {
  const dispatch = useDispatch(); // Initialize useDispatch
  const [rating, setRating] = useState(0);
  const [stops, setStops] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [price, setPrice] = useState({ min: 0, max: 0 });
  const [flightData, setFlightData] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([50, 5000]);
  const [selectedAirlines, setSelectedAirlines] = useState({});

  const searchFlightData = useSelector(
    (state) => state?.searchFlights?.flights
  );

  useEffect(() => {
    setFlightData([...searchFlightData]);

    // Get unique stops
    const stopsArray = [
      ...new Set(
        searchFlightData?.map((flight) => {
          console.log(flight, "flights");
          const layovers = flight?.layover?.length;
          return layovers === 0
            ? "Non-stop"
            : `${layovers} Stop${layovers > 1 ? "s" : ""}`;
        })
      ),
    ];

    // Get unique airlines
    const airlinesArray = [
      ...new Set(searchFlightData?.map((flight) => flight.airline_name)),
    ];

    // Get price range
    const prices = searchFlightData?.flatMap((flight) =>
      flight.travel_classes?.map((travelClass) => travelClass.price)
    );
    const priceRange = {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
    console.log(priceRange, "priceRange");

    // Set state
    setStops(stopsArray);
    setAirlines(airlinesArray);
    setPrice(priceRange);
    setSelectedPrice([priceRange.min, priceRange.max]);
  }, [searchFlightData]);


  // Handle changes for price range
  const handlePriceChange = (event, newValue) => {
    setSelectedPrice(newValue);
  };

  // Handle changes for checkboxes
  const handleAirlinesChange = (event) => {
    const { name, checked } = event.target;
    setSelectedAirlines((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  // Handle rating button clicks
  const handleRatingClick = (value) => {
    setRating(value);
  };

  const filterFlights = () => {
    let filteredData = [...searchFlightData];
  
    console.log("Initial Data:", searchFlightData);
    console.log("Selected Price:", selectedPrice);
    console.log("Selected Rating:", rating);
    console.log("Selected Stops:", stops);
    console.log("Selected Airlines:", selectedAirlines);
  
    // Filter based on price range if selectedPrice is not at full range
    if (selectedPrice[0] !== price.min || selectedPrice[1] !== price.max) {
      filteredData = filteredData.filter((flight) =>
        flight.travel_classes?.some(
          (travelClass) =>
            travelClass.price >= selectedPrice[0] &&
            travelClass.price <= selectedPrice[1]
        )
      );
    }
    console.log("Filtered by Price:", filteredData);
  
    // Filter based on rating if rating is greater than 0
    if (rating > 0) {
      filteredData = filteredData.filter((flight) => flight.rating >= rating);
    }
    console.log("Filtered by Rating:", filteredData);
  
    // Filter based on stops if any stop options are selected
    if (stops.length > 0) {
      filteredData = filteredData.filter((flight) => {
        const layovers = flight?.layover?.length;
        const stopsFilter =
          layovers === 0
            ? "Non-stop"
            : `${layovers} Stop${layovers > 1 ? "s" : ""}`;
        return stops.includes(stopsFilter);
      });
    }
    console.log("Filtered by Stops:", filteredData);
  
    // Filter based on selected airlines if any airlines are checked
    const selectedAirlinesList = Object.keys(selectedAirlines).filter(
      (airline) => selectedAirlines[airline]
    );
    if (selectedAirlinesList.length > 0) {
      filteredData = filteredData.filter((flight) =>
        selectedAirlinesList.includes(flight.airline_name)
      );
    }
    console.log("Filtered by Airlines:", filteredData);
  
    // Dispatch the finalized filtered data
    dispatch(updateFilteredFlights(filteredData));
  };
  
  // useEffect to trigger `filterFlights` when filters change
  useEffect(() => {
    filterFlights();
  }, [selectedPrice, rating, stops, selectedAirlines]);
  

  const valuetext = (value) => `${value}`;
console.log(selectedPrice,"selectedPrice")
  return (
    <Box
      sx={{
        padding: 2,
        border: `1px solid ${colors.grey[30]}`,
        borderRadius: "4px",
        maxWidth: "300px",
        width: "100%",
      }}
    >
      <Typography variant="h6">Price</Typography>

      <Slider
        value={selectedPrice}
        onChange={handlePriceChange}
        min={price.min}
        max={price.max}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={1}
        marks={[
          {
            value: price.min,
            label: `$${price.min}`,
          },
          {
            value: price.max,
            label: `$${price.max}`,
          },
        ]}
      />
      <Divider sx={{ my: 2 }} />

      <Typography variant="h6">Stops</Typography>
      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <FormGroup>
          {stops.length > 0 &&
            stops?.map((stop) => (
              <FormControlLabel
                key={stop}
                control={
                  <Checkbox
                    checked={stop}
                    onChange={handleAirlinesChange}
                    name={stop}
                  />
                }
                label={stop}
              />
            ))}
        </FormGroup>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6">Rating</Typography>
      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        {[0, 1, 2, 3, 4].map((value) => (
          <Button
            key={value}
            variant={rating === value ? "contained" : "outlined"}
            onClick={() => handleRatingClick(value)}
            sx={{ p: "4px", minWidth: "40px !important" }}
          >
            {value}+
          </Button>
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6">Airlines</Typography>
      <FormGroup>
        {airlines?.length > 0 &&
          airlines?.map((airline) => (
            <FormControlLabel
              key={airline}
              control={
                <Checkbox
                  checked={!!selectedAirlines[airline]}
                  onChange={handleAirlinesChange}
                  name={airline}
                />
              }
              label={airline}
            />
          ))}
      </FormGroup>
    </Box>
  );
};

export default FilterSidebar;
