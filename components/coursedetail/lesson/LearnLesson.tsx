import LessonAccordion from "@/components/lesson/LessonAccordion";
import { ICourse, ILesson } from "@/utils/type.dt";
import ReactPlayer from "react-player";

interface Props {
  lesson: ILesson;
  course: ICourse;
}

const LearnLesson: React.FC<Props> = ({ lesson, course }) => {
  //todo: Function to calculate video width and height based on screen side
  return (
    <div className="flex md-flex-col w-full">
      <div className="flex flex-col  w-3/4">
        <h1 className="text-[36px]">{lesson.title}</h1>
        <div className="w-full flex justify-center items-center rounded-lg">
          <ReactPlayer
            controls
            url={
              lesson.videoUrl || `https://www.youtube.com/watch?v=7sDY4m8KNLc`
            }
            width={"640px"}
            height={"480px"}
            loop={true}
            style={{
              marginTop: "4px",
              marginBottom: "4px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "4px",
            }}
          />
        </div>

        <div>{lesson.overview}</div>
        <div
          dangerouslySetInnerHTML={{ __html: lesson.description }}
          className={"line-clamp-3 text-[#4F547B] "}
        />
      </div>
      <div className="flex flex-col w-1/4">
        <p>Course Details</p>
        <LessonAccordion course={course} lessonId={lesson._id} />
        <p>{course.overview}</p>
      </div>
    </div>
  );
};

export default LearnLesson;
