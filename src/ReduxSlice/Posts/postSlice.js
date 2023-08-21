import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: 1,
      title: "Learn HTML",
      content: "Learn HTML...",
    },
    {
      id: 2,
      title: "Learn CSS",
      content: "Learn CSS...",
    },
    {
      id: 3,
      title: "Learn JS",
      content: "Learn js...",
    },
  ],
};

//
const PostSlice = createSlice({
  name: "Post",
  initialState,
  reducers: {},
});

export const selectAllPost = (state) => state.posts;

export default PostSlice.reducer;
