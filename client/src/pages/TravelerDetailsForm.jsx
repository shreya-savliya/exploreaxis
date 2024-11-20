import React, { useState } from 'react';
import { Box, Button, TextField, Grid, Typography, Card, CardContent, Divider } from '@mui/material';
import TravelerForm from '../components/TravelerForm';

function TravelerDetailsForm() {
  const [passengerCount, setPassengerCount] = useState(1); // Default 1 passenger
  const [formErrors, setFormErrors] = useState([]);

  const handlePassengerCountChange = (event) => {
    const count = Math.max(1, Number(event.target.value));  // Ensures the passenger count is at least 1
    setPassengerCount(count);
  };

  const validateForm = () => {
    const errors = [];

    for (let i = 0; i < passengerCount; i++) {
      const firstName = document.getElementById(`firstName-${i + 1}`).value;
      const lastName = document.getElementById(`lastName-${i + 1}`).value;
      const dob = document.getElementById(`dob-${i + 1}`).value;
      const phone = document.getElementById(`phone-${i + 1}`).value;
      const email = document.getElementById(`email-${i + 1}`).value;

      if (!firstName || !lastName) {
        errors.push(`Traveler ${i + 1}: First and last name are required.`);
      }
      if (dob && new Date(dob) > new Date()) {
        errors.push(`Traveler ${i + 1}: Date of birth cannot be in the future.`);
      }

      const phoneRegex = /^[0-9]{10}$/;
      if (!phone || !phone.match(phoneRegex)) {
        errors.push(`Traveler ${i + 1}: Please enter a valid 10-digit phone number.`);
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!email || !email.match(emailRegex)) {
        errors.push(`Traveler ${i + 1}: Please enter a valid email address.`);
      }
    }

    if (passengerCount < 1) {
      errors.push('Please enter at least 1 passenger.');
    }

    setFormErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert('Form submitted successfully');
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4, p: 3 }}>
      <Card sx={{ mb: 4, padding: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2' }}>
            Important Information
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.6, color: '#555' }}>
            Please enter your first name, middle name (if applicable), and last name exactly as they appear on your passport/ID.
            If there is a middle name, please enter it in the name field.
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <TextField
            label="Number of Passengers"
            type="number"
            value={passengerCount}
            onChange={handlePassengerCountChange}
            variant="outlined"
            fullWidth
            inputProps={{ min: 1 }}
            sx={{ mb: 3 }}
            error={formErrors.length > 0}
            helperText={formErrors.includes('Please enter at least 1 passenger.') ? 'Please enter at least 1 passenger.' : ''}
          />
        </Grid>
      </Grid>

      <Divider sx={{ mb: 3 }} />

      {Array.from({ length: passengerCount }).map((_, index) => (
        <TravelerForm key={index} travelerNumber={index + 1} formErrors={formErrors} />
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
        <Button variant="contained" color="primary" size="large" sx={{ width: '200px' }} onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Box>
  );
}

export default TravelerDetailsForm;


