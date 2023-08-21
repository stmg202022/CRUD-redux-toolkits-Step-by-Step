import "./styles/App.css";

//Counter
import Counter from "./Components/Counter/counter";

//Posts//postsList
import PostsList from "./Components/Posts/postsList";

function App() {
  return (
    <div className="App">
      <Counter />
      <PostsList />
    </div>
  );
}

export default App;
