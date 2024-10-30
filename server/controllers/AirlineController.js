import AirlineModel from "../models/AirlineModel.js";

// Function to get all airlines
class AirlineController {
  static getAllAirlines = async (req, res) => {
    try {
      const airlines = await AirlineModel.find();
      res.json(airlines);
    } catch (error) {
      console.error("Error retrieving airlines:", error);
      throw error;
    }
  };
}

export default AirlineController;
