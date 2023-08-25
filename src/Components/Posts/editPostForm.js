import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, updatePost } from "../../ReduxSlice/Posts/postSlice";
import { useParams, useNavigate } from "react-router-dom";

import { selectAllUsers } from "../../ReduxSlice/Users/usersSlice";

const EditPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { postId } = useParams(); //get first postId from useParams then

  console.log("editPost Id is: ", postId);

  const post = useSelector((state) => selectPostById(state, Number(postId))); //get the post

  console.log("Edit to me: ", post);

  const { users } = useSelector(selectAllUsers);

  console.log("=======================================", users);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);

  const [requestState, setRequestState] = useState("idle");

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && requestState === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestState("pending");
        dispatch(
          updatePost({
            id: post.id,
            title,
            body: content,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/`);
      } catch (err) {
        console.log(`Failed to save the post`, err);
      } finally {
        setRequestState("idle");
      }
    }
  };

  if (!post) {
    return <div>Edit Post Not Found!</div>;
  }

  const selectUserOptions = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });

  return (
    <section>
      <h2>Edit Post</h2>
      <form action="" method="post" onSubmit={onSavePostClicked}>
        <label htmlFor="title">Title:</label>
        <input type="text" value={title} onChange={onTitleChanged} />

        <label htmlFor="title">body:</label>
        <textarea type="text" value={content} onChange={onContentChanged} />

        <select name="" id="" onChange={onAuthorChanged}>
          <option value="">Select User</option>
          {selectUserOptions}
        </select>

        <button type="submit" disabled={!canSave}>
          Add Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
