// TravelerForm.js
import React from "react";
import { Box, Grid, IconButton, TextField, Typography } from "@mui/material";
import { colors } from "../styles/colors";
import DeleteIcon from "@mui/icons-material/Delete";

function TravelerForm({
  travelerNumber,
  formErrors,
  passenger,
  onInputChange,
  onRemovePassenger,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onInputChange(travelerNumber, name, value);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: colors.basics.primary }}
          >
            Passenger {travelerNumber} Details
          </Typography>
        </Box>
        {onRemovePassenger && (
          <IconButton
            aria-label="delete"
            onClick={() => onRemovePassenger(travelerNumber)}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Box>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <TextField
            id={`firstName-${travelerNumber}`}
            name="firstName"
            label={`First Name`}
            variant="outlined"
            fullWidth
            value={passenger.firstName}
            onChange={handleChange}
            error={formErrors.some((err) =>
              err.includes(
                `Traveler ${travelerNumber}: First and last name are required.`
              )
            )}
            helperText={
              formErrors.some((err) =>
                err.includes(
                  `Traveler ${travelerNumber}: First and last name are required.`
                )
              )
                ? "First name is required."
                : ""
            }
            sx={{ mb: 3 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id={`lastName-${travelerNumber}`}
            name="lastName"
            label={`Last Name `}
            variant="outlined"
            fullWidth
            value={passenger.lastName}
            onChange={handleChange}
            error={formErrors.some((err) =>
              err.includes(
                `Traveler ${travelerNumber}: First and last name are required.`
              )
            )}
            helperText={
              formErrors.some((err) =>
                err.includes(
                  `Traveler ${travelerNumber}: First and last name are required.`
                )
              )
                ? "Last name is required."
                : ""
            }
            sx={{ mb: 3 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id={`dob-${travelerNumber}`}
            name="dob"
            label={`Date of Birth `}
            variant="outlined"
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={passenger.dob}
            onChange={handleChange}
            error={formErrors.some((err) =>
              err.includes(
                `Traveler ${travelerNumber}: Date of birth cannot be in the future.`
              )
            )}
            helperText={
              formErrors.some((err) =>
                err.includes(
                  `Traveler ${travelerNumber}: Date of birth cannot be in the future.`
                )
              )
                ? "Date of birth cannot be in the future."
                : ""
            }
            sx={{ mb: 3 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id={`phone-${travelerNumber}`}
            name="phone"
            label={`Phone Number`}
            variant="outlined"
            fullWidth
            type="tel"
            value={passenger.phone}
            onChange={handleChange}
            error={formErrors.some((err) =>
              err.includes(
                `Traveler ${travelerNumber}: Please enter a valid 10-digit phone number.`
              )
            )}
            helperText={
              formErrors.some((err) =>
                err.includes(
                  `Traveler ${travelerNumber}: Please enter a valid 10-digit phone number.`
                )
              )
                ? "Phone number is invalid."
                : ""
            }
            sx={{ mb: 3 }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id={`email-${travelerNumber}`}
            name="email"
            label={`Email `}
            variant="outlined"
            fullWidth
            type="email"
            value={passenger.email}
            onChange={handleChange}
            error={formErrors.some((err) =>
              err.includes(
                `Traveler ${travelerNumber}: Please enter a valid email address.`
              )
            )}
            helperText={
              formErrors.some((err) =>
                err.includes(
                  `Traveler ${travelerNumber}: Please enter a valid email address.`
                )
              )
                ? "Email address is invalid."
                : ""
            }
            sx={{ mb: 3 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default TravelerForm;
