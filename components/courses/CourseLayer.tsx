"use client";
import React, { useEffect, useState } from "react";

import { ICourses, IWishlist, RootState } from "@/utils/type.dt";
import CourseCard from "./CourseCard2";
import { useSelector } from "react-redux";
import { fetchWishlists } from "@/services/backend.services";

interface ComponentProps {
  data: ICourses;
}

const CourseLayer: React.FC<ComponentProps> = ({ data }) => {
  const [rating, setRating] = React.useState<string[]>([]);
  const [savedCourses, setSavedCourses] = useState<IWishlist[]>([]);
  useEffect(() => {
    const newRating = Array(5).fill("star");
    setRating(newRating);
  }, [data]);

  const { userData } = useSelector((states: RootState) => states.userStates);

  useEffect(() => {
    if (!userData) return;

    const fetchSavedCourses = async () => {
      const token = sessionStorage.getItem("accessToken") as string;

      try {
        const courses = await fetchWishlists({ productType: "Course" }, token);

        if (courses) {
          setSavedCourses(courses);
        }
      } catch (e: any) {
        console.log(e.message);
      }
    };
    fetchSavedCourses();
  }, [userData]);

  return (
    <div className="mt-10">
      {data.courses.map((course) => (
        <CourseCard
          key={course._id}
          course={course}
          bookMarkedCourses={savedCourses}
        />
      ))}
    </div>
  );
};

export default CourseLayer;
