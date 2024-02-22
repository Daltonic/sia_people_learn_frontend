import Button from '@/components/reusableComponents/Button'
import InputField from '@/components/reusableComponents/InputField'
import TextAreaField from '@/components/reusableComponents/TextAreaField'
import { useSelector, useDispatch } from 'react-redux'
import { userActions } from '@/store/userSlice'
import { ILesson, RootState } from '@/utils/type.dt'
import { useRouter } from 'next/navigation'
import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from 'react'
import { toast } from 'react-toastify'
import { createLesson, updateLesson } from '@/services/backend.services'

import { uploaderActions } from '@/store/uploaderSlice'
import FileUploader from '@/components/reusableComponents/FileUploader'
import { FaArrowsRotate, FaTrashCan } from 'react-icons/fa6'
import { MdCancel, MdOutlineFileCopy } from 'react-icons/md'
import { extractFileNameFromUrl, truncateFileName } from '@/utils/helper'

interface LessonProps {
  lesson?: ILesson
  courseId: string
  type: 'create' | 'edit'
}

const LessonForm: React.FC<LessonProps> = ({ lesson, courseId, type }) => {
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
  const [lessonDetails, setLessonDetails] = useState({
    title: lesson?.title || '',
    description: lesson?.description || '',
    overview: lesson?.overview || '',
    duration: lesson?.duration || 100,
    imageUrl: lesson?.imageUrl || '',
    videoUrl: lesson?.videoUrl || '',
    downloadableUrl: lesson?.downloadableUrl || '',
    order: lesson?.order || 0,
  })

  const [submitting, setSubmitting] = useState<boolean>(false)
  const [acceptType, setAcceptType] = useState<string>('')
  const { setUploaderModal } = uploaderActions

  const handleFileMount = (fileUrl: string) => {
    if (acceptType.includes('video')) {
      setLessonDetails((prev) => ({
        ...prev,
        videoUrl: fileUrl,
      }))
    } else {
      setLessonDetails((prev) => ({
        ...prev,
        downloadableUrl: fileUrl,
      }))
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget

    setLessonDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    if (type === 'create') {
      await toast.promise(
        new Promise<void>(async (resolve, reject) => {
          const status = await createLesson({
            title: lessonDetails.title,
            description: lessonDetails.description,
            overview: lessonDetails.overview,
            duration: Number(lessonDetails.duration),
            imageUrl: lessonDetails?.imageUrl,
            videoUrl: lessonDetails.videoUrl,
            downloadableUrl: lessonDetails.downloadableUrl,
            order: Number(lessonDetails.order),
            courseId: courseId,
          })
          if (status === 201) {
            setSubmitting(false)
            router.push(`/course/${courseId}`)
            resolve()
          } else {
            setSubmitting(false)
            reject()
          }
        }),
        {
          pending: 'Saving ...',
          success: 'Lesson saved successfully 👌',
          error: 'Encountered error 🤯',
        }
      )
    } else {
      await toast.promise(
        new Promise<void>(async (resolve, reject) => {
          const status = await updateLesson(
            {
              title: lessonDetails.title,
              description: lessonDetails.description,
              overview: lessonDetails.overview,
              duration: Number(lessonDetails.duration),
              imageUrl: lessonDetails?.imageUrl,
              videoUrl: lessonDetails.videoUrl,
              downloadableUrl: lessonDetails.downloadableUrl,
              order: Number(lessonDetails.order),
            },
            lesson?._id!
          )
          if (status === 200) {
            setSubmitting(false)
            router.push(`/course/${courseId}`)
            resolve()
          } else {
            setSubmitting(false)
            reject()
          }
        }),
        {
          pending: 'Updating ...',
          success: 'Lesson updated successfully 👌',
          error: 'Encountered error 🤯',
        }
      )
    }
  }

  const handleFileAttachment = (type: string) => {
    setAcceptType(type)
    dispatch(setUploaderModal('scale-100'))
  }

  return (
    <div className="bg-white rounded-lg ">
      <div className="p-5 border-b border-[#EDEDED]">
        {!lessonDetails.videoUrl && (
          <Button
            onClick={() => handleFileAttachment('video/mp4')}
            className="text-slate-600 border border-[color:var(--border-2,#E1DDDD)]"
          >
            Add Video
          </Button>
        )}

        {lessonDetails.videoUrl && (
          <div className="relative">
            <div className="flex justify-start items-center space-x-2 absolute top-2 left-2">
              <Button
                onClick={() => handleFileAttachment('video/mp4')}
                className="bg-black bg-opacity-25 text-white"
              >
                <FaArrowsRotate size={20} />
              </Button>

              <Button
                onClick={() =>
                  setLessonDetails((prev) => ({ ...prev, videoUrl: '' }))
                }
                className="bg-black bg-opacity-25 text-white"
              >
                <FaTrashCan size={20} />
              </Button>
            </div>
            <video
              src={lessonDetails.videoUrl}
              width={500}
              height={100}
              className="h-72 w-full object-cover"
              controls
            />
          </div>
        )}
      </div>

      <form className="p-5" onSubmit={handleSubmit}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter your product title"
          required
          inputType="text"
          value={lessonDetails.title}
          handleChange={handleChange}
        />
        <div className="md:flex gap-8">
          <TextAreaField
            label="Description"
            id="description"
            name="description"
            value={lessonDetails.description}
            handleChange={handleChange}
          />
        </div>
        <div className="md:flex gap-8">
          <InputField
            label="Duration (in minutes)"
            name="duration"
            placeholder="Lesson Duration"
            required
            inputType="number"
            value={lessonDetails.duration}
            handleChange={handleChange}
          />
          <InputField
            label="Order Number"
            name="order"
            placeholder="Enter Order"
            required
            inputType="number"
            value={lessonDetails.order}
            handleChange={handleChange}
          />
        </div>
        <div className="md:flex gap-8">
          {!lessonDetails.downloadableUrl && (
            <Button
              onClick={() => handleFileAttachment('application/pdf')}
              className="text-slate-600 border border-[color:var(--border-2,#E1DDDD)]"
            >
              Add Downloadable
            </Button>
          )}

          {lessonDetails.downloadableUrl && (
            <div className="flex gap-2 items-center text-pink-600">
              <MdOutlineFileCopy size={20} />

              <div className="flex-1 flex justify-start items-center space-x-2">
                <p>{extractFileNameFromUrl(lessonDetails.downloadableUrl)}</p>
              </div>

              <Button
                onClick={() =>
                  setLessonDetails((prev) => ({
                    ...prev,
                    downloadableUrl: '',
                  }))
                }
              >
                <MdCancel className="text-gray-600" />
              </Button>
            </div>
          )}
        </div>
        <Button variant="pink" className="mt-14" disabled={submitting}>
          {submitting
            ? type === 'create'
              ? 'Creating'
              : 'Updating'
            : type === 'create'
            ? 'Create'
            : 'Update'}
        </Button>
      </form>
      <FileUploader
        onUploadSuccess={(response) => handleFileMount(response.url)}
        accept={acceptType}
      />
    </div>
  )
}

export default LessonForm
