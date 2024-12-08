import mongoose from "mongoose";

// Define the schema for Hotel Order
const HotelOrderSchema = new mongoose.Schema({
  hotelId: { type: String, required: true }, // Reference to the hotel being booked
  roomId: { type: String, required: true }, // Reference to the room being booked
  firstName: { type: String, required: true }, // User's first name
  lastName: { type: String, required: true }, // User's last name
  email: { type: String, required: true }, // User's email address
  phone: { type: String, required: true }, // User's phone number
  totalPrice: { type: Number, required: true }, // Total price of the hotel booking
  createdAt: { type: Date, default: Date.now }, // Timestamp for the order
});

// Create the model
const HotelOrder = mongoose.model("HotelOrder", HotelOrderSchema);

export default HotelOrder;
