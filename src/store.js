import { configureStore } from "@reduxjs/toolkit";

//counterSlice
import CounterSlice from "./ReduxSlice/Counter/counterSlice";

//postSlice
import PostSlice from "./ReduxSlice/Posts/postSlice";

//UsersSlice
import usersSlice from "./ReduxSlice/Users/usersSlice";

export const store = configureStore({
  reducer: {
    count: CounterSlice,
    posts: PostSlice,
    users: usersSlice,
  },
});
