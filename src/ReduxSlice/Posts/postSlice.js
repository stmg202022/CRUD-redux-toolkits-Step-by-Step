import { createSlice, nanoid } from "@reduxjs/toolkit";

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
  reducers: {
    addPost: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },

      prepare({ title, content }) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
  },
});

export const selectAllPost = (state) => state.posts;

export const { addPost } = PostSlice.actions;

export default PostSlice.reducer;
