import React from "react";
import Tabs from "./Tabs";
import DashboardHeading from "../dashboardLayout/DashboardHeading";
import { IUserSubscriptions } from "@/utils/type.dt";

interface Props {
  academiesSubObj: IUserSubscriptions;
  coursesSubObj: IUserSubscriptions;
}

const MyCourses: React.FC<Props> = ({ academiesSubObj, coursesSubObj }) => {
  return (
    <div className="">
      <DashboardHeading
        title="My Courses"
        description="Access and manage all your created courses in one place."
      />
      <Tabs academiesSubObj={academiesSubObj} coursesSubObj={coursesSubObj} />
    </div>
  );
};

export default MyCourses;
