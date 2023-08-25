import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header/header.js";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="App">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
