import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    { id: 1, name: "Samson" },
    { id: 2, name: "Sager" },
    { id: 3, name: "Manish" },
  ],
};

const UsersSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    //actions
  },
});

//
export const selectAllUsers = (state) => state.users;

//export actions of users

//
export default UsersSlice.reducer;
