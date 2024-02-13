import { IAcademy, ICourse, RootState } from "@/utils/type.dt";
import React, { useEffect, useState } from "react";
import Badge from "../reusableComponents/Badge";
import { useRouter } from "next/navigation";
import EditCourse from "../academies/EditCourse";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/userSlice";
import { toast } from "react-toastify";
import { addCourseToAcademy } from "@/services/backend.services";

interface Props {
  courses: ICourse[];
  academy: IAcademy;
}

const AddRemoveCourse: React.FC<Props> = ({ courses, academy }) => {
  const dispatch = useDispatch();
  const { setUserData } = userActions;
  const { userData } = useSelector((states: RootState) => states.userStates);

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
      if (sessionUser) {
        dispatch(setUserData(sessionUser));
      }
    }
  }, [dispatch, setUserData, userData]);

  const [updatedAcademy, setUpdatedAcademy] = useState<IAcademy>(academy);
  const [academyCourses, setAcademyCourses] = useState(updatedAcademy.courses);

  const academyCourseIds = academyCourses.map((course) => course._id);
  const availableCoursesToAdd = courses
    .filter((course) => !academyCourseIds.includes(course._id))
    .map((course) => ({ _id: course._id, name: course.name }));

  const [coursesToAdd, setCourseToAdd] = useState(availableCoursesToAdd);

  const handleAdd = async (courseId: string, name: string) => {
    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        const result = await addCourseToAcademy(academy._id, courseId);

        if (result) {
          resolve();
          setUpdatedAcademy(result);
          setAcademyCourses((prev) => [...prev, { _id: courseId, name }]);
          const newCoursesToAdd = coursesToAdd.filter(
            (course) => course._id !== courseId
          );
          setCourseToAdd(newCoursesToAdd);
        } else {
          reject();
        }
      }),
      {
        pending: `Adding Course...`,
        success: `Course added successfully 👌`,
        error: "Encountered error 🤯",
      }
    );
  };

  const handleRemove = async (courseId: string, name: string) => {
    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        const result = await addCourseToAcademy(academy._id, courseId);

        if (result) {
          resolve();
          setUpdatedAcademy(result);
          const newAcademyCourses = academyCourses.filter(
            (course) => course._id !== courseId
          );
          setAcademyCourses(newAcademyCourses);

          const newCoursesToAdd = [...coursesToAdd, { _id: courseId, name }];
          setCourseToAdd(newCoursesToAdd);
        } else {
          reject();
        }
      }),
      {
        pending: `Removing Course...`,
        success: `Course removed successfully 👌`,
        error: "Encountered error 🤯",
      }
    );
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
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/academies/removeCourse?${searchQuery}`,
        requestDetails
      );

      if (response.status === 400) {
        alert("Something went wrong");
      }

      const result = await response.json();
      setUpdatedAcademy(result);
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
    <div className="md:px-14 md:py-10 p-5 sm:px-10 md:relative overflow-x-hidden flex flex-col justify-between gap-10 md:flex-row-reverse">
      <div className="flex flex-col md:flex-row gap-4 cursor-pointer w-full ">
        <div className="flex flex-col gap-2">
          <h1 className="text-violet-950 text-lg font-medium border-l-8  border-green-900 pl-5">
            Existing Courses
          </h1>
          <p className="text-[#4F547B]">
            These are the courses that are currently active within our academy.
          </p>

          <div className="flex flex-col gap-2">
            {academyCourses.map((course) => (
              <Badge
                key={course._id}
                inputText={course.name}
                imageUrl="/images/right-arrow.png"
                handleIconClick={() => handleRemove(course._id, course.name)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-violet-950 text-lg font-medium  border-l-8 border-yellow-600 pl-5">
            Pending Courses
          </h1>
          <p className="text-[#4F547B]">
            These are courses owned by this instructor, but yet to be added to
            this academy
          </p>
          <div className="flex flex-col gap-2">
            {coursesToAdd.map((course) => (
              <Badge
                key={course._id}
                inputText={course.name}
                imageUrl="/images/left-arrow.png"
                handleIconClick={() => handleAdd(course._id, course.name)}
                imagePosition="left"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Link
          href={`/academy/${updatedAcademy._id}`}
          className="rounded-lg bg-blue-500 text-white px-4 py-2 max-w-[200px]"
        >
          Back to Academy
        </Link>
        <EditCourse academy={updatedAcademy} />
      </div>
    </div>
  );
};

export default AddRemoveCourse;
