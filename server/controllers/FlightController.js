import FlightModel from "../models/FlightModel.js";
import AirportModel from "../models/AirportModel.js";
import AirlineModel from "../models/AirlineModel.js";

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

      // Fetch airline details
      const airline = await AirlineModel.findOne({
        code: flight.airline_code,
      });
      const airlineName = airline ? airline.name : null;

      // Fetch departure and destination airport details
      const departureAirport = await AirportModel.findOne({
        airport_code: flight.departure_airport_code,
      });
      const destinationAirport = await AirportModel.findOne({
        airport_code: flight.destination_airport_code,
      });
      const rating = (Math.random() * (5 - 3) + 3).toFixed(1); // Rating between 3.0 and 5.0
      const reviewCount = Math.floor(Math.random() * 500) + 1; // Review count between 1 and 500
      const ratingTypes = ["Very Good", "Good", "Average", "Poor"];
      const ratingType =
        ratingTypes[
          rating >= 4.5 ? 0 : rating >= 4 ? 1 : rating >= 3.5 ? 2 : 3
        ];
      const enrichedFlight = {
        ...flight.toObject(),
        airline_name: airlineName,
        price: flight?.travel_classes[0]?.price,
        departureAirport: {
          city: departureAirport ? departureAirport.city : null,
          airport_name: departureAirport ? departureAirport.airport_name : null,
        },
        destinationAirport: {
          city: destinationAirport ? destinationAirport.city : null,
          airport_name: destinationAirport
            ? destinationAirport.airport_name
            : null,
        },
        rating,
        review_count: reviewCount,
        rating_type: ratingType,
      };

      res.status(200).json(enrichedFlight);
    } catch (error) {
      res.status(500).json({ message: "Error fetching flight data", error });
    }
  };
  static SearchFlights = async (req, res) => {
    const {
      departureAirportCode,
      arrivalAirportCode,
      departureDate,
      returnDate,
    } = req.body;

    try {
      // Convert departureDate to a Date object and create a range for the full day
      const startOfDay = new Date(departureDate);
      startOfDay.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date(departureDate);
      endOfDay.setUTCHours(23, 59, 59, 999);

      // Define the base query
      const query = {
        departure_airport_code: departureAirportCode,
        destination_airport_code: arrivalAirportCode,
        // departure_time: { $gte: startOfDay, $lt: endOfDay },
      };

      // If returnDate is provided, add it to the query
      if (returnDate) {
        const startReturnDay = new Date(returnDate);
        startReturnDay.setUTCHours(0, 0, 0, 0);

        const endReturnDay = new Date(returnDate);
        endReturnDay.setUTCHours(23, 59, 59, 999);

        query.destination_time = { $gte: startReturnDay, $lt: endReturnDay };
      }

      // Log the constructed query for debugging
      console.log("Query:", query);
      const flights = await FlightModel.find(query);
      if (flights.length === 0) {
        return res
          .status(404)
          .json({ message: "No flights found for the provided criteria." });
      }
      const enrichedFlights = await Promise.all(
        flights.map(async (flight) => {
          // Fetch airline details
          const airline = await AirlineModel.findOne({
            code: flight.airline_code,
          });
          const airlineName = airline ? airline.name : null;

          // Fetch departure and destination airport details
          const departureAirport = await AirportModel.findOne({
            airport_code: flight.departure_airport_code,
          });
          const destinationAirport = await AirportModel.findOne({
            airport_code: flight.destination_airport_code,
          });
          const rating = (Math.random() * (5 - 3) + 3).toFixed(1); // Rating between 3.0 and 5.0
          const reviewCount = Math.floor(Math.random() * 500) + 1; // Review count between 1 and 500
          const ratingTypes = ["Very Good", "Good", "Average", "Poor"];
          const ratingType =
            ratingTypes[
              rating >= 4.5 ? 0 : rating >= 4 ? 1 : rating >= 3.5 ? 2 : 3
            ];
          return {
            ...flight.toObject(),
            airline_name: airlineName,
            price: flight?.travel_classes[0]?.price,
            departureAirport: {
              city: departureAirport ? departureAirport.city : null,
              airport_name: departureAirport
                ? departureAirport.airport_name
                : null,
            },
            destinationAirport: {
              city: destinationAirport ? destinationAirport.city : null,
              airport_name: destinationAirport
                ? destinationAirport.airport_name
                : null,
            },
            rating,
            review_count: reviewCount,
            rating_type: ratingType,
          };
        })
      );
      console.log(enrichedFlights, "enrichedFlights");
      res.status(200).json(enrichedFlights);
    } catch (error) {
      res.status(500).json({ message: "Error searching flights", error });
    }
  };
}

export default FlightController;
