import React from "react";

import { ICourses } from "@/utils/type.dt";
import CourseCard from "./CourseCard2";

interface ComponentProps {
  data: ICourses;
}

const CourseLayer: React.FC<ComponentProps> = ({ data }) => {
  return (
    <div className="mt-10">
      {data.courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default CourseLayer;
