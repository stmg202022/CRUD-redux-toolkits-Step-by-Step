import "./styles/App.css";

//Counter
// import Counter from "./Components/Counter/counter";

//Posts//postsList
import PostsList from "./Components/Posts/postsList";
import AddPost from "./Components/Posts/addPost";

import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/layout/layout";
import SinglePostPage from "./Components/Posts/singlePostPage";
import EditPostForm from "./Components/Posts/editPostForm";

import UsersList from "./Components/Users/usersList";
import SingleUserPost from "./Components/Users/singleUserPost";
import Todos from "./Components/Todos/todos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<AddPost />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>
        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<SingleUserPost />} />
        </Route>

        {/* Catch all - replace with 404 component if you want */}
        <Route path="*" element={<Navigate to="/" replace />} />

        {/*  */}

        <Route path="/todos">
          <Route index element={<Todos />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
