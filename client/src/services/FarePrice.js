import { createSlice } from "@reduxjs/toolkit";

const farePriceSlice = createSlice({
  name: "fare",
  initialState: {
    selectedFarePrice: 0,
    numberOfAdults: 1,
  },
  reducers: {
    setSelectedFarePrice: (state, action) => {
      state.selectedFarePrice = action.payload;
    },
    setNumberOfAdults: (state, action) => {
      state.numberOfAdults = action.payload;
    },
  },
});

export const { setSelectedFarePrice, setNumberOfAdults} = farePriceSlice.actions;
export default farePriceSlice.reducer;
