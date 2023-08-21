import { configureStore } from "@reduxjs/toolkit";

//counterSlice
import CounterSlice from "./ReduxSlice/Counter/counterSlice";

export const store = configureStore({
  reducer: {
    count: CounterSlice,
  },
});
