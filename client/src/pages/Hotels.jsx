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
  Container,
} from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [selectedDestinations, setSelectedDestinations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch("http://localhost:4000/gethotels");
        const data = await response.json();
        console.log("Fetched hotels:", data);
        setHotels(data);
        setFilteredHotels(data);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotels();
  }, []);

  const handleDestinationChange = (event) => {
    const destination = event.target.value;
    setSelectedDestinations((prevDestinations) =>
      event.target.checked
        ? [...prevDestinations, destination]
        : prevDestinations.filter((dest) => dest !== destination)
    );
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = hotels;

      // Filter by destinations
      if (selectedDestinations.length > 0) {
        filtered = filtered.filter((hotel) =>
          selectedDestinations.includes(hotel.address?.city || "")
        );
      }

      setFilteredHotels(filtered);
    };

    applyFilters();
  }, [hotels, selectedDestinations]);

  return (
    <Container maxWidth="xl">
      <Box sx={{ m: "50px 0 80px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Box p={2}>
              <Typography variant="h6" gutterBottom>
                Filter
              </Typography>
              <FormGroup>
                <FormLabel>Destinations</FormLabel>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Miami"
                      onChange={handleDestinationChange}
                    />
                  }
                  label="Miami"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Florida"
                      onChange={handleDestinationChange}
                    />
                  }
                  label="Florida"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="New York"
                      onChange={handleDestinationChange}
                    />
                  }
                  label="New York"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Aspen"
                      onChange={handleDestinationChange}
                    />
                  }
                  label="Aspen"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="London"
                      onChange={handleDestinationChange}
                    />
                  }
                  label="London"
                />
              </FormGroup>
            </Box>
          </Grid>

          <Grid item xs={12} md={9}>
            <Box sx={{ mt: 4 }}>
              {filteredHotels.length > 0 ? (
                filteredHotels.map((hotel) => (
                  <Card key={hotel.hotel_id} sx={{ mb: 4 }}>
                    <Grid container>
                      <Grid item xs={12} md={4}>
                        <CardMedia
                          component="img"
                          image={"/fallback.jpg"}
                          alt={hotel.hotel_name}
                          sx={{
                            width: "100%",
                            height: "200px",
                            objectFit: "cover",
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <CardContent>
                          <Typography variant="h6">
                            {hotel.hotel_name}
                          </Typography>
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
                            Located at: {hotel.address?.street || "N/A"},{" "}
                            {hotel.address?.city || "N/A"},{" "}
                            {hotel.address?.state || "N/A"}
                          </Typography>
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            mt={2}
                          >
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() =>
                                navigate(`/hotels/${hotel.hotel_id}`)
                              }
                            >
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
    </Container>
  );
};

export default Hotels;
