import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flights: [],
  filteredFlights: [],
};

export const FlightDetailsSlice = createSlice({
  name: "FlightDetails",
  initialState,
  reducers: {
    searchFlightDetailsData: (state, action) => {
      console.log(action.payload, "searchFlightDetailsData action method");
      state.flights = action.payload;
    },
    updateFilteredFlights(state, action) {
      state.filteredFlights = action.payload;
    },
  },
});

export const { searchFlightDetailsData, updateFilteredFlights } =
  FlightDetailsSlice.actions;

export default FlightDetailsSlice.reducer;
