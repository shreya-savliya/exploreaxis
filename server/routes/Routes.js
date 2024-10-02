import { Router } from "express";
import HotelController from "../controllers/HotelController.js";

const router = Router();

router.get("/gethotels", HotelController);

export default router;
