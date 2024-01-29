import React from "react";
import Tabs from "./Tabs";
import DashboardHeading from "../dashboardLayout/DashboardHeading";

const MyCourses: React.FC = () => {
  return (
    <div className="">
      <DashboardHeading title="My Courses" description="Access and manage all your created courses in one place." />
      <Tabs />
    </div>
  );
};

export default MyCourses;
