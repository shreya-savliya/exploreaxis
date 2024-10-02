import FlightModel from "../models/FlightModel.js";

class FlightController {
  static GetAllFlights = async (req, res) => {
    try {
      const flights = await FlightModel.find();
      res.status(200).json(flights);
    } catch (error) {
      res.status(500).json({ message: "Error fetching flight data", error });
    }
  };

  static GetSingleFlight = async (req, res) => {
    const flightId = req.params.id;

    try {
      const flight = await FlightModel.findOne({ flight_id: flightId });
      if (!flight) {
        return res.status(404).json({ message: "Flight not found" });
      }

      res.status(200).json(flight);
    } catch (error) {
      res.status(500).json({ message: "Error fetching flight data", error });
    }
  };
}

export default FlightController;
