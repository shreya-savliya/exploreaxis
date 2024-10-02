import React, { useState } from "react";
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

const FilterSidebar = () => {
  const [priceRange, setPriceRange] = useState([50, 1200]);
  const [departureTime, setDepartureTime] = useState([0, 24]);
  const [rating, setRating] = useState(0);
  const [airlines, setAirlines] = useState({
    Emirated: false,
    FlyDubai: false,
    Qatar: false,
    Etihad: false,
  });
  const [trips, setTrips] = useState({
    RoundTrip: false,
    OnWay: false,
    MultiCity: false,
    FlexibleDates: false,
  });

  // Handle changes for sliders
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleDepartureTimeChange = (event, newValue) => {
    setDepartureTime(newValue);
  };

  // Handle changes for checkboxes
  const handleAirlinesChange = (event) => {
    setAirlines({ ...airlines, [event.target.name]: event.target.checked });
  };

  const handleTripsChange = (event) => {
    setTrips({ ...trips, [event.target.name]: event.target.checked });
  };

  // Handle rating button clicks
  const handleRatingClick = (value) => {
    setRating(value);
  };
  function valuetext(value) {
    return `${value}`;
  }
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
        aria-label="Always visible"
        defaultValue={50}
        onChange={handlePriceChange}
        getAriaValueText={valuetext}
        step={1}
        max={5000}
        marks={[
          {
            value: 0,
            label: "$50",
          },
          {
            value: 5000,
            label: "$5000",
          },
        ]}
        valueLabelDisplay="auto"
      />
      <Divider sx={{ my: 2 }} />

      <Typography variant="h6">Stops</Typography>
      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <FormGroup>
          {[1, 2].map((stop) => (
            <FormControlLabel
              key={stop}
              control={
                <Checkbox
                  checked={stop}
                  onChange={handleAirlinesChange}
                  name={stop}
                />
              }
              label={stop === 1 ? `${stop} stop` : `${stop} stops`}
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
        {Object.keys(airlines).map((airline) => (
          <FormControlLabel
            key={airline}
            control={
              <Checkbox
                checked={airlines[airline]}
                onChange={handleAirlinesChange}
                name={airline}
              />
            }
            label={airline}
          />
        ))}
      </FormGroup>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6">Trips</Typography>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={trips.RoundTrip}
              onChange={handleTripsChange}
              name="RoundTrip"
            />
          }
          label="Round trip"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={trips.OnWay}
              onChange={handleTripsChange}
              name="OnWay"
            />
          }
          label="On Way"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={trips.MultiCity}
              onChange={handleTripsChange}
              name="MultiCity"
            />
          }
          label="Multi-City"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={trips.FlexibleDates}
              onChange={handleTripsChange}
              name="FlexibleDates"
            />
          }
          label="My Dates Are Flexible"
        />
      </FormGroup>
    </Box>
  );
};

export default FilterSidebar;
