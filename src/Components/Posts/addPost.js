import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { nanoid } from "@reduxjs/toolkit";
import { addPost } from "../../ReduxSlice/Posts/postSlice";

//users
import { selectAllUsers } from "../../ReduxSlice/Users/usersSlice";

const AddPost = () => {
  const dispatch = useDispatch();

  //Users
  const { users } = useSelector(selectAllUsers);
  console.log(users);
  const [userId, setUserId] = useState("");

  //form
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //before submit
  const canSave = userId && title && content;

  const submitPost = (e) => {
    e.preventDefault();

    // if (title && content && userId) {
    //
    // const post = {
    //   id: nanoid(),
    //   title,
    //   content,
    // };

    dispatch(addPost({ title, content, userId }));

    setTitle("");
    setContent("");
    setUserId("");
    // }
  };

  //userlist
  const selectUserOptions = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });

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

        <select name="" id="" onChange={(e) => setUserId(e.target.value)}>
          <option value="">Select User</option>
          {selectUserOptions}
        </select>

        <button type="submit" disabled={!canSave}>
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
