import * as React from "react";

import { useSelector } from "react-redux";
import { selectAllPost } from "../../ReduxSlice/Posts/postSlice";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PostAuthor from "./postAuthor";
import TimeAgo from "./timeAgo.js";

// import Button from "@mui/material/Button";
// import CardActions from "@mui/material/CardActions";

export default function PostList() {
  const { posts } = useSelector(selectAllPost);

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
            {post.content}
          </Typography>

          <PostAuthor userId={post.userId} />

          <TimeAgo time={post.date} />
        </CardContent>
        {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
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
      {renderPostList}
    </div>
  );
}
