import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectUserById } from "../../ReduxSlice/Users/usersSlice";
import {
  // selectAllPost,
  selectPostsByUserId,
} from "../../ReduxSlice/Posts/postSlice";
// import { selectAllTodos } from "../../ReduxSlice/Todos/todosSlice";
import { selectToDosByUserId } from "../../ReduxSlice/Todos/todosSlice";
import TodoLists from "../Todos/todoLists";

const SingleUserPost = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));
  console.log("user is:", user);

  //get all todos match with the todo.userId and userId

  // const todosForUser = useSelector((state) => {
  //   const allTodos = selectAllTodos(state);
  //   return allTodos.filter((todo) => todo.userId === Number(userId));
  // });

  const todosForUser = useSelector(
    (state) => selectToDosByUserId(state, Number(userId)) // By using createSelectoer
  );

  const todoTitle = todosForUser.map((todo) => (
    <TodoLists key={todo.id} todoId={todo.id} />
  ));

  // const allTodos = useSelector(selectAllTodos);

  //get all posts match with the post.userId and userId
  // const postsForUser = useSelector((state) => {
  //   const allPosts = selectAllPost(state);

  //   return allPosts.filter((post) => post.userId === Number(userId));
  // });

  const postsForUser = useSelector((state) =>
    selectPostsByUserId(state, Number(userId))
  );

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
        <h1>ToDos of {user.name}</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {todoTitle}
        </div>
      </div>
    </section>
  );
};

export default SingleUserPost;
