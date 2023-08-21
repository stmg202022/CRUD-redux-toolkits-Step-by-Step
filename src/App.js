import "./styles/App.css";

//Counter
import Counter from "./Components/Counter/counter";

//Posts//postsList
import PostsList from "./Components/Posts/postsList";
import AddPost from "./Components/Posts/addPost";

function App() {
  return (
    <div className="App">
      <Counter />

      <br />

      <AddPost />
      <PostsList />
    </div>
  );
}

export default App;
