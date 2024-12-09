import { configureStore } from "@reduxjs/toolkit";
import flightDetailsReducer from "../services/FlightDetails";
import farePriceReducer from "../services/FarePrice";
import userReducer from "../services/UserSlice";

export const store = configureStore({
  reducer: {
    searchFlights: flightDetailsReducer,
    fare: farePriceReducer,
    user: userReducer,
  },
});
