import React from "react";

import { selectAllUsers } from "../../ReduxSlice/Users/usersSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Users = () => {
  const { users } = useSelector(selectAllUsers);

  console.log("All users are: ", users);

  const renderUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={`/user/${user.id}`}>{user.name}</Link>
    </li>
  ));

  if (users.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h1>Users Lists</h1>
      <ul>{renderUsers}</ul>
    </section>
  );
};

export default Users;
