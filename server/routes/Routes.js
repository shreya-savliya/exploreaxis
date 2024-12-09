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

const router = Router();
const openai = new OpenAI();

router.get("/getflights", FlightController.GetAllFlights);
router.get("/getflights/:id", FlightController.GetSingleFlight);
router.post("/searchflights", FlightController.SearchFlights);
router.get("/airport", AirportController.getAllAirport);
router.get("/airports/:airportCode", AirportController.getAirportByCode);
router.get("/airline",AirlineController.getAllAirlines);
router.post('/send-itinerary',EmailItinerary);
router.get("/gethotels", getHotels);
router.post("/hotelDetail", getHotelById);
router.post("/roomDetail", getRoomById);
router.post("/addCustomRoom", addCustomRoom);
router.post("/flight-order", createFlightOrder);
router.post("/hotel-order", createHotelOrder);

router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/chat', async (req, res) => {
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
                          type: "string"
                      }
                  },
                  additionalProperties: false
              }
          }
      }
    });
    console.log(completion.choices[0].message);
    res.json({ reply: completion.choices[0].message });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error processing the request" });
  }
});

export default router;
