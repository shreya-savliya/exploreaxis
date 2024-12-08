import React, { useEffect, useRef, useState } from "react";
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
import ItinerarySummary from "../components/ItinerarySummary";
import { colors } from "../styles/colors";

const CheckoutPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState("");
  const prevLocationRef = useRef();
  useEffect(() => {
    // On component mount or location change, update the previous path state
    setPreviousPath(prevLocationRef.current);
    prevLocationRef.current = location.pathname;
  }, [location]);

  const shouldRenderTravelerForm =
    previousPath && previousPath.startsWith("/flights/details/");
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Navigate to payment page
    alert("payment sucessfully");
    // navigate("/payment");
  };

  return (
    <Container maxWidth="xl" sx={{ mt: "80px" }}>
      <Box sx={{ display: "flex" }}>
        <TravelerDetailsForm />

        <Box sx={{ width: "100%", maxWidth: "300px" }}>
          <ItinerarySummary />
        </Box>
      </Box>

      <Box sx={{}}>
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
                    helperText={errors.lastName ? errors.lastName.message : ""}
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
