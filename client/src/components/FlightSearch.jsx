import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  IconButton,
  Select,
  InputLabel,
  FormControl,
  Button,
  Typography,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import SearchIcon from "@mui/icons-material/Search";

const FlightSearch = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tripType, setTripType] = useState("Return");
  const [dateRange, setDateRange] = useState([dayjs(), dayjs()]);
  const [passengerClass, setPassengerClass] = useState("Economy");

  const locations = ["Lahore", "Karachi", "Islamabad", "Peshawar", "Quetta"]; // example locations

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <Box>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Where are you flying?
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Flying From */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <FormControl fullWidth sx={{ maxWidth: "300px" }}>
            <InputLabel>Flying From</InputLabel>
            <Select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              label="Flying From"
            >
              {locations.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Swap Icon */}
          <IconButton onClick={handleSwap}>
            <SwapHorizIcon />
          </IconButton>

          {/* Flying To */}
          <FormControl fullWidth>
            <InputLabel>Flying To</InputLabel>
            <Select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              label="Flying To"
            >
              {locations.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {/* Trip Type */}
        <Box sx={{}}>
          <FormControl fullWidth>
            <InputLabel>Trip</InputLabel>
            <Select
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              label="Trip"
            >
              <MenuItem value="Return">Return</MenuItem>
              <MenuItem value="One-way">One-way</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* Date Range Picker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateRangePicker
            startText="Depart"
            endText="Return"
            sx={{}}
            value={dateRange}
            onChange={(newValue) => setDateRange(newValue)}
            renderInput={(startProps, endProps) => (
              <>
                <TextField {...startProps} fullWidth />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} fullWidth />
              </>
            )}
          />
        </LocalizationProvider>

        {/* Passenger and Class */}
        <Box sx={{}}>
          <FormControl fullWidth>
            <InputLabel>Passenger - Class</InputLabel>
            <Select
              value={passengerClass}
              onChange={(e) => setPassengerClass(e.target.value)}
              label="Passenger - Class"
            >
              <MenuItem value="Economy">1 Passenger, Economy</MenuItem>
              <MenuItem value="Business">1 Passenger, Business</MenuItem>
              <MenuItem value="First">1 Passenger, First Class</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button startIcon={<SearchIcon fontSize="large" />}>Search</Button>
      </Box>
    </Box>
  );
};

export default FlightSearch;
