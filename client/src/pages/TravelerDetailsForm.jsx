import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TravelerForm from "../components/TravelerForm";
import { colors } from "../styles/colors";
import { setNumberOfAdults } from "../services/FarePrice";
import { useDispatch } from "react-redux";

function TravelerDetailsForm() {
  const [passengers, setPassengers] = useState([{ id: 1 }]); // Use an array to track passengers
  const [formErrors, setFormErrors] = useState([]);
  const dispatch = useDispatch();

  const handleAddPassenger = () => {
    setPassengers((prevPassengers) => [
      ...prevPassengers,
      { id: prevPassengers.length + 1 },
    ]);
    dispatch(setNumberOfAdults(passengers.length + 1));
  };

  const handleRemovePassenger = (id) => {
    if (passengers.length > 1) {
      const updatedPassengers = passengers.filter(
        (passenger) => passenger.id !== id
      );
      setPassengers(updatedPassengers);
      dispatch(setNumberOfAdults(updatedPassengers.length));
    }
  };

  const validateForm = () => {
    const errors = [];

    passengers.forEach((passenger, i) => {
      const firstName = document.getElementById(
        `firstName-${passenger.id}`
      ).value;
      const lastName = document.getElementById(
        `lastName-${passenger.id}`
      ).value;
      const dob = document.getElementById(`dob-${passenger.id}`).value;
      const phone = document.getElementById(`phone-${passenger.id}`).value;
      const email = document.getElementById(`email-${passenger.id}`).value;

      if (!firstName || !lastName) {
        errors.push(`Traveler ${i + 1}: First and last name are required.`);
      }
      if (dob && new Date(dob) > new Date()) {
        errors.push(
          `Traveler ${i + 1}: Date of birth cannot be in the future.`
        );
      }

      const phoneRegex = /^[0-9]{10}$/;
      if (!phone || !phone.match(phoneRegex)) {
        errors.push(
          `Traveler ${i + 1}: Please enter a valid 10-digit phone number.`
        );
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!email || !email.match(emailRegex)) {
        errors.push(`Traveler ${i + 1}: Please enter a valid email address.`);
      }
    });

    if (passengers.length < 1) {
      errors.push("Please enter at least 1 passenger.");
    }

    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert("Form submitted successfully");
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Card sx={{ mb: 4, padding: 3 }}>
        <CardContent>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: "bold", color: colors.basics.primary }}
          >
            Important Information
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.6, color: "#555" }}>
            Please enter your first name, middle name (if applicable), and last
            name exactly as they appear on your passport/ID. If there is a
            middle name, please enter it in the name field.
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Button variant="text" color="primary" onClick={handleAddPassenger}>
          Add New Passenger
        </Button>
      </Grid>

      <Divider sx={{ mb: 3 }} />

      {passengers.map((passenger, index) => (
        <Box key={passenger.id} sx={{ mb: 2, position: "relative" }}>
          <TravelerForm
            travelerNumber={index + 1}
            formErrors={formErrors}
            passengerId={passenger.id}
          />
          {passengers.length > 1 && (
            <IconButton
              aria-label="delete"
              onClick={() => handleRemovePassenger(passenger.id)}
              sx={{ position: "absolute", top: 0, right: 0 }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}

      {formErrors.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="error">
            <ul>
              {formErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </Typography>
        </Box>
      )}

      <Grid container justifyContent="center" mt={4}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            width: "200px",
            borderColor: colors.basics.primary,
            display: "none",
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Grid>
    </Box>
  );
}

export default TravelerDetailsForm;
