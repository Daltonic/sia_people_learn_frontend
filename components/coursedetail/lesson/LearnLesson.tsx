import LessonAccordion from "@/components/lesson/LessonAccordion";
import Button from "@/components/reusableComponents/Button";
import { ICourse, ILesson } from "@/utils/type.dt";
import { useRouter } from "next/router";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

interface Props {
  lesson: ILesson;
  course: ICourse;
}

const LearnLesson: React.FC<Props> = ({ lesson, course }) => {
  //todo: Function to calculate video width and height based on screen side

  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className="flex items-start gap-5 w-full">
      <div className="mx-auto w-full md:w-[70%]">
        <Plyr
          source={{
            type: "video",
            sources: [
              {
                src:
                  lesson.videoUrl ||
                  "https://file.dappmentors.duckdns.org/download/video/1708596030238__AQgH.mp4",
                provider: "html5",
              },
            ],
          }}
        />
        <p className="text-[#321463] text-xl font-medium capitalize md:mt-4">
          {lesson.title}
        </p>
        <p className="text-[#4F547B] md:text-sm">Duration: {lesson.duration}</p>
        <p className="text-[#4F547B] mb-2">Duration: {lesson.overview}</p>
        <Button variant="pink" onClick={handleGoBack}>
          Back to Course
        </Button>
      </div>

      <div className="flex flex-col w-full md:w-[30%] h-full">
        <LessonAccordion course={course} lessonId={lesson._id} />
      </div>
    </div>
  );
};

export default LearnLesson;
