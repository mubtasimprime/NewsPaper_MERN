import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/shared/Navbar";

const RootLayout = () => {
  return (
    <div className="lato">
      <div className="shadow-sm bg-white sticky top-0 z-50">
        <Navbar></Navbar>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default RootLayout;
