"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaBookmark } from "react-icons/fa";
import Link from "next/link";
import { ICourses, RootState } from "@/utils/type.dt";
import { IoIosStar } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/store/cartSlice";
import CourseCard from "./CourseCard2";

interface ComponentProps {
  data: ICourses;
}

const CourseLayer: React.FC<ComponentProps> = ({ data }) => {
  const [rating, setRating] = React.useState<string[]>([]);

  useEffect(() => {
    const newRating = Array(5).fill("star");
    setRating(newRating);
  }, [data]);

  return (
    <div className="mt-10">
      {data.courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default CourseLayer;
