import React from "react";
import Tabs from "./Tabs";
import DashboardHeading from "../dashboardLayout/DashboardHeading";

const MyProducts: React.FC = () => {
  return (
    <div className="">
      <DashboardHeading title="My Products" description="Access and manage all your products in one place." />
      <Tabs />
    </div>
  );
};

export default MyProducts;
