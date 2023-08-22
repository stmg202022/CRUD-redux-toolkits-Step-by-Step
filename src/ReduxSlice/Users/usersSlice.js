import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

// const initialState = {
//   users: [
//     { id: 1, name: "Samson" },
//     { id: 2, name: "Sager" },
//     { id: 3, name: "Manish" },
//   ],
// };

export const fetchUsers = createAsyncThunk("Users/fetchUsers", async () => {
  try {
    const res = await axios(USERS_URL);

    return [...res.data];
    //
  } catch (error) {
    return error.message;
  }
});

const initialState = {
  users: [],
};

const UsersSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    //actions
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = [...action.payload];
    });
  },
});

//
export const selectAllUsers = (state) => state.users;

//export actions of users

//
export default UsersSlice.reducer;
