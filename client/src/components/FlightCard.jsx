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
const FlightCard = ({ flight }) => {
  return (
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
                starting from ${flight.price}
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
                  4.2
                </Typography>
              </Box>
              <Typography variant="body1" ml={1} fontWeight="bold">
                Very Good
              </Typography>
              <Typography variant="body2" color="textSecondary" ml={0.5}>
                54 reviews
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Checkbox />
                <Typography variant="body2">12:00 pm - 01:28 pm</Typography>
                <Typography variant="body2" color="textSecondary">
                  Emirates, non stop
                </Typography>
              </Box>
              <Typography variant="body2">2h 28m</Typography>
              <Typography variant="body2" color="textSecondary">
                EWR-BNA
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Checkbox />
                <Typography variant="body2">12:00 pm - 01:28 pm</Typography>
                <Typography variant="body2" color="textSecondary">
                  Emirates, non stop
                </Typography>
              </Box>
              <Typography variant="body2">2h 28m</Typography>
              <Typography variant="body2" color="textSecondary">
                EWR-BNA
              </Typography>
            </Box>
          </Grid>

          {/* Price and View Deals Button */}
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{ textAlign: { xs: "center", sm: "right" } }}
          >
            <Typography
              variant="body1"
              fontWeight="bold"
              color={colors.basics.primary}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              starting from ${flight.price}
            </Typography>
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
            >
              View Deals
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FlightCard;
