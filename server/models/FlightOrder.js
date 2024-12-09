import mongoose from "mongoose";

// Schema for Traveler Details
const TravelerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

// Schema for Flight Order
const FlightOrderSchema = new mongoose.Schema({
  flightId: { type: String, required: true }, // Reference to the flight being booked
  travelers: [TravelerSchema], // Array of traveler details
  totalPrice: { type: Number, required: true }, // Total price of the flight booking
  createdAt: { type: Date, default: Date.now }, // Timestamp for the order
});

// Create Mongoose Models
const FlightOrder = mongoose.model("FlightOrder", FlightOrderSchema);

export default FlightOrder;
