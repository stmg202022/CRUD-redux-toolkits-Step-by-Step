import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import PostAuthor from "../postAuthor";
import TimeAgo from "../timeAgo.js";
import ReactionsButtons from "../reactionsButtons";

// import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectPostById } from "../../../ReduxSlice/Posts/postSlice";

const PostsExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId));
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
          <Link to={`post/${post.id}`}>View Post</Link>

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

export default PostsExcerpt;
