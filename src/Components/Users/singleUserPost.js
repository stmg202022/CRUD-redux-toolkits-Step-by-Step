import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectUserById } from "../../ReduxSlice/Users/usersSlice";
import { selectAllPost } from "../../ReduxSlice/Posts/postSlice";

const SingleUserPost = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));
  console.log("user is:", user);

  //get all posts match with the post.userId and userId
  const postsForUser = useSelector((state) => {
    const allPosts = selectAllPost(state);

    return allPosts.filter((post) => post.userId === Number(userId));
  });

  const postTitle = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <div>
        <h1>Post Title of {user.name}</h1>
        <ul>{postTitle}</ul>
      </div>
    </section>
  );
};

export default SingleUserPost;
