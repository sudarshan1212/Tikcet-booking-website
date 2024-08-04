import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  businessUser: null,
  theaterDetails: null,
  checkout: null,
};
export const bookingSlice = createSlice({
  name: "Booking",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.user = action.payload;
    },
    businessAddUsers: (state, action) => {
      state.businessUser = action.payload;
    },
    removeUsers: (state) => {
      state.user = null;
    },
    movieDetails: (state, action) => {
      state.theaterDetails = action.payload;
    },
    checkout: (state, action) => {
      state.checkout = action.payload;
    },
  },
});
export const {
  addUsers,
  removeUsers,
  movieDetails,
  checkout,
  businessAddUsers,
 } = bookingSlice.actions;
export default bookingSlice.reducer;
