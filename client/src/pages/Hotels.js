import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormLabel,
  Slider,
  Rating,
} from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch("http://localhost:8000/gethotels");
        const data = await response.json();
        setHotels(data); // Assuming the data comes in the correct format
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotels();
  }, []);

  return (
    <Box p={4}>
      <Grid container spacing={2}>
        {/* Filter Section */}
        <Grid item xs={12} md={3}>
          <Box p={2}>
            <Typography variant="h6" gutterBottom>
              Filter
            </Typography>
            <FormGroup>
              <FormLabel>Destinations</FormLabel>
              <FormControlLabel control={<Checkbox />} label="Florida" />
              <FormControlLabel control={<Checkbox />} label="Miami" />
              <FormLabel>Price Range</FormLabel>
              <Slider defaultValue={50} aria-label="Price Range" />
              <FormLabel>Star Rating</FormLabel>
              <FormControlLabel
                control={<Checkbox />}
                label={<Rating value={5} readOnly />}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={<Rating value={4} readOnly />}
              />
              <FormControlLabel
                control={<Checkbox />}
                label={<Rating value={3} readOnly />}
              />
            </FormGroup>
          </Box>
        </Grid>

        {/* Hotel Listings Section */}
        <Grid item xs={12} md={9}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Sort by: Popularity
            </Typography>

            {hotels.length > 0 ? (
              hotels.map((hotel) => (
                <Card key={hotel.hotel_id} sx={{ mb: 4 }}>
                  <Grid container>
                    <Grid item xs={12} md={4}>
                      <img
                        src="https://via.placeholder.com/500x300/000000/FFFFFF?text=No%20Image%20Available"
                        height={200}
                      ></img>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <CardContent>
                        <Typography variant="h6">{hotel.hotel_name}</Typography>
                        <Typography color="textSecondary" gutterBottom>
                          {hotel.located}
                        </Typography>
                        <Chip
                          label={hotel.short_description}
                          color="primary"
                          sx={{ mb: 2 }}
                        />
                        <Typography variant="body2" gutterBottom>
                          {hotel.long_description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Located at: {hotel.address.street},{" "}
                          {hotel.address.city}, {hotel.address.state}
                        </Typography>
                        <Typography variant="h6" color="primary">
                          {/* Assuming you have pricing data */}
                          $500 per night
                        </Typography>
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          mt={2}
                        >
                          <Button variant="contained" color="secondary">
                            More Details
                          </Button>
                          <Box display="flex" alignItems="center">
                            <Checkbox
                              icon={<FavoriteBorder />}
                              checkedIcon={<Favorite />}
                            />
                            <Typography variant="body2">
                              My Shortlist
                            </Typography>
                          </Box>
                          {/* Assuming the hotel rating comes as part of the data */}
                          <Rating value={4} readOnly />{" "}
                          {/* Set actual rating if available */}
                        </Box>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              ))
            ) : (
              <Typography variant="body1">No hotels available</Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hotels;
