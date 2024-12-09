// CheckoutPage.js
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
import HotelCheckout from "./HotelCheckout";
import ItinerarySummary from "../components/ItinerarySummary";
import { colors } from "../styles/colors";

const CheckoutPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm(); 
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({}); 

  const isFromFlightPage = location.state?.name === "flightDetails";
  const isFromHotelPage = location.state?.name === "hotelDetails";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/auth/session`,
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setUser(data.user);
          }
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
      }
    };
    fetchUser();
  }, []);

  // Callback to capture data from TravelerDetailsForm
  const handleTravelerFormSubmit = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
      flightId: location.state?.flightId,
    }));
  };

  // Callback to capture data from HotelCheckout
  const handleHotelFormSubmit = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
      hotelId: location.state?.hotelId,
      roomId: location.state?.roomId,
    }));
  };

  // Proceed to Payment
  const handleProceedToPayment = async (billingData) => {
    const isValid = await trigger(); // Trigger validation for billing details
    if (!isValid) {
      console.log("Form validation failed.");
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      billingDetails: billingData,
    }));

    navigate("/payment", {
      state: {
        formData: {
          ...formData,
          billingDetails: billingData,
          price: location?.state?.price,
        },
      },
    });
  };

  const onSubmit = (data) => handleProceedToPayment(data);

  return (
    <Container maxWidth="xl" sx={{ mt: "80px" }}>
      <Box sx={{ display: "flex", mb: 4 }}>
        {/* Render TravelerDetailsForm for flights */}
        {isFromFlightPage && (
          <TravelerDetailsForm onFormDataSubmit={handleTravelerFormSubmit}  flightId = {location.state.flightId} />
        )}

        {/* Render HotelCheckout for hotels */}
        {isFromHotelPage && (
          <HotelCheckout
            type={location.state?.type}
            persons={location.state?.persons}
            price={location.state?.price}
            onFormDataSubmit={handleHotelFormSubmit}
          />
        )}

        {/* Summary Section */}
        <Box sx={{ width: "100%", maxWidth: "300px" }}>
          <ItinerarySummary />
        </Box>
      </Box>

      {/* Billing Information */}
      <Box>
        <Typography variant="h4" gutterBottom fontSize={"18px"}>
          Billing details will be sent to
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {/* Full Name */}
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                value={user?.name || ""}
                disabled
                fullWidth
                InputLabelProps={{
                  shrink: true, // Ensures the label stays above the input
                }}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                value={user?.email || ""}
                disabled
                InputLabelProps={{
                  shrink: true, // Ensures the label stays above the input
                }}
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
                      errors.mobileNumber
                        ? errors.mobileNumber.message
                        : ""
                    }
                  />
                )}
              />
            </Grid>

            {/* Proceed to Payment Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ borderColor: colors.basics.primary }}
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
