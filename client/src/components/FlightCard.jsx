import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const FlightCard = ({ flight, onViewDetails }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{flight.airline}</Typography>
        <Typography variant="body2">Price: ${flight.price}</Typography>
        <Typography variant="body2">Duration: {flight.duration}</Typography>
        {/* Add other flight details as needed */}
        <Button variant="contained" color="primary" onClick={onViewDetails}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default FlightCard;
