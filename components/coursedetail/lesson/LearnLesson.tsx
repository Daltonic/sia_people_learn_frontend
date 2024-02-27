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
    <div className="flex items-start gap-5 w-full">
      <div className="mx-auto w-full md:w-[70%]">
        <Plyr
          source={{
            type: 'video',
            sources: [
              {
                src:
                  lesson.videoUrl ||
                  'https://file.dappmentors.duckdns.org/download/video/1708596030238__AQgH.mp4',
                provider: 'html5',
              },
            ],
          }}
        />

        <div className="text-[#321463] md:mt-4">
          <span className="text-xl font-medium capitalize">{lesson.title}</span>
          <span> | {lesson.duration} min</span>
        </div>

        <p className="text-[#4F547B] my-2">{lesson.overview}</p>

        <div className="flex justify-start items-center space-x-2">
          <Button variant="pink" onClick={handleGoBack}>
            Back to Course
          </Button>

          {lesson.downloadableUrl && (
            <Button variant="pinkoutline" onClick={handleDownload}>
              Download Asset
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-col w-full md:w-[30%] h-full">
        <LessonAccordion
          course={course}
          lessons={course.lessons}
          lessonId={lesson._id}
          onReorder={() => console.log('Order not permitted')}
        />
      </div>
    </div>
  )
}

export default LearnLesson
