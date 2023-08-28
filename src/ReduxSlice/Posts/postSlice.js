import {
  createSlice,
  // nanoid,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POST_URL = "https://jsonplaceholder.typicode.com/posts";

// const initialState = {
//   posts: [
//     {
//       id: 1,
//       title: "Learn HTML",
//       content: "Learn HTML...",
//       date: sub(new Date(), { minutes: 10 }).toISOString(),
//       reactions: {
//         thumb: 0,
//         wow: 0,
//         heart: 0,
//       },
//       isReact: false,
//     },
//     {
//       id: 2,
//       title: "Learn CSS",
//       content: "Learn CSS...",
//       date: sub(new Date(), { minutes: 5 }).toISOString(),
//       reactions: {
//         thumb: 0,
//         wow: 0,
//         heart: 0,
//       },
//       isReact: false,
//     },
//     {
//       id: 3,
//       title: "Learn JS",
//       content: "Learn js...",
//       date: sub(new Date(), { minutes: 2 }).toISOString(),
//       reactions: {
//         thumb: 0,
//         wow: 0,
//         heart: 0,
//       },
//       isReact: false,
//     },
//   ],
// };
//

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
  status: "idle", //"idle" | "loading" | "succeeded" | "failed"
  error: null,
  count: 0,
});

//Thunk //get data
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    //
    const res = await axios.get(POST_URL);
    return res.data;
    //
  } catch (error) {
    //
    return error.message;
    //
  }
});

//add post thunk //  post data
export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    try {
      const res = await axios.post(POST_URL, initialPost);
      console.log(res.data);
      return res.data; // payload = {}
    } catch (error) {
      return error.message;
    }
  }
);

//update post think // put data
export const updatePost = createAsyncThunk(
  "post/update",
  async (updatePostData) => {
    const { id } = updatePostData;
    try {
      const res = await axios.put(`${POST_URL}/${id}`, updatePostData);
      return res.data;
    } catch (err) {
      // return err.message;
      return updatePostData; //only for testing redux!
    }
  }
);

//delete post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.delete(`${POST_URL}/${id}`);

      if (response?.status === 200) return initialPost; // return { id: post.id}

      return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

const PostSlice = createSlice({
  name: "Post",
  initialState,
  reducers: {
    // addPost: {
    //   reducer(state, action) {
    //     state.posts.push(action.payload);
    //   },

    //   prepare({ title, body, userId }) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         title,
    //         body,
    //         userId,
    //         date: new Date().toISOString(),
    //         reactions: {
    //           thumb: 0,
    //           wow: 0,
    //           heart: 0,
    //         },
    //         isReact: false,
    //       },
    //     };
    //   },
    // },

    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload;

      console.log(action.payload);

      // const existingPost = state.posts.find((post) => post.id === postId);
      const existingPost = state.entities[postId];

      if (existingPost && !existingPost.isReact) {
        existingPost.reactions[reaction]++;
        existingPost.isReact = true;
      }

      // if (exitingPost) {
      //   exitingPost.reactions[reaction]++;
      // }
    },
    //

    //increase count to check optimizations
    increaseCount: (state) => {
      state.count += 1;
    },
  },

  //it is maybe like a switch case which is create for createAsyncThunk
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";

        //posts comes from action.payload
        let min = 1;

        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumb: 0,
            wow: 0,
            heart: 0,
          };
          post.isReact = false;

          return post;
        });

        // state.posts = [...loadedPosts];
        // state.posts = state.posts.concat(loadedPosts);

        postsAdapter.upsertMany(state, loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        // state.error = action.error.message;
        state.error = action.payload;
        state.status = "failed";
      })

      //add new post
      .addCase(addNewPost.fulfilled, (state, action) => {
        //payload = {}
        //add data that action.payload do not have
        action.payload.userId = Number(action.payload.userId); //userId come in string
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumb: 0,
          wow: 0,
          heart: 0,
        };
        action.payload.isReact = false;

        console.log(action.payload);

        // state.posts.push(action.payload); //[].push({})

        postsAdapter.addOne(state, action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete.");
          console.log(action.payload);
          return;
        }

        // const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        // const posts = state.posts.filter((post) => post.id !== id); //first delete the older post then
        // state.posts = [...posts, action.payload]; //add new post from action.payload

        postsAdapter.upsertOne(state, action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete.");
          console.log(action.payload);
        }

        const { id } = action.payload;
        // const posts = state.posts.filter((post) => post.id !== id);
        // state.posts = posts;

        postsAdapter.removeOne(state, id);

        console.log("Delete post success.");
      });
  },
});

//getSelectors creates these selectors and we rename them with aliases using destructuring

export const {
  selectAll: selectAllPost,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts);

//state export
// export const selectAllPost = (state) => state.posts.posts;
export const stateStatus = (state) => state.posts.status;
export const stateError = (state) => state.posts.error;
export const getCount = (state) => state.posts.count;

// export by post id:
// export const selectPostById = (state, postId) => {
// return state.posts.posts.find((post) => post.id === postId);
// };

//actions export
export const { addPost, reactionAdded, increaseCount } = PostSlice.actions;

//createSelector
export const selectPostsByUserId = createSelector(
  [selectAllPost, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
);

//slice export
export default PostSlice.reducer;
