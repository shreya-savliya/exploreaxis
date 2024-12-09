import FlightOrder from "../models/FlightOrder.js";

// Create Flight Order Controller
export default async function createFlightOrder(req, res) {
  const { flightId, travelers, totalPrice } = req.body;

  // Validate required fields
  if (!flightId) {
    return res.status(400).json({ success: false, message: "Flight ID is required." });
  }

  if (!travelers || !Array.isArray(travelers) || travelers.length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one traveler is required.",
    });
  }

  // Validate each traveler
  for (const traveler of travelers) {
    const { firstName, lastName, dob, phone, email } = traveler;

    if (!firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: "First name and last name are required for all travelers.",
      });
    }

    if (!dob || isNaN(new Date(dob).getTime())) {
      return res.status(400).json({
        success: false,
        message: "A valid date of birth is required for all travelers.",
      });
    }

    if (!phone || !/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "A valid 10-digit phone number is required for all travelers.",
      });
    }

    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "A valid email address is required for all travelers.",
      });
    }
  }

  if (!totalPrice || totalPrice <= 0) {
    return res.status(400).json({
      success: false,
      message: "A valid total price is required.",
    });
  }

  // Save flight order to the database
  try {
    const flightOrder = new FlightOrder({ flightId, travelers, totalPrice });
    const savedOrder = await flightOrder.save();
    res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
