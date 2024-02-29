import React from 'react'
import Image from 'next/image'
import { ICourse, ILesson, RootState } from '@/utils/type.dt'
import EmptyComponent from '../reusableComponents/EmptyComponent'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Button from '../reusableComponents/Button'
import { MdOutlineModeEditOutline } from 'react-icons/md'

interface Props {
  course: ICourse
  lessons: ILesson[]
  lessonId?: string
}

const LessonAccordion: React.FC<Props> = ({ course, lessons, lessonId }) => {
  const { userData } = useSelector((states: RootState) => states.userStates)
  const router = useRouter()

  return (
    <div className="border rounded-md p-2 space-y-2 md:h-[55vh] overflow-y-scroll w-full">
      <div className="flex justify-between items-center mb-2 text-[#321463] text-lg font-medium ">
        <h4>Course Lessons</h4>
        {course.userId._id === userData?._id && (
          <Button
            className="flex justify-start items-center space-x-2"
            onClick={() =>
              router.push({
                pathname: `/course/lesson/create`,
                query: {
                  courseId: course._id,
                },
              })
            }
          >
            <MdOutlineModeEditOutline />
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {lessons.map((lesson, index) => (
          <Link
            key={index}
            href={{
              pathname: `/course/learn/lesson/${lesson._id}`,
              query: { courseId: course._id },
            }}
            className={`flex item-center gap-3 text-[#4F547B] md:text-sm p-2 rounded-sm cursor-pointer ${
              lesson._id === lessonId ? 'bg-slate-200' : 'bg-slate-50'
            }`}
          >
            <div>
              <Image
                height={100}
                width={100}
                src={course.imageUrl || '/images/general/cardimg.svg'}
                alt="Course Image"
                className="w-14 h-10 object-cover rounded-md"
              />
            </div>
            <div>
              <h3 className="font-medium">{lesson.title}</h3>
              <p className="">Duration: {lesson.duration.toFixed(2)} mins</p>
            </div>
          </Link>
        ))}
      </div>

      {lessons.length < 1 && (
        <EmptyComponent
          title="No lessons available for this course"
          buttonText="Go Back"
        />
      )}
    </div>
  )
}

export default LessonAccordion
