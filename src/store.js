import { configureStore } from "@reduxjs/toolkit";

//counterSlice
import CounterSlice from "./ReduxSlice/Counter/counterSlice";

//postSlice
import PostSlice from "./ReduxSlice/Posts/postSlice";

//UsersSlice
import usersSlice from "./ReduxSlice/Users/usersSlice";

//todos
import todosSlice from "./ReduxSlice/Todos/todosSlice";

export const store = configureStore({
  reducer: {
    todos: todosSlice,
    count: CounterSlice,
    posts: PostSlice,
    users: usersSlice,
  },
});
