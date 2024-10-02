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

  static SearchFlights = async (req, res) => {
    const {
      departure_airport_code,
      arrival_airport_code,
      flight_trip_type,
      departure_date,
      arrival_date,
    } = req.body;

    const query = {
      "segments.departure_airport_code": departure_airport_code,
      "segments.arrival_airport_code": arrival_airport_code,
      flight_trip_type: flight_trip_type,
    };

    if (departure_date) {
      query["segments.departure_time"] = { $gte: new Date(departure_date) };
    }

    if (arrival_date) {
      query["segments.arrival_time"] = { $lte: new Date(arrival_date) };
    }

    try {
      const flights = await FlightModel.find(query);
      if (flights.length === 0) {
        return res
          .status(404)
          .json({ message: "No flights found for the provided criteria." });
      }
      res.status(200).json(flights);
    } catch (error) {
      res.status(500).json({ message: "Error searching flights", error });
    }
  };
}

export default FlightController;
