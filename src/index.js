import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";

import { Provider } from "react-redux";
import { store } from "./store";
import { fetchUsers } from "./ReduxSlice/Users/usersSlice";

// IMMEDIATELY LOAD WHEN THE APPLICATION LOAD
store.dispatch(fetchUsers());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
