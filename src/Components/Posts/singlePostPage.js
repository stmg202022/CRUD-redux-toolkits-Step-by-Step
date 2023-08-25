import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import PostAuthor from "../Posts/postAuthor";
import TimeAgo from "../Posts/timeAgo";
import ReactionsButtons from "../Posts/reactionsButtons";

// import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import { useSelector } from "react-redux";
import { selectPostById } from "../../ReduxSlice/Posts/postSlice";

import { useParams } from "react-router-dom";

const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useSelector((state) => selectPostById(state, Number(postId)));

  console.log("post is", post);

  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    );
  }

  return (
    <div>
      <Card sx={{ maxWidth: 345, margin: "20px", minWidth: "30%" }}>
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
    </div>
  );
};

export default SinglePostPage;
