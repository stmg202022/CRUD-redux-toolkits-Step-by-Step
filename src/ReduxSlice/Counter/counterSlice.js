import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};
const CounterSlice = createSlice({
  name: "Counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },

    reset: (state) => {
      state.count = 0;
    },

    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },

    decrementByAmount: (state, action) => {
      state.count -= action.payload;
    },
  },
});

export const {
  increment,
  incrementByAmount,
  reset,
  decrement,
  decrementByAmount,
} = CounterSlice.actions;

export default CounterSlice.reducer;
