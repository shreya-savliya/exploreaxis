const HotelOrder = mongoose.model(
    "HotelOrder",
    new mongoose.Schema({
      email: String,
      hotelId: String,
      roomId: String,
      createdAt: Date,
    })
  );
  const FlightOrder = mongoose.model(
    "FlightOrder",
    new mongoose.Schema({
      email: String,
      flightId: String,
      createdAt: Date,
    })
  );
  const Hotel = mongoose.model(
    "Hotel",
    new mongoose.Schema({
      _id: String,
      hotel_name: String,
      located: String,
    })
  );
  const Flight = mongoose.model(
    "Flight",
    new mongoose.Schema({
      _id: String,
      departure_airport_code: String,
      destination_airport_code: String,
      departure_time: Date,
      destination_time: Date,
    })
  );
  