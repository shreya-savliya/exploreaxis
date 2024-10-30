// models/Airport.js
import mongoose from 'mongoose';

const airportSchema = new mongoose.Schema({
    destination_id: String,
    city: String,
    airport_name: String,
    airport_code: String,
});

const AirportModel = mongoose.model('Airport', airportSchema);
export default AirportModel;
