import React from "react";
import { Link } from "react-router-dom";
import PostList from "../Posts/postsList";
import AddPost from "../Posts/addPost";
import Users from "../Users/usersList";

import { useDispatch, useSelector } from "react-redux";
import { increaseCount, getCount } from "../../ReduxSlice/Posts/postSlice.js";

const Header = () => {
  const dispatch = useDispatch();
  const count = useSelector(getCount);

  return (
    <>
      <div>
        <h1>Redux Toolkit</h1>
        <ul>
          <li>
            <Link to="/" element={<PostList />}>
              Post List
            </Link>
          </li>
          <li>
            <Link to="/post" element={<AddPost />}>
              Add Post
            </Link>
          </li>
          <li>
            <Link to="/user" element={<Users />}>
              Users List
            </Link>
          </li>
        </ul>

        <button onClick={() => dispatch(increaseCount())}>{count}</button>
      </div>
    </>
  );
};

export default Header;
