import React, { useState } from "react";
import { useDispatch } from "react-redux";

// import { nanoid } from "@reduxjs/toolkit";
import { addPost } from "../../ReduxSlice/Posts/postSlice";

const AddPost = () => {
  const dispatch = useDispatch();

  //form
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitPost = (e) => {
    e.preventDefault();

    if (title && content) {
      //
      // const post = {
      //   id: nanoid(),
      //   title,
      //   content,
      // };

      dispatch(addPost({ title, content }));

      setTitle("");
      setContent("");
    }
  };

  return (
    <div>
      <h1>Add Post</h1>
      <form action="" method="post" onSubmit={submitPost}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="title">Content:</label>
        <textarea
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;
