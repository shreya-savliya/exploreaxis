import { Router } from "express";
import FlightController from "../controllers/FlightController.js";

const router = Router();

router.get("/getflights", FlightController.GetAllFlights);
router.get("/getflights/:id", FlightController.GetSingleFlight);

export default router;
