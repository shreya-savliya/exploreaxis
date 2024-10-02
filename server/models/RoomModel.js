import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
    room_id: { type: String },
    room_type: { type: String, required: true },
    include_meal: [{ type: String, enum: ['Breakfast', 'Lunch', 'Dinner'] }],
    services: [String],
    room_area: { type: Number, required: true },
    allowed_person: { type: Number, required: true },
    beds: [{
        quantity: { type: Number, required: true },
        type: { type: String, enum: ['Single', 'Double', 'Twin', 'Queen', 'King'], required: true }
    }],
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    view: { type: String, default: 'City View' },
    availability: { type: Boolean, default: true }
});

const RoomModel = mongoose.model('Room', RoomSchema);

export default RoomModel