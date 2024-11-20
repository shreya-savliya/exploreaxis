import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    // Navigate to payment page
    navigate('/payment'); 
  };

  return (
    <Box sx={{ p: 4, maxWidth: '600px', mx: 'auto', mt: 4, bgcolor: '#fff', boxShadow: 2, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Checkout
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* First Name */}
          <Grid item xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{ required: 'First Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName ? errors.firstName.message : ''}
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
              rules={{ required: 'Last Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName ? errors.lastName.message : ''}
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
                required: 'Email is required',
                pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Invalid email address' },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                />
              )}
            />
          </Grid>

          {/* Address */}
          <Grid item xs={12}>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{ required: 'Address is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!errors.address}
                  helperText={errors.address ? errors.address.message : ''}
                />
              )}
            />
          </Grid>

          {/* Postal Code */}
          <Grid item xs={12}>
            <Controller
              name="postalCode"
              control={control}
              defaultValue=""
              rules={{
                required: 'Postal Code is required',
                pattern: { value: /^[0-9]{5,6}$/, message: 'Invalid Postal Code (5-6 digits)' },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Postal Code"
                  fullWidth
                  error={!!errors.postalCode}
                  helperText={errors.postalCode ? errors.postalCode.message : ''}
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
                required: 'Mobile Number is required',
                pattern: { value: /^[0-9]{10}$/, message: 'Invalid Mobile Number (10 digits)' },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mobile Number"
                  fullWidth
                  error={!!errors.mobileNumber}
                  helperText={errors.mobileNumber ? errors.mobileNumber.message : ''}
                />
              )}
            />
          </Grid>

          {/* Proceed to Payment Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Proceed to Payment
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CheckoutPage;
