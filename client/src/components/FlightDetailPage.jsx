import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Chip,
  Container,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WifiIcon from "@mui/icons-material/Wifi";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import homeImg from "../assets/images/HomeImg.png";
import hotelImg from "../assets/images/hotel-home.png";
import { colors } from "../styles/colors";
import FareUpgradeSelection from "./FareUpgradeSelection";
import dayjs from "dayjs";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ItinerarySummary from "./ItinerarySummary";

const FlightDetails = () => {
  const { flightId } = useParams(); // Fetch flightId from route params
  const [flightData, setFlightData] = useState(null);
  const [airports, setAirports] = useState({});

  useEffect(() => {
    // Fetch flight data from API
    const fetchFlightDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/getflights/${flightId}`
        );
        setFlightData(response.data);
      } catch (error) {
        console.error("Error fetching flight details:", error);
      }
    };

    // Fetch all airports
    const fetchAllAirports = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/airport`
        );
        const airportData = response.data.airports.reduce((acc, airport) => {
          acc[airport.airport_code] = airport;
          return acc;
        }, {});
        setAirports(airportData);
      } catch (error) {
        console.error("Error fetching airports:", error);
      }
    };

    if (flightId) fetchFlightDetails();
    fetchAllAirports();
  }, [flightId]);

  if (!flightData) {
    return <Typography>Loading...</Typography>;
  }
  const getAirportDetails = (code) => airports[code] || {};

  return (
    <Container maxWidth="xl" sx={{ mt: "80px" }}>
      {/* Flight Title */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">
          {flightData?.airline_name} A380 Airbus
        </Typography>
        <Typography variant="h6" color="primary">
          ${flightData?.price}
        </Typography>
      </Box>

      {/* Location and Reviews */}
      <Typography variant="body2" color="textSecondary">
        {flightData?.departureAirport?.city},{" "}
        {flightData?.departureAirport?.airport_name}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {flightData?.rating}{" "}
        <span>
          {flightData?.rating_type} {flightData?.review_count} reviews
        </span>
      </Typography>

      {/* Image */}
      <CardMedia
        component="img"
        height="200"
        image={homeImg}
        alt={flightData?.airline_name}
        sx={{ borderRadius: 2, my: 2 }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Box>
          {/* Economy Features */}
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="h6">Basic Economy Features</Typography>
            <Chip label="Economy" color="primary" />
            <Chip label="First Class" />
            <Chip label="Business Class" />
          </Box>
          <Box display="flex" gap={1} mt={1}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Avatar
                key={index}
                variant="rounded"
                src={hotelImg}
                sx={{ width: 50, height: 50 }}
              />
            ))}
          </Box>

          {/* Policies */}
          <Box mt={2} p={2} bgcolor="primary.light" borderRadius={2}>
            <Typography variant="h6">
              {flightData?.airline_name} Airlines Policies
            </Typography>
            <Typography variant="body2">
              <ul>
                <li>
                  Pre-flight cleaning, installation of cabin HEPA filters.
                </li>
                <li>Pre-flight health screening questions.</li>
              </ul>
            </Typography>
          </Box>

          {/* Flight Details */}
          <Box mt={3}>
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Typography fontWeight={600} fontSize={20}>
                {flightData?.departureAirport?.city}
              </Typography>
              <ArrowForwardIcon fontSize="large" sx={{ fontWeight: 600 }} />
              <Typography fontWeight={600} fontSize={20}>
                {flightData?.destinationAirport?.city}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                mb: 2,
                mt: 1,
              }}
            >
              <Box
                sx={{
                  backgroundColor: "lightyellow",
                  display: "inline-block",
                  padding: 1,
                  borderRadius: "5px",
                }}
              >
                <Typography fontWeight={500}>
                  {dayjs(flightData?.departure_time).format("dddd, DD MMM")}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Typography>
                  {flightData.layover.length === 0
                    ? "Non-stop"
                    : `${flightData.layover.length} stop${
                        flightData.layover.length > 1 ? "s" : ""
                      }`}
                </Typography>{" "}
                <FiberManualRecordIcon sx={{ fontSize: "5px" }} />
                <Typography>{flightData?.total_travel_time}</Typography>
              </Box>
            </Box>
            <Box>
              {flightData?.segments.map((segment, index) => (
                <>
                  <Card key={segment._id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={2}>
                          <Avatar
                            variant="rounded"
                            src={hotelImg}
                            sx={{ width: 50, height: 50 }}
                          />
                        </Grid>
                        <Grid item xs={10}>
                          <Typography variant="h6">
                            {flightData?.airline_name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {segment?.airline_code} {segment?.travel_class}
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography variant="body2" color="textSecondary">
                            {new Date(
                              segment?.departure_time
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Typography>
                          <Typography variant="caption">
                            {
                              getAirportDetails(segment?.departure_airport_code)
                                .airport_name
                            }{" "}
                            - {segment?.departure_airport_code}
                          </Typography>
                        </Grid>
                        <Grid item xs={1} textAlign="center">
                          <ArrowForwardIcon />
                        </Grid>
                        <Grid item xs={3}>
                          <Typography variant="body2" color="textSecondary">
                            {segment?.travel_time}
                          </Typography>
                        </Grid>
                        <Grid item xs={1} textAlign="center">
                          <ArrowForwardIcon />
                        </Grid>
                        <Grid item xs={3}>
                          <Typography variant="body2" color="textSecondary">
                            {new Date(
                              segment?.destination_time
                            ).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </Typography>
                          <Typography variant="caption">
                            {
                              getAirportDetails(
                                segment?.destination_airport_code
                              ).airport_name
                            }{" "}
                            - {segment?.destination_airport_code}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} mt={1}>
                          <Box display="flex" gap={2}>
                            {flightData?.facilities?.includes("wifi") && (
                              <WifiIcon fontSize="small" />
                            )}
                            {flightData?.facilities?.includes(
                              "in-flight entertainment"
                            ) && <RestaurantIcon fontSize="small" />}
                            <AccessTimeIcon fontSize="small" />
                            <AttachMoneyIcon fontSize="small" />
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  {/* Layover Box */}
                  {flightData?.layover[index] && (
                    <Box
                      sx={{
                        backgroundColor: "lightyellow",
                        padding: 1,
                        borderRadius: "5px",
                        mb: 2,
                      }}
                    >
                      <Typography fontWeight={500} sx={{ textAlign: "center" }}>
                        Layover at{" "}
                        {
                          getAirportDetails(
                            flightData.layover[index].airport_code
                          ).airport_name
                        }{" "}
                        ({flightData.layover[index].airport_code}) for{" "}
                        {flightData.layover[index].time}
                      </Typography>
                    </Box>
                  )}
                </>
              ))}
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "100%", maxWidth: "300px" }}>
          <ItinerarySummary />
        </Box>
      </Box>
      <FareUpgradeSelection flightData={flightData} />
      <Button
        variant="contained"
        color="primary"
        sx={{ borderColor: colors.basics.primary, mt: "10px" }}
      >
        Book now
      </Button>
    </Container>
  );
};

export default FlightDetails;
