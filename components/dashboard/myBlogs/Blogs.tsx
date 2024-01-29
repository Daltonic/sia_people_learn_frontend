"use client";

import { _useContext } from "@/context/Context";
import Tabs from "./Tabs";
import DashboardHeading from "../dashboardLayout/DashboardHeading";

const Blogs: React.FC = () => {
  return (
    <div className="">
     <DashboardHeading title="Blogs" description="Access your blogs, create new blogs, and view all blogs" />
      <Tabs />
    </div>
  );
};

export default Blogs;
