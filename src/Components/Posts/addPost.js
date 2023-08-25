import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { nanoid } from "@reduxjs/toolkit";
// import { addPost } from "../../ReduxSlice/Posts/postSlice";
import { addNewPost } from "../../ReduxSlice/Posts/postSlice";

//users
import { selectAllUsers } from "../../ReduxSlice/Users/usersSlice";

const AddPost = () => {
  const dispatch = useDispatch();

  const [addNewPostReqStatus, setAddNewPostReqStatus] = useState("idle"); //for addNewPost

  //Users
  const { users } = useSelector(selectAllUsers);
  console.log(users);
  const [userId, setUserId] = useState(null);

  //form
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  //before submit
  // const canSave = true;
  // const canSave = Boolean(userId) && Boolean(title) && Boolean(body);
  const canSave =
    [title, body, userId].every(Boolean) && addNewPostReqStatus === "idle";

  const submitPost = (e) => {
    e.preventDefault();

    // if (title && body && userId) {
    //
    // const post = {
    //   id: nanoid(),
    //   title,
    //   body,
    // };

    // const userIdAsNumber = userId ? parseInt(userId) : null;
    // dispatch(addNewPost({ title, body, userId: userIdAsNumber }));

    // setTitle("");
    // setBody("");
    // }

    //this is new one to add post

    if (canSave) {
      try {
        setAddNewPostReqStatus("pending");
        dispatch(addNewPost({ title, body, userId })).unwrap();

        setTitle("");
        setBody("");
        setUserId("");
        //
      } catch (err) {
        console.log("Failed to add new post.", err);
      } finally {
        setAddNewPostReqStatus("idle");
      }
    }
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
      <h1>Add Post / Users</h1>
      <form action="" method="post" onSubmit={submitPost}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="title">body:</label>
        <textarea
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
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
