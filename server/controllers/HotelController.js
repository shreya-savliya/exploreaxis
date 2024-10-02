import Hotel from "../models/HotelModel.js";

const HotelController = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export default HotelController;
