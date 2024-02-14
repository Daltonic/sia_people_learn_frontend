import React from "react";
import Tabs from "./Tabs";
import DashboardHeading from "../dashboardLayout/DashboardHeading";
import { IAcademies, ICourses } from "@/utils/type.dt";

interface Props {
  academiesObj: IAcademies;
  coursesObj: ICourses;
  booksObj: ICourses;
}

const Products: React.FC<Props> = ({ academiesObj, coursesObj, booksObj }) => {
  return (
    <div className="">
      <DashboardHeading
        title="Products"
        description="Access and manage all your products in one place."
      />
      <Tabs
        academiesObj={academiesObj}
        coursesObj={coursesObj}
        booksObj={booksObj}
      />
    </div>
  );
};

export default Products;
