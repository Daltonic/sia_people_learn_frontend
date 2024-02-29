import LessonAccordion from '@/components/lesson/LessonAccordion'
import Button from '@/components/reusableComponents/Button'
import { ICourse, ILesson } from '@/utils/type.dt'
import { useRouter } from 'next/router'
import Plyr from 'plyr-react'
import 'plyr-react/plyr.css'

interface Props {
  lesson: ILesson
  course: ICourse
}

const LearnLesson: React.FC<Props> = ({ lesson, course }) => {
  //todo: Function to calculate video width and height based on screen side

  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = lesson.downloadableUrl || ''
    link.download = `lesson_${lesson._id}_asset` // You can specify a filename here if you want
    link.target = '_blank' // Open the link in a new tab
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="w-full p-5 md:p-10 md:flex justify-between items-start gap-5">
      <div className="mb-4 w-full md:w-[70%]">
        <div className="w-full">
          <Plyr
            source={{
              type: 'video',
              sources: [
                {
                  src:
                    lesson?.videoUrl ||
                    'https://file.dappmentors.duckdns.org/download/video/1708596030238__AQgH.mp4',
                  provider: 'html5',
                },
              ],
            }}
          />
        </div>

        <div className="text-[#321463] md:mt-4">
          <span className="text-xl font-medium capitalize">
            {lesson?.title}
          </span>
          <span> | {lesson?.duration} min</span>
        </div>

        <p className="text-[#4F547B] my-2">{lesson?.description}</p>

        <div className="flex justify-start items-center space-x-2">
          <Button variant="pink" onClick={handleGoBack}>
            Back to Course
          </Button>

          {lesson?.downloadableUrl && (
            <Button variant="pinkoutline" onClick={handleDownload}>
              Download Asset
            </Button>
          )}
        </div>
      </div>

      <div className="md:w-[30%] mt-4 md:mt-0">
        <LessonAccordion
          course={course}
          lessons={course?.lessons}
          lessonId={lesson._id}
        />
      </div>
    </div>
  )
}

export default LearnLesson
