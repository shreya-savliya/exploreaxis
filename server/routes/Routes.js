import { Router } from "express";
import FlightController from "../controllers/FlightController.js";
import { getHotels, getHotelById } from "../controllers/HotelController.js";

const router = Router();

router.get("/getflights", FlightController.GetAllFlights);
router.get("/getflights/:id", FlightController.GetSingleFlight);
router.post("/searchflights", FlightController.SearchFlights);

router.get("/gethotels", getHotels);
router.post("/hotelDetail", getHotelById);

export default router;
