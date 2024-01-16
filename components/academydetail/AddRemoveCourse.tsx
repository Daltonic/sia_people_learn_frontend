import { IAcademy, ICourse } from "@/utils/type.dt";
import React, { useEffect, useState } from "react";
import Badge from "../reusableComponents/Badge";
import { useRouter } from "next/navigation";
import { _useContext } from "@/context/Context";

interface Props {
  courses: ICourse[];
  academy: IAcademy;
}

const AddRemoveCourse: React.FC<Props> = ({ courses, academy }) => {
  const router = useRouter();
  const { user } = _useContext();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  const [academyCourses, setAcademyCourses] = useState(academy.courses);

  const academyCourseIds = academyCourses.map((course) => course._id);
  const availableCoursesToAdd = courses
    .filter((course) => !academyCourseIds.includes(course._id))
    .map((course) => ({ _id: course._id, name: course.name }));

  const [coursesToAdd, setCourseToAdd] = useState(availableCoursesToAdd);

  const handleAdd = (courseId: string, name: string) => {
    const addCourseToAcademy = async () => {
      const requestDetails = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };
      const searchQuery = new URLSearchParams({
        academyId: academy._id,
        courseId,
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/academies/addCourse?${searchQuery}`,
        requestDetails
      );

      if (response.status === 400) {
        alert("Something went wrong");
      }

      const result = await response.json();
      console.log(result);
      setAcademyCourses((prev) => [...prev, { _id: courseId, name }]);
      const newCoursesToAdd = coursesToAdd.filter(
        (course) => course._id !== courseId
      );
      setCourseToAdd(newCoursesToAdd);
    };

    addCourseToAcademy();
  };

  const handleRemove = (courseId: string, name: string) => {
    const removeCourseFromAcademy = async () => {
      const requestDetails = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };
      const searchQuery = new URLSearchParams({
        academyId: academy._id,
        courseId,
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/academies/addCourse?${searchQuery}`,
        requestDetails
      );

      if (response.status === 400) {
        alert("Something went wrong");
      }

      const result = await response.json();
      const newAcademyCourses = academyCourses.filter(
        (course) => course._id !== courseId
      );
      setAcademyCourses(newAcademyCourses);

      const newCoursesToAdd = [...coursesToAdd, { _id: courseId, name }];
      setCourseToAdd(newCoursesToAdd);
    };

    removeCourseFromAcademy();
  };

  return (
    <div className="flex gap-4 cursor-pointer">
      <div className="flex flex-col gap-2">
        <h4>Courses in Academy</h4>
        <div>
          {academyCourses.map((course) => (
            <Badge
              key={course._id}
              inputText={course.name}
              imageUrl="/images/cancel.png"
              handleIconClick={() => handleRemove(course._id, course.name)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h4>Available Courses</h4>
        <div>
          {coursesToAdd.map((course) => (
            <Badge
              key={course._id}
              inputText={course.name}
              imageUrl="/images/cancel.png"
              handleIconClick={() => handleAdd(course._id, course.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddRemoveCourse;
