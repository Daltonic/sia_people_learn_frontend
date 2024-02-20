import React from "react";
import Image from "next/image";
import { ICourse } from "@/utils/type.dt";
import EmptyComponent from "../reusableComponents/EmptyComponent";
import Link from "next/link";

interface Props {
  course: ICourse;
}

const LessonAccordion: React.FC<Props> = ({ course }) => {
  return (
    <div className="border rounded-md p-2 space-y-2">
      <div className="mb-2">Course Lessons</div>
      {course.lessons.length > 0 ? (
        <div className="flex flex-col gap-4">
          {course.lessons.map((lesson) => (
            <Link
              key={lesson._id}
              href={`/course/learn/lesson/${lesson._id}`}
              className="flex item-center gap-3 text-[#4F547B] md:text-sm bg-slate-50 py-1 cursor-pointer"
            >
              <div>
                <Image
                  height={100}
                  width={100}
                  src={lesson.imageUrl || "/images/general/cardimg.svg"}
                  alt="Course Image"
                  className="w-14 h-10 object-cover rounded-md"
                />
              </div>
              <div>
                <h3 className="font-medium">{lesson.title}</h3>
                <p className="underline">Duration: {lesson.duration}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyComponent title="No lessons available for this course" />
      )}
    </div>
  );
};

export default LessonAccordion;
