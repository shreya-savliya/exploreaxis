// TravelerDetailsForm.js
import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Divider,
  Card,
  Typography,
} from "@mui/material";
import { colors } from "../styles/colors";
import TravelerForm from "../components/TravelerForm"; 

function TravelerDetailsForm({ onFormDataSubmit }) {
  const [passengers, setPassengers] = useState([
    { id: 1, firstName: "", lastName: "", dob: "", phone: "", email: "" },
  ]); // Initialize with one passenger
  const [formErrors, setFormErrors] = useState([]);

  const handleAddPassenger = () => {
    setPassengers((prevPassengers) => [
      ...prevPassengers,
      {
        id:
          prevPassengers.length > 0
            ? prevPassengers[prevPassengers.length - 1].id + 1
            : 1,
        firstName: "",
        lastName: "",
        dob: "",
        phone: "",
        email: "",
      },
    ]);
  };

  const handleRemovePassenger = (id) => {
    if (passengers.length > 1) {
      const updatedPassengers = passengers.filter(
        (passenger) => passenger.id !== id
      );
      setPassengers(updatedPassengers);
    }
  };

  const handleInputChange = (id, field, value) => {
    setPassengers((prevPassengers) =>
      prevPassengers.map((passenger) =>
        passenger.id === id ? { ...passenger, [field]: value } : passenger
      )
    );
  };

  const validateForm = () => {
    const errors = [];
    const travelers = passengers.map((passenger) => {
      const { firstName, lastName, dob, phone, email } = passenger;

      if (!firstName || !lastName) {
        errors.push(
          `Traveler ${passenger.id}: First and last name are required.`
        );
      }
      if (dob && new Date(dob) > new Date()) {
        errors.push(
          `Traveler ${passenger.id}: Date of birth cannot be in the future.`
        );
      }
      if (!/^\d{10}$/.test(phone)) {
        errors.push(
          `Traveler ${passenger.id}: Please enter a valid 10-digit phone number.`
        );
      }
      if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
      ) {
        errors.push(
          `Traveler ${passenger.id}: Please enter a valid email address.`
        );
      }

      return { firstName, lastName, dob, phone, email };
    });

    setFormErrors(errors);
    return errors.length === 0 ? travelers : null;
  };

  const handleSubmit = () => {
    const travelers = validateForm();
    if (travelers) {
      console.log(travelers);
      onFormDataSubmit({ travelers }); // Pass traveler data to the parent component
    }
  };

  return (
    <Box>
      <Card sx={{ mb: 4, padding: 3 }}>
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: colors.basics.primary }}
          >
            Traveler Details
          </Typography>
          <Typography
            variant="body2"
            sx={{ mt: 1, color: colors.basics.secondary }}
          >
            Please enter traveler information exactly as it appears on their
            passport/ID.
          </Typography>
        </Box>
      </Card>

      {passengers.map((passenger) => (
        <Box key={passenger.id} sx={{ mb: 4, position: "relative" }}>
          <TravelerForm
            travelerNumber={passenger.id}
            formErrors={formErrors}
            passenger={passenger}
            onInputChange={handleInputChange}
            onRemovePassenger={handleRemovePassenger}
          />
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

      <Divider sx={{ mb: 3 }} />

      <Grid container justifyContent="center">
        <Grid item>
          <Button
            variant="text"
            color="primary"
            onClick={handleAddPassenger}
            sx={{ textTransform: "none" }}
          >
            Add Another Traveler
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ ml: 2, textTransform: "none" }}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TravelerDetailsForm;
