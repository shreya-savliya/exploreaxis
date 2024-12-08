import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Tabs,
  Tab,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useLocation, useNavigate } from "react-router-dom";

// Load Stripe with your publishable key
const stripePromise = loadStripe("pk_test_A7jK4iCYHL045qgjjfzAfPxu");

const CheckoutForm = ({ formData, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const location = useLocation();
  const { price } = location?.state?.formData;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!stripe || !elements) {
      setLoading(false);
      setErrorMessage("Stripe has not loaded yet. Please try again later.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: nameOnCard,
      },
    });

    if (error) {
      setLoading(false);
      setErrorMessage(error.message || "An error occurred during payment.");
      return;
    }

    console.log("PaymentMethod created:", paymentMethod);

    // Simulate successful payment and call backend API
    try {
      const response = await fetch(
        formData.flightId
          ? `${process.env.REACT_APP_API_URL}/flight-order`
          : `${process.env.REACT_APP_API_URL}/hotel-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            totalPrice: price,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Order saved:", result);
        onPaymentSuccess(); // Trigger success dialog
        cardElement.clear(); // Clear card details
      } else {
        setErrorMessage(result.message || "Failed to save order.");
      }
    } catch (err) {
      setErrorMessage(err.message || "An error occurred while saving the order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {/* Name on Card */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name on Card"
            placeholder="Enter name as it appears on card"
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
            required
          />
        </Grid>

        {/* Card Element */}
        <Grid item xs={12}>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              mb: 2,
            }}
          >
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </Box>
        </Grid>
      </Grid>

      {errorMessage && (
        <Typography color="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Typography>
      )}

      {/* Submit Button */}
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </Button>
      </Box>
    </Box>
  );
};

const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const formData = location.state?.formData || {};
  console.log(formData);
  

  const handleTabChange = (event, newValue) => {
    setPaymentMethod(newValue);
  };

  const handlePaymentSuccess = () => {
    setIsDialogOpen(true); // Open success dialog
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false); // Close dialog
    navigate("/"); // Navigate to success page or home
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Payment Method
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
        <Typography variant="body2" color="success.main">
          ✔ We use secure transmission
        </Typography>
        <Typography variant="body2" color="success.main">
          ✔ We protect your personal information
        </Typography>
      </Box>
      <Tabs
        value={paymentMethod}
        onChange={handleTabChange}
        aria-label="Payment Methods"
        sx={{ mb: 3 }}
      >
        <Tab label="Debit/Credit Card" value="card" />
      </Tabs>

      {paymentMethod === "card" && (
        <Elements stripe={stripePromise}>
          <CheckoutForm formData={formData} onPaymentSuccess={handlePaymentSuccess} />
        </Elements>
      )}

      {/* Success Dialog */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogContent sx={{ textAlign: "center", p: 5 }}>
          <CheckCircleOutlineIcon
            sx={{ fontSize: 80, color: "green", mb: 2 }}
          />
          <Typography variant="h5" color="white" gutterBottom>
            Payment Successful!
          </Typography>
          <Typography color="white" variant="body1">
            Thank you for your purchase. Your payment was processed successfully.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            variant="contained"
            color="primary"
            fullWidth
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PaymentMethod;
