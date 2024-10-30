// src/components/FlightSearch.jsx
import React, { useState } from "react";
import {
  Box,
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
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import dayjs from "dayjs";
import SearchIcon from "@mui/icons-material/Search";
import { colors } from "../styles/colors";
import { useLocation } from "react-router-dom";

const FlightSearch = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tripType, setTripType] = useState("Return");
  const [dateRange, setDateRange] = useState([dayjs(), dayjs()]);
  const [passengerClass, setPassengerClass] = useState("Economy");

  const locations = ["Lahore", "Karachi", "Islamabad", "Peshawar", "Quetta"];
  const location = useLocation();

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <Box
      sx={{
        ...(location.pathname !== "/" && {
          border: `1px solid ${colors?.basics?.secondary || "#ccc"}`,
          borderRadius: "6px",
          padding: 2,
        }),
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Where are you flying?
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: { xs: "20px", md: 0 },
          flexWrap: { xs: "none", md: "wrap" },
        }}
      >
        {/* Flying From */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            maxWidth: { xs: "100%", md: "350px" },
            width: "100%",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <FormControl fullWidth>
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
        <Box sx={{ width: { xs: "100%", md: "200px" } }}>
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
        <Box sx={{ width: { xs: "100%", md: "200px" } }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              value={dateRange}
              onChange={(newValue) => setDateRange(newValue)}
              slots={{ field: SingleInputDateRangeField }}
            />
          </LocalizationProvider>
        </Box>

        {/* Passenger and Class */}
        <Box sx={{ width: { xs: "100%", md: "200px" } }}>
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

        {/* Search Button */}
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          sx={{
            backgroundColor: colors?.basics?.primary || "#1976d2",
            width: { xs: "100%", md: "auto" },
          }}
        >
          <Typography variant="button" sx={{ display: { xs: "block", md: "inline" } }}>
            Search
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default FlightSearch;


