import "./styles/App.css";

//Counter
// import Counter from "./Components/Counter/counter";

//Posts//postsList
import PostsList from "./Components/Posts/postsList";
import AddPost from "./Components/Posts/addPost";

import { Routes, Route } from "react-router-dom";
import Layout from "./Components/layout/layout";
import SinglePostPage from "./Components/Posts/singlePostPage";
import EditPostForm from "./Components/Posts/editPostForm";
import DeletePost from "./Components/Posts/deletePostPage";

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
        <Route path="delete/:postId" element={<DeletePost />} />
      </Route>
    </Routes>
  );
}

export default App;
