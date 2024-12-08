import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import TravelerDetailsForm from "./TravelerDetailsForm";
import HotelCheckout from "./HotelCheckout"; // Import HotelCheckout component
import ItinerarySummary from "../components/ItinerarySummary";
import { colors } from "../styles/colors";

const CheckoutPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm(); // Add `trigger` for manual validation
  const navigate = useNavigate();
  const location = useLocation();

  const isFromFlightPage = location.state === "flightDetails";
  const isFromHotelPage = location.state?.name === "hotelDetails";

  const handleProceedToPayment = async () => {
    const isValid = await trigger(); // Trigger validation for all fields
    if (isValid) {
      navigate("/payment"); // Navigate only if the form is valid
    } else {
      console.log("Form validation failed. Fix errors before proceeding.");
    }
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Payment successful!");
  };

  return (
    <Container maxWidth="xl" sx={{ mt: "80px" }}>
      <Box sx={{ display: "flex", mb: 4 }}>
        {isFromFlightPage && <TravelerDetailsForm />}
        {isFromHotelPage && (
          <HotelCheckout
            type={location.state.type}
            persons={location.state.persons}
            price={location.state.price}
          />
        )}

        <Box sx={{ width: "100%", maxWidth: "300px" }}>
          <ItinerarySummary />
        </Box>
      </Box>

      <Box>
        <Typography variant="h4" gutterBottom fontSize={"18px"}>
          Billing details will be sent to
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* First Name */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                rules={{ required: "First Name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    fullWidth
                    error={!!errors.firstName}
                    helperText={
                      errors.firstName ? errors.firstName.message : ""
                    }
                  />
                )}
              />
            </Grid>

            {/* Last Name */}
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                rules={{ required: "Last Name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    fullWidth
                    error={!!errors.lastName}
                    helperText={
                      errors.lastName ? errors.lastName.message : ""
                    }
                  />
                )}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ""}
                  />
                )}
              />
            </Grid>

            {/* Mobile Number */}
            <Grid item xs={12}>
              <Controller
                name="mobileNumber"
                control={control}
                defaultValue=""
                rules={{
                  required: "Mobile Number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid Mobile Number (10 digits)",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Mobile Number"
                    fullWidth
                    error={!!errors.mobileNumber}
                    helperText={
                      errors.mobileNumber ? errors.mobileNumber.message : ""
                    }
                  />
                )}
              />
            </Grid>

            {/* Proceed to Payment Button */}
            <Grid item xs={12}>
              <Button
                type="button" // Change to "button" to prevent form submission
                variant="contained"
                color="primary"
                sx={{ borderColor: colors.basics.primary }}
                onClick={handleProceedToPayment} // Trigger validation and navigation
              >
                Proceed to Payment
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
