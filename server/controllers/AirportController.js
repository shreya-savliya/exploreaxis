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

  static getAirportByCode = async (req, res) => {
    const { airportCode } = req.params;

    try {
      const airport = await Airport.findOne({
        airport_code: airportCode,
      }).select("airport_code airport_name city destination_id");
      if (!airport) {
        return res.status(404).json({ message: "Airport not found" });
      }
      res.json(airport);
    } catch (error) {
      res.status(500).json({ message: "Error fetching airport data", error });
    }
  };
}

export default AirportController;
