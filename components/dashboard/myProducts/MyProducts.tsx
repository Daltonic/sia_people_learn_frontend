import React from "react";
import Tabs from "./Tabs";
import DashboardHeading from "../dashboardLayout/DashboardHeading";
import { IAcademies, ICourses } from "@/utils/type.dt";

interface Props {
  academiesData: IAcademies;
  coursesData: ICourses;
  booksData: ICourses;
}

const MyProducts: React.FC<Props> = ({
  academiesData,
  coursesData,
  booksData,
}) => {
  return (
    <div className="">
      <DashboardHeading
        title="My Products"
        description="Access and manage all your products in one place."
      />
      <Tabs
        academiesData={academiesData}
        coursesData={coursesData}
        booksData={booksData}
      />
    </div>
  );
};

export default MyProducts;
