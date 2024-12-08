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
  Container,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [roomsData, setRoomsData] = useState([]); // To store fetched rooms data
  const [priceRange, setPriceRange] = useState([50, 1200]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const navigate = useNavigate();

  // Fetch hotels initially
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/gethotels`);
        const data = await response.json();
        setHotels(data);
        setFilteredHotels(data);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotels();
  }, []);

  // Fetch rooms by hotel room IDs
  useEffect(() => {
    const fetchRoomsByHotel = async () => {
      const allRooms = [];

      for (const hotel of hotels) {
        for (const roomId of hotel.roomId) {
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/roomDetail`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ roomId }),
            });
            const roomData = await response.json();
            allRooms.push({ hotelId: hotel.hotel_id, room: roomData });
          } catch (error) {
            console.error("Error fetching room data:", error);
          }
        }
      }

      setRoomsData(allRooms);
    };

    if (hotels.length > 0) {
      fetchRoomsByHotel();
    }
  }, [hotels]);

  // Handle price filter change
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  // Handle services filter change
  const handleServicesChange = (event) => {
    const service = event.target.value;
    setSelectedServices((prevServices) =>
      event.target.checked
        ? [...prevServices, service]
        : prevServices.filter((item) => item !== service)
    );
  };

  // Handle amenities filter change
  const handleAmenitiesChange = (event) => {
    const amenity = event.target.value;
    setSelectedAmenities((prevAmenities) =>
      event.target.checked
        ? [...prevAmenities, amenity]
        : prevAmenities.filter((item) => item !== amenity)
    );
  };

  // Apply all filters to the hotels and rooms
  useEffect(() => {
    const applyFilters = () => {
      let filtered = hotels;

      // Filter by amenities
      if (selectedAmenities.length > 0) {
        filtered = filtered.filter((hotel) =>
          selectedAmenities.every((amenity) =>
            hotel.amenities.includes(amenity)
          )
        );
      }

      // Filter by price and services
      filtered = filtered.filter((hotel) => {
        const hotelRooms = roomsData.filter(
          (roomData) => roomData.hotelId === hotel.hotel_id
        );

        const matchingRooms = hotelRooms.filter((roomData) => {
          const { room } = roomData;

          // Price filter
          const isPriceInRange =
            room.price >= priceRange[0] && room.price <= priceRange[1];

          // Services filter
          const hasRequiredServices =
            selectedServices.length === 0 ||
            selectedServices.every((service) =>
              room.services.includes(service)
            );

          return isPriceInRange && hasRequiredServices;
        });

        return matchingRooms.length > 0; // Return hotel if any rooms match
      });

      setFilteredHotels(filtered);
    };

    applyFilters();
  }, [hotels, roomsData, priceRange, selectedServices, selectedAmenities]);

  return (
    <Container maxWidth="xl">
      <Box sx={{ m: "50px 0 80px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            {/* Filters Section */}
            <Box p={2}>
              <Typography variant="h6" gutterBottom>
                Filters
              </Typography>

              {/* Price Filter */}
              <Typography variant="subtitle1">Price</Typography>
              <Slider
                value={priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={50}
                max={1200}
              />
              <Typography>
                ${priceRange[0]} - ${priceRange[1]}
              </Typography>

              {/* Services Filter */}
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Services
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox value="Wi-Fi" onChange={handleServicesChange} />
                  }
                  label="Wi-Fi"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Air Conditioning"
                      onChange={handleServicesChange}
                    />
                  }
                  label="Air Conditioning"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Room Service"
                      onChange={handleServicesChange}
                    />
                  }
                  label="Room Service"
                />
                <FormControlLabel
                  control={
                    <Checkbox value="TV" onChange={handleServicesChange} />
                  }
                  label="TV"
                />
              </FormGroup>

              {/* Amenities Filter */}
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                Amenities
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Free Parking"
                      onChange={handleAmenitiesChange}
                    />
                  }
                  label="Free Parking"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Free Wi-Fi"
                      onChange={handleAmenitiesChange}
                    />
                  }
                  label="Free Wi-Fi"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Swimming Pool"
                      onChange={handleAmenitiesChange}
                    />
                  }
                  label="Swimming Pool"
                />
                <FormControlLabel
                  control={
                    <Checkbox value="Gym" onChange={handleAmenitiesChange} />
                  }
                  label="Gym"
                />
                <FormControlLabel
                  control={
                    <Checkbox value="Bar" onChange={handleAmenitiesChange} />
                  }
                  label="Bar"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value="Fitness Center"
                      onChange={handleAmenitiesChange}
                    />
                  }
                  label="Fitness Center"
                />
              </FormGroup>
            </Box>
          </Grid>

          {/* Hotel Display Section */}
          <Grid item xs={12} md={9}>
            <Box sx={{ mt: 4 }}>
              <React.Suspense fallback={<CircularProgress />}>
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
                            </Box>
                          </CardContent>
                        </Grid>
                      </Grid>
                    </Card>
                  ))
                ) : (
                  <h4>No Hotels Found!</h4>
                )}
              </React.Suspense>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Hotels;
