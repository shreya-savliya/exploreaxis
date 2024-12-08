import HotelOrder from "../models/HotelOrder.js";

// Controller to handle hotel order creation
export default async function createHotelOrder(req, res) {
  const { hotelId, roomId, firstName, lastName, email, phone, totalPrice } = req.body;

  // Validate input fields
  if (!hotelId) {
    return res.status(400).json({ success: false, message: "Hotel ID is required." });
  }

  if (!roomId) {
    return res.status(400).json({ success: false, message: "Room ID is required." });
  }

  if (!firstName || !lastName) {
    return res.status(400).json({
      success: false,
      message: "First name and last name are required.",
    });
  }

  if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return res.status(400).json({
      success: false,
      message: "A valid email address is required.",
    });
  }

  if (!phone || !/^[0-9]{10}$/.test(phone)) {
    return res.status(400).json({
      success: false,
      message: "A valid 10-digit phone number is required.",
    });
  }

  if (!totalPrice || totalPrice <= 0) {
    return res.status(400).json({
      success: false,
      message: "A valid total price is required.",
    });
  }

  // Save hotel order to the database
  try {
    const hotelOrder = new HotelOrder({
      hotelId,
      roomId,
      firstName,
      lastName,
      email,
      phone,
      totalPrice,
    });
    const savedOrder = await hotelOrder.save();
    res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
