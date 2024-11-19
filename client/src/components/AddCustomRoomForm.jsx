import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

const AddCustomRoomForm = () => {
  const [formData, setFormData] = useState({
    room_type: "",
    include_meal: [],
    services: "",
    room_area: "",
    allowed_person: "",
    beds: { quantity: "", type: "" },
    price: "",
    view: "",
    special_requests: "",
  });

  const mealOptions = ["Breakfast", "Lunch", "Dinner", "None"];
  const bedTypes = ["King", "Queen", "Twin", "Single"];
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Process services into an array
    const processedFormData = {
      ...formData,
      services: formData.services.split(",").map((service) => service.trim()),
    };

    try {
      const response = await fetch("http://localhost:8000/addCustomRoom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(processedFormData),
      });

      if (response.ok) {
        setMessage("Customized room requested successfully");
        setFormData({
          room_type: "",
          include_meal: [],
          services: "",
          room_area: "",
          allowed_person: "",
          beds: { quantity: "", type: "" },
          price: "",
          view: "",
          special_requests: "",
        });
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.details
          ? Object.values(errorData.details)[0].message // Show the first validation error
          : "An error occurred. Please try again.";
        setMessage(errorMessage);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Failed to submit the form. Please try again later!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Add a Customized Room
      </Typography>
      {message && (
        <Typography
          variant="subtitle1"
          color={message === "Customized room requested successfully" ? "green" : "red"}
          gutterBottom
        >
          {message}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Room Type"
              name="room_type"
              value={formData.room_type}
              onChange={handleChange}
              fullWidth
              required
              select
            >
              <MenuItem value="Deluxe">Deluxe</MenuItem>
              <MenuItem value="Suite">Suite</MenuItem>
              <MenuItem value="Standard">Standard</MenuItem>
              <MenuItem value="Custom">Custom</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Room Area (sqm)"
              name="room_area"
              value={formData.room_area}
              onChange={handleChange}
              type="number"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Number of Allowed Persons"
              name="allowed_person"
              value={formData.allowed_person}
              onChange={handleChange}
              type="number"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Bed Quantity"
              name="beds.quantity"
              value={formData.beds.quantity}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  beds: { ...prevData.beds, quantity: e.target.value },
                }))
              }
              type="number"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Bed Type"
              name="beds.type"
              value={formData.beds.type}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  beds: { ...prevData.beds, type: e.target.value },
                }))
              }
              fullWidth
              select
              required
            >
              {bedTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Your Budget (per night)"
              name="price"
              value={formData.price}
              onChange={handleChange}
              type="number"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Services (comma-separated)"
              name="services"
              value={formData.services}
              onChange={handleChange}
              placeholder="Wi-Fi, Air Conditioning, Room Service"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="View Preference"
              name="view"
              value={formData.view}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Special Requests"
              name="special_requests"
              value={formData.special_requests}
              onChange={handleChange}
              rows={4}
              placeholder="e.g., Wheelchair access, pet-friendly"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddCustomRoomForm;
