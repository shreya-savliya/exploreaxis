import Airport from "../models/AirportModel.js";

class AirportController {
  static getAllAirport = async (req, res) => {
    try {
      const airports = await Airport.find().select(
        "airport_code airport_name city destination_id"
      );
      res.json({ airports });
    } catch (error) {
      res.status(500).json({ message: "Error fetching airport name", error });
    }
  };
}

export default AirportController;
