import { createSlice } from "@reduxjs/toolkit";

const farePriceSlice = createSlice({
  name: "fare",
  initialState: {
    selectedFarePrice: 0,
    numberOfAdults: 2,
  },
  reducers: {
    setSelectedFarePrice: (state, action) => {
      state.selectedFarePrice = action.payload;
    },
  },
});

export const { setSelectedFarePrice } = farePriceSlice.actions;
export default farePriceSlice.reducer;
