import { Router } from "express";
import FlightController from "../controllers/FlightController.js";
import {
  getHotels,
  getHotelById,
  getRoomById,
} from "../controllers/HotelController.js";
import AirportController from "../controllers/AirportController.js";
import AirlineController from "../controllers/AirlineController.js";
import EmailItinerary from "../controllers/EmailItineraryController.js";
import addCustomRoom from "../controllers/addCustomRoom.js";
import { loginUser, registerUser } from "../controllers/UserController.js";
import OpenAI from "openai";
import createFlightOrder from "../controllers/createFlightOrder.js";
import createHotelOrder from "../controllers/createHotelOrder.js";
import User from "../models/UserModel.js";
import FlightModel from "../models/FlightModel.js";
import HotelModel from "../models/HotelModel.js";
import HotelOrder from "../models/HotelOrder.js";
import FlightOrder from "../models/FlightOrder.js";
import AirportModel from "../models/AirportModel.js";
import faqs from "./faqs.json" assert { type: "json" }; 
const router = Router();
const openai = new OpenAI();

router.get("/getflights", FlightController.GetAllFlights);
router.get("/getflights/:id", FlightController.GetSingleFlight);
router.post("/searchflights", FlightController.SearchFlights);
router.get("/airport", AirportController.getAllAirport);
router.get("/airports/:airportCode", AirportController.getAirportByCode);
router.get("/airline", AirlineController.getAllAirlines);
router.post("/send-itinerary", EmailItinerary);
router.get("/gethotels", getHotels);
router.post("/hotelDetail", getHotelById);
router.post("/roomDetail", getRoomById);
router.post("/addCustomRoom", addCustomRoom);
router.post("/flight-order", createFlightOrder);
router.post("/hotel-order", createHotelOrder);

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: message },
        {
          role: "user",
          content: message,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "email_schema",
          schema: {
            type: "object",
            properties: {
              email: {
                description: "The email address that appears in the input",
                type: "string",
              },
            },
            additionalProperties: false,
          },
        },
      },
    });
    console.log(completion.choices[0].message);
    res.json({ reply: completion.choices[0].message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error processing the request" });
  }
});
// Save or update user data by email
router.put("/user-profile", async (req, res) => {
  try {
    const { email, ...updatedData } = req.body; // Get email and updated data from request body
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const user = await User.findOneAndUpdate({ email }, updatedData, {
      new: true,
      upsert: true, // Creates a new document if no match is found
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/user-profile", async (req, res) => {
  try {
    const { email } = req.body; // Get email from request body
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// MongoDB Models

// Orders API
router.post("/orders", async (req, res) => {
  const { email } = req.body;
  try {
    // Fetch Hotel Orders
    const hotelOrders = await HotelOrder.find({ email });
    console.log(hotelOrders, "hotelorders");
    const hotelData = await Promise.all(
      hotelOrders.map(async (order) => {
        console.log(order, "---->");
        const hotel = await HotelModel.findOne({ hotel_id: order.hotelId }); // Use findOne
        console.log(hotel, "hotel");
        if (hotel) {
          return {
            hotelName: hotel.hotel_name,
            hotelLocated: hotel.located,
          };
        } else {
          console.error("Hotel not found for ID:", order.hotelId);
          return null; // Handle cases where no hotel is found
        }
      })
    );
    
    console.log(hotelData,"hotelData")
    const flightOrders = await FlightOrder.find({ email });
    const flightData = await Promise.all(
      flightOrders.map(async (order) => {
        const flight = await FlightModel.findOne({ flight_id: order.flightId }); // Use findOne
        if (flight) {
          // Fetch Departure Airport City
          const departureAirport = await AirportModel.findOne({
            airport_code: flight.departure_airport_code,
          });
          const departureCity = departureAirport ? departureAirport.city : null;
    
          // Fetch Arrival Airport City
          const arrivalAirport = await AirportModel.findOne({
            airport_code: flight.destination_airport_code,
          });
          const arrivalCity = arrivalAirport ? arrivalAirport.city : null;
    
          return {
            departureAirportCode: flight.departure_airport_code,
            destinationAirportCode: flight.destination_airport_code,
            departureTime: new Date(flight.departure_time).toLocaleString(),
            arrivalTime: new Date(flight.destination_time).toLocaleString(),
            departureCity, // Attach Departure City Name
            arrivalCity,   // Attach Arrival City Name
          };
        } else {
          console.error("No Flight Found for ID:", order.flightId);
          return null; // Handle cases where flight is not found
        }
      })
    );
    
    // Filter out null values in case any flight is not found
    const filteredFlightData = flightData.filter((data) => data !== null);
    
    

    // Combine Results
    const orders = {
      hotels: hotelData,
      flights: filteredFlightData,
    };
    res.send(orders);
    // res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// API to get answers by question
router.post("/ask", (req, res) => {
  const { query } = req.body;

  try {
    // Find a match for the query
    const faq = faqs.find((faq) =>
      faq.question.toLowerCase().includes(query.toLowerCase())
    );

    if (faq) {
      res.json({ answer: faq.answer });
    } else {
      res.json({ answer: "I'm sorry, I couldn't find an answer to your question." });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

export default router;
