import React from "react";

import { ICourses } from "@/utils/type.dt";
import CourseCard from "./CourseCard2";

interface ComponentProps {
  data: ICourses;
}

const CourseLayer: React.FC<ComponentProps> = ({ data }) => {
  return (
    <div className="mt-5 flex flex-col sm:flex-row sm:flex-wrap sm:justify-between md:justify-start md:flex-nowrap md:flex-col">
      {data.courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default CourseLayer;
