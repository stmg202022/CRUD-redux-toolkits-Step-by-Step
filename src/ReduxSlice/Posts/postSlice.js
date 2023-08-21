import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = {
  posts: [
    {
      id: 1,
      title: "Learn HTML",
      content: "Learn HTML...",
      date: sub(new Date(), { minutes: 10 }).toISOString(),
    },
    {
      id: 2,
      title: "Learn CSS",
      content: "Learn CSS...",
      date: sub(new Date(), { minutes: 5 }).toISOString(),
    },
    {
      id: 3,
      title: "Learn JS",
      content: "Learn js...",
      date: sub(new Date(), { minutes: 2 }).toISOString(),
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

      prepare({ title, content, userId }) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
          },
        };
      },
    },
  },
});

export const selectAllPost = (state) => state.posts;

export const { addPost } = PostSlice.actions;

export default PostSlice.reducer;
