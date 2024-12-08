import Hotel from "../models/HotelModel.js";
import RoomModel from "../models/RoomModel.js";

const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();

    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const getHotelById = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id, "id");
    // Find the hotel by the hotel_id field
    const hotel = await Hotel.findOne({ hotel_id: id });
    console.log(hotel);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Return the found hotel
    res.status(200).json(hotel);
  } catch (err) {
    // Handle server errors
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

const getRoomById = async (req, res) => {
  try {
    const { roomId } = req.body;

    const room = await RoomModel.findOne({ room_id: roomId });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export { getHotels, getHotelById, getRoomById };
