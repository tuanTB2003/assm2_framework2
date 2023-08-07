import React from "react";
// import Sidebar from "../../conponent/Admin/Sidebar";
import { Outlet } from "react-router-dom";
import "../../assets/css/dashboard.css";
import LayoutAdmin from "../../conponent/Admin/layout/Layout";

type Props = {};

const AdminLayout = (props: Props) => {
  return (
    <div>
      <LayoutAdmin/>
      {/* <Outlet /> */}
    </div>
  );
};

export default AdminLayout;
