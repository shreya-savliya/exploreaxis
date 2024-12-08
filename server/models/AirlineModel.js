import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
});

const AirlineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    country: { type: String, required: true },
    founded: { type: String, required: true },
    fleet_size: { type: String, required: true },
    headquarters: { type: String, required: true },
    website: { type: String, required: true },
    destinations: [destinationSchema],
});

const AirlineModel = mongoose.model("Airline", AirlineSchema);

export default AirlineModel;
