import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: [],
};

export const FlightDetailsSlice = createSlice({
  name: "FlightDetails",
  initialState,
  reducers: {
    searchFlightDetailsData: (state, action) => {
      console.log(action.payload, "searchFlightDetailsData action method");
      state.flights = action.payload;
    },
  },
});

export const { searchFlightDetailsData } = FlightDetailsSlice.actions;

export default FlightDetailsSlice.reducer;
