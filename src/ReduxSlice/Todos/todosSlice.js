import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

//proudct link
const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

//date fetching by thunk (get)
export const fetchtodos = createAsyncThunk("todo/fetching", async () => {
  try {
    const res = await axios.get(TODOS_URL);
    return res.data;
  } catch (error) {
    return error.message;
  }
});

//createEntityAdapter provies ids: [] and entities: {} inside initialState bcz of todosAdapter.upsertMany(state, action.payload);
const todosAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.title.localeCompare(b.title), //configuration options provided by createEntityAdapter which changes the ids:[] by title
});

const initialState = todosAdapter.getInitialState({
  // todos: [],
  status: "idle", // "loading" || "succeeded" || "Failed"
  error: null,
}); //state

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    //reducerActions
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchtodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchtodos.fulfilled, (state, action) => {
        // state.todos = action.payload;
        // state.entities = action.payload;
        todosAdapter.upsertMany(state, action.payload); // here we used method provided by createEntityAdapter
        state.status = "succeeded";
      })
      .addCase(fetchtodos.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "Failed";
      });
  },
});

// export const selectsAllTodos = (state) => state.todos;  //it does not work after createEntityAdapter in created
export const selectStatus = (state) => state.todos.status;
export const selectError = (state) => state.todos.error;

//after using createEntityAdapter for initialState as todosAdapter
//We can use the below selector provided by createEntityAdapter

export const {
  selectAll: selectAllTodos, //select all todo
  selectById: selectTodoById, //select each todo by id
  selectIds: selectTodosIds, //array of todo id
  selectTotal: selectTotalTodos, // total todo
} = todosAdapter.getSelectors((state) => state.todos);

//createSelector

export const selectToDosByUserId = createSelector(
  [selectAllTodos, (_, userId) => userId],
  (todos, userId) => todos.filter((todo) => todo.userId === userId)
);

export default todosSlice.reducer;
