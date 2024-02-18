import React from "react";
import Image from "next/image";
import { ICourse, ILesson } from "@/utils/type.dt";

interface Lesson {
  _id: string;
  title: string;
  imageUrl: string;
  duration: string;
}

interface Course {
  lessons: ILesson[];
}

interface Props {
  course: ICourse;
}

const LessonAccordion: React.FC<Props> = ({ course }) => {
  console.log(course.lessons)
  return (
    <div className="border rounded-md p-2 space-y-2">
        {course.lessons.length >  0 &&
          course.lessons.map((lesson) => (
                <div key={lesson._id} className="flex item-center gap-3 text-[#4F547B] md:text-sm bg-white">
                  <div>
                    <Image
                      height={100}
                      width={100}
                      src={lesson.imageUrl || "/images/cardimg.svg"}
                      alt="Course Image"
                      className="w-14 h-10 object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{lesson.title}</h3>
                    <p className="underline">{lesson.duration}</p>
                  </div>
                </div>
          ))}
    </div>
  );
};

export default LessonAccordion;
