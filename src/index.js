import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";

//for react router dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store";
import { fetchUsers } from "./ReduxSlice/Users/usersSlice";
import { fetchPosts } from "./ReduxSlice/Posts/postSlice";
import { fetchtodos } from "./ReduxSlice/Todos/todosSlice";

// IMMEDIATELY LOAD WHEN THE APPLICATION LOAD
store.dispatch(fetchUsers());
store.dispatch(fetchPosts());
store.dispatch(fetchtodos());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </Provider>
);
