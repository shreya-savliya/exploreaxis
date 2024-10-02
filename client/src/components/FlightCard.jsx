import React from "react";
import {
  Box,
  Typography,
  Checkbox,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

const FlightCard = ({ flight }) => {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 2, maxWidth: "100%", p: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          {/* Airline Logo */}
          <Grid
            item
            xs={12}
            sm={2}
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Emirates_logo.svg/1200px-Emirates_logo.svg.png"
              alt="Emirates Logo"
              style={{ maxWidth: "100px" }}
            />
          </Grid>

          {/* Flight Details */}
          <Grid item xs={12} sm={6}>
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
            item
            xs={12}
            sm={4}
            sx={{ textAlign: { xs: "center", sm: "right" } }}
          >
            <Typography variant="body1" fontWeight="bold" color="error">
              starting from ${flight.price}
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2, width: { xs: "100%", sm: "auto" } }}
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
