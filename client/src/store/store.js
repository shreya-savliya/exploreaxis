import { configureStore } from "@reduxjs/toolkit";
import flightDetailsReducer from "../services/FlightDetails";

export const store = configureStore({
  reducer: {
    searchFlights: flightDetailsReducer,
  },
});
