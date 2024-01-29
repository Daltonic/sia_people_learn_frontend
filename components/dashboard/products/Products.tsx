import React from "react";
import Tabs from "./Tabs";
import DashboardHeading from "../dashboardLayout/DashboardHeading";

const Products: React.FC = () => {
  return (
    <div className="">
      <DashboardHeading title="Products" description="Access and manage all your products in one place." />
      <Tabs />
    </div>
  );
};

export default Products;
