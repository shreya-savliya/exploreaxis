import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Chip,
  Box,
  CircularProgress,
} from "@mui/material";

const RoomList = ({ roomId }) => {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomById = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/roomDetail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roomId }),
        });

        const roomData = await response.json();
        setRoom(roomData);
      } catch (error) {
        console.error("Error fetching room data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomById();
  }, [roomId]);

  if (loading) {
    return null; // Do not render anything while loading
  }

  if (!room) {
    return null; // Do not render if room data is not available
  }

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardMedia
          component="img"
          height="200"
          image={"/fallback-rooms.jpg"}
          alt={room.room_type}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h6">{room.room_type}</Typography>
          <Typography variant="body2" color="textSecondary">
            Area: {room.room_area} sq. ft.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Max Persons: {room.allowed_person}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Beds:{" "}
            {room.beds
              .map((bed) => `${bed.quantity} ${bed.type}`)
              .join(", ")}
          </Typography>
          <Typography variant="body1" color="primary" sx={{ mt: 1 }}>
            ${room.price} per night
          </Typography>
          {room.discount > 0 && (
            <Chip
              label={`Discount: ${room.discount}%`}
              color="secondary"
              sx={{ mt: 1 }}
            />
          )}
          <Box mt={2}>
            <Chip
              label={room.view || "City View"}
              color="primary"
              size="small"
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default RoomList;
