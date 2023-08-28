import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  selectPostIds,
  // selectAllPost,
  stateError,
  stateStatus,
} from "../../ReduxSlice/Posts/postSlice";

import PostsExcerpt from "./PostsExcerpt/postsExcerpt";

//for Thunk
import { fetchPosts } from "../../ReduxSlice/Posts/postSlice"; // it is functions created by createAsyncthunk

export default function PostList() {
  // const posts = useSelector(selectAllPost);
  const orderedPostIds = useSelector(selectPostIds); //getAllPostsIds

  const status = useSelector(stateStatus);
  const error = useSelector(stateError);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  // const orderedPosts = posts
  //   .slice()
  //   .sort((a, b) => b.date.localeCompare(a.date));

  // const renderPostList = orderedPosts.map((post) => {
  // return <PostsExcerpt key={post.id} post={post} />;
  // });

  let content;

  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "succeeded") {
    // content = orderedPosts.map((post) => {
    //   return <PostsExcerpt key={post.id} post={post} />;
    // });

    content = orderedPostIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else {
    content = <div>Network Error: {error}</div>;
  }

  //
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>Post List</h1>

      {/* {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "succeeded" ? (
        <div>{renderPostList}</div>
      ) : (
        <div>{error}</div>
      )} */}

      <div>{content}</div>
    </div>
  );
}
