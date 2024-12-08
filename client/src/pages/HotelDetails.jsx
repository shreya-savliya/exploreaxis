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
  Container,
  Rating,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import HotelMap from "../components/HotelMap";
import RoomList from "../components/RoomList";
import AddCustomRoomForm from "../components/AddCustomRoomForm";
import { useDispatch } from "react-redux";
import { setSelectedFarePrice } from "../services/FarePrice";

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchHotelById = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/hotelDetail`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          }
        );
        const data = await response.json();
        setHotel(data);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelById();
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!hotel) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h4">Hotel not found.</Typography>
      </Box>
    );
  }
  console.log(hotel, "hotel");
  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <Card>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              height="400"
              image={"/fallback.jpg"}
              alt={hotel.hotel_name}
              sx={{ objectFit: "cover" }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
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
              <Typography variant="body1" paragraph>
                {hotel.long_description}
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Address: {hotel.address?.street}, {hotel.address?.city},{" "}
                {hotel.address?.state}, {hotel.address?.country}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Amenities:
              </Typography>
              <List dense>
                {hotel.amenities?.map((amenity, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={amenity} />
                  </ListItem>
                )) || <Typography>No amenities available</Typography>}
              </List>
              <Rating value={4} readOnly />{" "}
              <Box mt={4}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 2 }}
                  onClick={() => {
                    navigate("/checkout");
                    dispatch(setSelectedFarePrice(500));
                  }}
                >
                  Book Now
                </Button>
                <Button variant="outlined" color="secondary">
                  Add to Shortlist
                </Button>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      {hotel.roomId && hotel.roomId.length > 0 && (
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Available Rooms
          </Typography>
          <Grid container spacing={2}>
            {hotel.roomId.map((roomId) => (
              <RoomList key={roomId} roomId={roomId} />
            ))}
          </Grid>
        </Box>
      )}

      <AddCustomRoomForm />

      {hotel.latitude && hotel.longitude && (
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Hotel Location
          </Typography>
          <HotelMap latitude={hotel.latitude} longitude={hotel.longitude} />
        </Box>
      )}
    </Container>
  );
};

export default HotelDetails;
