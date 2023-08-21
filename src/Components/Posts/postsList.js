import * as React from "react";

import { useSelector } from "react-redux";
import { selectAllPost } from "../../ReduxSlice/Posts/postSlice";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PostAuthor from "./postAuthor";

// import Button from "@mui/material/Button";
// import CardActions from "@mui/material/CardActions";

//postAuthor

export default function PostList() {
  const { posts } = useSelector(selectAllPost);

  const renderPostList = posts.map((post) => {
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
