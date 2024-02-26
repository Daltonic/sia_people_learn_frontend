import React from "react";
import Image from "next/image";
import { ICourse } from "@/utils/type.dt";
import EmptyComponent from "../reusableComponents/EmptyComponent";
import Link from "next/link";

interface Props {
  course: ICourse;
  lessonId?: string;
}

const LessonAccordion: React.FC<Props> = ({ course, lessonId }) => {
  return (
    <div className="border rounded-md p-2 space-y-2 h-screen overflow-y-scroll">
      <div className="mb-2 text-[#321463] text-lg font-medium ">
        Course Lessons
      </div>
      {course.lessons && course.lessons.length > 0 ? (
        <div className="flex flex-col gap-4">
          {course.lessons.map((lesson) => (
            <Link
              key={lesson._id}
              href={{
                pathname: `/course/learn/lesson/${lesson._id}`,
                query: { courseId: course._id },
              }}
              className={`flex item-center gap-3 text-[#4F547B] md:text-sm p-2 rounded-sm cursor-pointer ${
                lesson._id === lessonId ? "bg-slate-200" : "bg-slate-50"
              }`}
            >
              <div>
                <Image
                  height={100}
                  width={100}
                  src={course.imageUrl || "/images/general/cardimg.svg"}
                  alt="Course Image"
                  className="w-14 h-10 object-cover rounded-md"
                />
              </div>
              <div>
                <h3 className="font-medium">{lesson.title}</h3>
                <p className="">Duration: {lesson.duration} mins</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyComponent
          title="No lessons available for this course"
          buttonText="Go Back"
        />
      )}
    </div>
  );
};

export default LessonAccordion;
