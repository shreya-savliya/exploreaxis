import React from "react";
import {
  Box,
  Typography,
  Checkbox,
  Button,
  Card,
  CardContent,
  Divider,
  Grid2 as Grid,
} from "@mui/material";
import homeimg from "../assets/images/hotel-home.png";
import { colors } from "../styles/colors";
import EmailItineraryDialog from "./EmailItineraryDialog.jsx";
import EmailIcon from "@mui/icons-material/Email";

const FlightCard = ({ flight, onViewDetails }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const HandleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card sx={{ borderRadius: 2, boxShadow: 2 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            {/* Airline Logo */}
            <Grid
              size={{ xs: 12, md: 2 }}
              sx={{ textAlign: { xs: "center", sm: "left" } }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  component="img"
                  src={homeimg}
                  alt="airlines logo image"
                  sx={{
                    width: "100%",
                    objectFit: "cover",
                    maxWidth: "100px",
                  }}
                />
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color={colors.basics.primary}
                  sx={{ display: { xs: "block", md: "none" } }}
                >
                  ${flight.price}
                </Typography>
              </Box>
            </Grid>

            {/* Flight Details */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box display="flex" alignItems="center" mb={1}>
                <Box
                  sx={{
                    backgroundColor: "#E8F5E9",
                    borderRadius: "4px",
                    p: 0.5,
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" color="textPrimary">
                    {flight?.rating}
                  </Typography>
                </Box>
                <Typography variant="body1" ml={1} fontWeight="bold">
                  {flight?.rating_type}
                </Typography>
                <Typography variant="body2" color="textSecondary" ml={0.5}>
                  {flight?.review_count} reviews
                </Typography>
              </Box>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  {/* Display Departure and Arrival Time for Outbound Flight */}
                  <Typography variant="body2" fontWeight={600} fontSize={16}>
                    {new Date(flight.departure_time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(
                      flight.segments[0].destination_time
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {/* Calculate Days Difference */}
                    {(() => {
                      const departureDate = new Date(flight.departure_time);
                      const arrivalDate = new Date(
                        flight.segments[0].destination_time
                      );
                      const dayDifference =
                        arrivalDate.getDate() - departureDate.getDate();

                      if (dayDifference === 1) {
                        return (
                          <span style={{ color: "red", fontSize: "0.8em" }}>
                            {" "}
                            +1
                          </span>
                        );
                      } else if (dayDifference === 2) {
                        return (
                          <span style={{ color: "red", fontSize: "0.8em" }}>
                            {" "}
                            +2
                          </span>
                        );
                      }
                      return null;
                    })()}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    fontSize={12}
                  >
                    {flight.departureAirport.city} (
                    {flight.departure_airport_code}) -{" "}
                    {flight.destinationAirport.city} (
                    {flight.destination_airport_code})
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {flight.airline_name}
                  </Typography>
                </Box>
                <Typography variant="body2">
                  {flight.total_travel_time} (
                  {flight.layover.length === 0
                    ? "Non-stop"
                    : `${flight.layover.length} stop${
                        flight.layover.length > 1 ? "s" : ""
                      }`}
                  )
                </Typography>
              </Box>

              {flight.trip_type === "Round-trip" && (
                <>
                  <Divider sx={{ my: 1 }} />

                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      {/* Display Departure and Arrival Time for Return Flight */}
                      <Typography variant="body2">
                        {new Date(
                          flight.segments[1].departure_time
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        -{" "}
                        {new Date(flight.destination_time).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
                        )}
                        {/* Calculate Days Difference */}
                        {(() => {
                          const returnDepartureDate = new Date(
                            flight.segments[1].departure_time
                          );
                          const returnArrivalDate = new Date(
                            flight.destination_time
                          );
                          const returnDayDifference =
                            returnArrivalDate.getDate() -
                            returnDepartureDate.getDate();

                          if (returnDayDifference === 1) {
                            return (
                              <span style={{ color: "red", fontSize: "0.8em" }}>
                                {" "}
                                +1
                              </span>
                            );
                          } else if (returnDayDifference === 2) {
                            return (
                              <span style={{ color: "red", fontSize: "0.8em" }}>
                                {" "}
                                +2
                              </span>
                            );
                          }
                          return null;
                        })()}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {flight.destinationAirport.city} (
                        {flight.destination_airport_code}) -{" "}
                        {flight.departureAirport.city} (
                        {flight.departure_airport_code})
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {flight.airline_name}
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      {flight.total_travel_time}{" "}
                      {flight.layover.length === 0
                        ? "Non-stop"
                        : `${flight.layover.length} stop${
                            flight.layover.length > 1 ? "s" : ""
                          }`}
                    </Typography>
                  </Box>
                </>
              )}
            </Grid>

            {/* Price and View Deals Button */}
            <Grid
              size={{ xs: 12, md: 4 }}
              sx={{ textAlign: { xs: "center", sm: "right" } }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "15px",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color={colors.basics.primary}
                  sx={{ display: { xs: "none", md: "block" } }}
                >
                  ${flight.price}
                </Typography>
                <Button
                  onClick={() => {
                    handleClickOpen();
                  }}
                  variant="text"
                  sx={{ padding: 0 }}
                >
                  <EmailIcon sx={{ color: colors.basics.secondary }} />
                </Button>
              </Box>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  width: {
                    xs: "100%",
                    md: "auto",
                    borderColor: colors.basics.primary,
                  },
                }}
                onClick={() => {
                  onViewDetails();
                }}
              >
                Book Now
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <EmailItineraryDialog open={open} handleClose={HandleClose} />
    </>
  );
};

export default FlightCard;
