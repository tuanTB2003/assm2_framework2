import React from "react";
import { Outlet } from "react-router-dom";
import "../../assets/css/dashboard.css";
import Header from "../../conponent/Header";
import Footer from "../../conponent/Footer";

type Props = {};

const WebsiteLayout = (props: Props) => {
  return (
    <div className="">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
