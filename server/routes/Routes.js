import { Router } from "express";
import FlightController from "../controllers/FlightController.js";
import HotelController from "../controllers/HotelController.js";

const router = Router();

router.get("/getflights", FlightController.GetAllFlights);
router.get("/getflights/:id", FlightController.GetSingleFlight);
router.post("/searchflights", FlightController.SearchFlights);

router.get("/gethotels", HotelController);

export default router;
