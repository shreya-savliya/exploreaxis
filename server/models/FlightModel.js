import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";


const segmentSchema = new mongoose.Schema({
    segment_id: {
        type: String,
        default: uuidv4(),
        unique: true
    },
    departure_airport_code: {
        type: String,
        required: true
    },
    arrival_airport_code: {
        type: String,
        required: true
    },
    departure_time: {
        type: Date,
        required: true
    },
    arrival_time: {
        type: Date,
        required: true
    },
    travel_duration: {
        type: String,
        required: true
    }
}, { _id: false });


const flightSchema = new mongoose.Schema({
    flight_id: {
        type: String,
        default: uuidv4(),
        unique: true
    },
    airline_code: {
        type: String,
        required: true
    },
    segments: {
        type: [segmentSchema],
        required: true
    },
    stops: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    travel_class: {
        type: String,
        required: true,
        enum: ['Economy', 'Premium Economy', 'Business', 'First Class']
    },
    flight_trip_type: {
        type: String,
        required: true,
        enum: ['One-way', 'Round-trip', 'Multi-city']
    },
    travel_days: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


const FlightModel = mongoose.model('Flight', flightSchema);

export default FlightModel;
