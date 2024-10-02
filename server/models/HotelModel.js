import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  hotel_id: { type: String, default: "uuidv4" },
  hotel_name: { type: String, required: true },
  located: { type: String, required: true },
  amenities: [String],
  long_description: { type: String },
  short_description: { type: String },
  reviewId: [{ type: String, ref: "Review" }],
  hotel_images: [String],
  address: {
    street: String,
    pincode: String,
    city: String,
    state: String,
    country: String,
  },
  roomId: [{ type: String, ref: "Room" }],
});

const HotelModel = mongoose.model("Hotel", hotelSchema);

export default HotelModel;
