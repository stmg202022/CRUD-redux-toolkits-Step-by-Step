import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  // selectAllTodos,
  selectTotalTodos,
  selectTodosIds,
  fetchtodos,
  selectStatus,
  selectError,
} from "../../ReduxSlice/Todos/todosSlice";

import TodoLists from "./todoLists";

const Todos = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  //selectAll
  // const {todos} = useSelector(selectAllTodos); // before using of the createEntityAdapter
  // const todos = useSelector(selectAllTodos);
  // console.log("todos in page:", todos);

  //selectIds
  const getAllTodosIds = useSelector(selectTodosIds);
  console.log("ToDos all ids:", getAllTodosIds);

  const totalTodos = useSelector(selectTotalTodos);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchtodos());
    }
  }, [dispatch, status]);

  let content;

  console.log(status);

  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "succeeded") {
    // content = orderedPosts.map((post) => {
    //   return <PostsExcerpt key={post.id} post={post} />;
    // });

    content = getAllTodosIds.map((todoId) => (
      <TodoLists key={todoId} todoId={todoId} />
    ));
  } else {
    content = <div>Network Error: {error}</div>;
  }

  return (
    <section>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1>Todos: {totalTodos}</h1>

        {/* <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul> */}
        {/* <TodoLists /> */}
        {content}
      </div>
    </section>
  );
};

export default Todos;
