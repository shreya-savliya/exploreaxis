import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';

function TravelerForm({ travelerNumber, formErrors }) {
  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Traveler {travelerNumber} Details
      </Typography>

      <Grid item xs={12} md={6}>
        <TextField
          id={`firstName-${travelerNumber}`}
          label={`First Name ${travelerNumber}`}
          variant="outlined"
          fullWidth
          error={formErrors.some((err) => err.includes(`Traveler ${travelerNumber}: First and last name are required.`))}
          helperText={formErrors.some((err) => err.includes(`Traveler ${travelerNumber}: First and last name are required.`)) ? 'First name is required.' : ''}
          sx={{ mb: 3 }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id={`lastName-${travelerNumber}`}
          label={`Last Name ${travelerNumber}`}
          variant="outlined"
          fullWidth
          error={formErrors.some((err) => err.includes(`Traveler ${travelerNumber}: First and last name are required.`))}
          helperText={formErrors.some((err) => err.includes(`Traveler ${travelerNumber}: First and last name are required.`)) ? 'Last name is required.' : ''}
          sx={{ mb: 3 }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id={`dob-${travelerNumber}`}
          label={`Date of Birth ${travelerNumber}`}
          variant="outlined"
          fullWidth
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          error={formErrors.some((err) => err.includes(`Traveler ${travelerNumber}: Date of birth cannot be in the future.`))}
          helperText={formErrors.some((err) => err.includes(`Traveler ${travelerNumber}: Date of birth cannot be in the future.`)) ? 'Date of birth cannot be in the future.' : ''}
          sx={{ mb: 3 }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id={`phone-${travelerNumber}`}
          label={`Phone Number ${travelerNumber}`}
          variant="outlined"
          fullWidth
          type="tel"
          error={formErrors.some((err) => err.includes(`Traveler ${travelerNumber}: Please enter a valid 10-digit phone number.`))}
          helperText={formErrors.some((err) => err.includes(`Traveler ${travelerNumber}: Please enter a valid 10-digit phone number.`)) ? 'Phone number is invalid.' : ''}
          sx={{ mb: 3 }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id={`email-${travelerNumber}`}
          label={`Email ${travelerNumber}`}
          variant="outlined"
          fullWidth
          type="email"
          error={formErrors.some((err) => err.includes(`Traveler ${travelerNumber}: Please enter a valid email address.`))}
          helperText={formErrors.some((err) => err.includes(`Traveler ${travelerNumber}: Please enter a valid email address.`)) ? 'Email address is invalid.' : ''}
          sx={{ mb: 3 }}
        />
      </Grid>
    </Grid>
  );
}

export default TravelerForm;

