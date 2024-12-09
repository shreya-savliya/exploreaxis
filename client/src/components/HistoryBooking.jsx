import { Container, Typography } from "@mui/material";
import React from "react";

const HistoryBooking = () => {
  return (
    <Container>
      <Typography variant="h6" sx={{ mt: 3 }}>
        History of Booking
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Your booking history will be displayed here.
      </Typography>
    </Container>
  );
};

export default HistoryBooking;
