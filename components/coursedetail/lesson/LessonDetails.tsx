'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { ILesson, RootState } from '@/utils/type.dt'
import { FiEdit2 } from 'react-icons/fi'
import { FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import InputField from '@/components/reusableComponents/InputField'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from '@/store/slices/userSlice'
import { toast } from 'react-toastify'
import { deleteLesson } from '@/services/backend.services'

interface ComponentProps {
  lesson: ILesson
}

const LessonDetails: React.FC<ComponentProps> = ({ lesson }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { setUserData } = userActions
  const { userData } = useSelector((states: RootState) => states.userStates)

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem('user')!)
      if (sessionUser) {
        dispatch(setUserData(sessionUser))
      }
    }
  }, [dispatch, setUserData, userData])

  const handleDelete = async () => {
    const courseId = lesson.courseId
    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        const status = await deleteLesson(lesson._id)

        if (status === 200) {
          router.push(`/course/${courseId}`)
          resolve()
        } else {
          reject()
        }
      }),
      {
        pending: `Deleting...`,
        success: `Lesson deleted successfully 👌`,
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    <div className="flex justify-between">
      <div className=" md:w-[55%]">
        <div className="flex gap-5">
          <Link href={`/course/lesson/edit/${String(lesson._id)}`}>
            <button className="text-white flex gap-2 items-center text-xs font-medium bg-sky-400 p-2 rounded-md">
              Edit
              <FiEdit2 />
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="text-white flex gap-2 items-center text-xs font-medium bg-red-500 p-2 rounded-md"
          >
            Delete
            <FaTimes />
          </button>
        </div>
        <h1 className="text-[#4F547B] text-base">{lesson.description}</h1>
      </div>

      <div className="w-full md:w-[55%]">
        <div
          className="md:w-5/6 h-72 p-5 sm:p-10 sm:my-14 md:my-16
          shadow shadow-slate-400  bg-[url('/images/instructors/instructorbg.svg')]
          bg-cover bg-center rounded-md flex flex-col items-center sm:items-start text-center"
        >
          <video controls width="500" height="200" preload="auto">
            <source
              src={
                lesson.videoUrl ||
                'https://file.dappmentors.duckdns.org/download/video/1708596030238__AQgH.mp4'
              }
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </div>
  )
}

export default LessonDetails
