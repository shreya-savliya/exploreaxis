import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Typography,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

function HotelCheckout({ type, price, persons }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneCode: "CAN +1",
    phone: "",
    receiveTextAlerts: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // Track if the form is being submitted

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error when user types
  };

  const handleCheckboxChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      receiveTextAlerts: event.target.checked,
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required.";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required.";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone Number must be 10 digits.";
    }
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop submission if there are validation errors
    }

    setIsSubmitting(true); // Disable the form
    console.log("Form Submitted:", formData);
    alert("Checkout form submitted!");
  };

  return (
    <Box sx={{ mt: 3, maxWidth: "600px", mx: "auto" }}>
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Who's checking in?
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 2, color: "green", fontWeight: "bold" }}
          >
            {type} room type for {persons} person(s) at {price}$
            <br />
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={2}>
            {/* First Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                placeholder="(e.g. John)"
                value={formData.firstName}
                onChange={handleInputChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                required
                disabled={isSubmitting} // Disable on submission
                sx={{ marginBottom: errors.firstName ? "8px" : "24px" }}
              />
            </Grid>

            {/* Last Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                placeholder="(e.g. Smith)"
                value={formData.lastName}
                onChange={handleInputChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                required
                disabled={isSubmitting} // Disable on submission
                sx={{ marginBottom: errors.lastName ? "8px" : "24px" }}
              />
            </Grid>

            {/* Email Address */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                placeholder="Email for confirmation"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
                required
                disabled={isSubmitting} // Disable on submission
                sx={{ marginBottom: errors.email ? "8px" : "24px" }}
              />
            </Grid>

            {/* Mobile Phone Number */}
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth disabled={isSubmitting}>
                <InputLabel>Country Code</InputLabel>
                <Select
                  name="phoneCode"
                  value={formData.phoneCode}
                  onChange={handleInputChange}
                >
                  <MenuItem value="CAN +1">CAN +1</MenuItem>
                  <MenuItem value="USA +1">USA +1</MenuItem>
                  <MenuItem value="UK +44">UK +44</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                fullWidth
                label="Mobile Phone Number"
                name="phone"
                placeholder="Enter phone number"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                error={!!errors.phone}
                helperText={errors.phone}
                required
                disabled={isSubmitting} // Disable on submission
                sx={{ marginBottom: errors.phone ? "8px" : "24px" }}
              />
            </Grid>

            {/* Receive Text Alerts */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.receiveTextAlerts}
                    onChange={handleCheckboxChange}
                    disabled={isSubmitting} // Disable on submission
                  />
                }
                label="Receive text alerts about this trip. Message frequency varies. Standard messaging rates apply."
              />
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={isSubmitting} // Disable button on submission
              sx={{
                backgroundColor: isSubmitting ? "grey.400" : "primary.main",
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              {isSubmitting ? "Data Submitted" : "Submit"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default HotelCheckout;
