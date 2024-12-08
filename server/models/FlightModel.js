import mongoose from "mongoose";

const SegmentSchema = new mongoose.Schema({
  departure_time: { type: Date, required: true },
  departure_airport_code: { type: String, required: true },
  travel_time: { type: String, required: true },
  airline_code: { type: String, required: true },
  travel_class: { type: String, required: true },
  destination_time: { type: Date, required: true },
  destination_airport_code: { type: String, required: true },
});

const LayoverSchema = new mongoose.Schema({
  time: { type: String, required: true },
  airport_code: { type: String, required: true },
});

const TravelClassSchema = new mongoose.Schema({
  class: { type: String, required: true },
  price: { type: Number, required: true },
  checked_bags: { type: Number, required: true },
  carry_on_includes: { type: Boolean, required: true },
  seat_choice: { type: Boolean, required: true },
  refundable: { type: Boolean, required: true },
  change_fee: { type: Number, required: true },
  cancellation_fee: { type: Number, required: true },
});

const FlightSchema = new mongoose.Schema({
  airline_code: { type: String, required: true },
  departure_time: { type: Date, required: true },
  departure_airport_code: { type: String, required: true },
  destination_time: { type: Date, required: true },
  destination_airport_code: { type: String, required: true },
  total_travel_time: { type: String, required: true },
  trip_type: { type: String, required: true },
  layover: [LayoverSchema],
  segments: [SegmentSchema],
  facilities: { type: [String], default: [] },
  travel_classes: [TravelClassSchema],
});

const FlightModel = mongoose.model("flight", FlightSchema);

export default FlightModel;
