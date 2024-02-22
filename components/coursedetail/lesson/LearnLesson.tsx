import LessonAccordion from '@/components/lesson/LessonAccordion'
import { ICourse, ILesson } from '@/utils/type.dt'
import Plyr from 'plyr-react'
import 'plyr-react/plyr.css'

interface Props {
  lesson: ILesson
  course: ICourse
}

const LearnLesson: React.FC<Props> = ({ lesson, course }) => {
  //todo: Function to calculate video width and height based on screen side

  return (
    <div className="flex md-flex-col w-full">
      <div className="mx-auto w-full sm:w-2/4">
        <Plyr
          source={{
            type: 'video',
            sources: [
              {
                src:
                  lesson.imageUrl ||
                  'https://file.dappmentors.duckdns.org/download/video/1708596030238__AQgH.mp4',
                provider: 'html5',
              },
            ],
          }}
        />
      </div>

      <div className="flex flex-col w-1/4">
        <p>Course Details</p>
        <LessonAccordion course={course} lessonId={lesson._id} />
        <p>{course.overview}</p>
      </div>
    </div>
  )
}

export default LearnLesson
