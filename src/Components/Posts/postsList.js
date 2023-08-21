import React from "react";
import { useSelector } from "react-redux";
import { selectAllPost } from "../../ReduxSlice/Posts/postSlice";

const PostsList = () => {
  //   const { posts } = useSelector((state) => state.posts);
  const { posts } = useSelector(selectAllPost);

  console.log(posts);

  //always write like this if u want to show lists
  // next time it can be shown in the postcart
  const renderPosts = posts.map((post) => {
    return (
      <article key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.content.substring(0, 100)}</p>
      </article>
    );
  });

  return (
    <div>
      <h1>Posts Lists</h1>
      {renderPosts}
    </div>
  );
};

export default PostsList;
