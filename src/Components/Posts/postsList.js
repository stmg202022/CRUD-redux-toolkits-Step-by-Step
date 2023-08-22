import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  selectAllPost,
  stateError,
  stateStatus,
} from "../../ReduxSlice/Posts/postSlice";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PostAuthor from "./postAuthor";
import TimeAgo from "./timeAgo.js";

import ReactionsButtons from "./reactionsButtons";

// import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";

//for Thunk
import { fetchPosts } from "../../ReduxSlice/Posts/postSlice"; // it is functions created by createAsyncthunk

export default function PostList() {
  const posts = useSelector(selectAllPost);
  const status = useSelector(stateStatus);
  const error = useSelector(stateError);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderPostList = orderedPosts.map((post) => {
    return (
      <Card
        key={post.id}
        sx={{ maxWidth: 345, margin: "20px", minWidth: "30%" }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.body}
          </Typography>

          <PostAuthor userId={post.userId} />

          <TimeAgo time={post.date} />
        </CardContent>
        <CardActions>
          <ReactionsButtons post={post} />
        </CardActions>
      </Card>
    );
  });

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

      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "succeeded" ? (
        <div>{renderPostList}</div>
      ) : (
        <div>{error}</div>
      )}
    </div>
  );
}
