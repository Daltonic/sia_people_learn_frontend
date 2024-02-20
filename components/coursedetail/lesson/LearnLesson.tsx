import { ILesson } from "@/utils/type.dt";

interface Props {
  lesson: ILesson;
}

const LearnLesson: React.FC<Props> = ({ lesson }) => {
  console.log(lesson);
  return <div>{lesson.description}</div>;
};

export default LearnLesson;
