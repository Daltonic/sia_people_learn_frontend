import Button from '@/components/reusableComponents/Button'
import InputField from '@/components/reusableComponents/InputField'
import TextAreaField from '@/components/reusableComponents/TextAreaField'
import { useSelector, useDispatch } from 'react-redux'
import { userActions } from '@/store/slices/userSlice'
import { ILesson, RootState } from '@/utils/type.dt'
import { useRouter } from 'next/navigation'
import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from 'react'
import { toast } from 'react-toastify'
import { createLesson, updateLesson } from '@/services/backend.services'

import { uploaderActions } from '@/store/slices/uploaderSlice'
import FileUploader from '@/components/reusableComponents/FileUploader'
import { FaArrowsRotate, FaTrashCan } from 'react-icons/fa6'
import { MdCancel, MdOutlineFileCopy } from 'react-icons/md'
import { extractFileNameFromUrl } from '@/utils/helper'

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

  const [lessonDetails, setLessonDetails] = useState({
    title: lesson?.title || '',
    description: lesson?.description || '',
    duration: lesson?.duration || 0,
    videoUrl: lesson?.videoUrl || '',
    downloadableUrl: lesson?.downloadableUrl || '',
    order: lesson?.order || 0,
  })

  const [submitting, setSubmitting] = useState<boolean>(false)
  const [acceptType, setAcceptType] = useState<string>('')
  const { setUploaderModal } = uploaderActions

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem('user')!)
      if (sessionUser) {
        dispatch(setUserData(sessionUser))
      }
    }
  }, [dispatch, setUserData, userData])

  const handleFileMount = (fileInfo: any) => {
    if (acceptType.includes('video')) {
      setLessonDetails((prev) => ({
        ...prev,
        duration: fileInfo.duration / 60, // converting the duration from seconds to minutes
        videoUrl: fileInfo.url,
      }))
    } else {
      setLessonDetails((prev) => ({
        ...prev,
        downloadableUrl: fileInfo.url,
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
          await createLesson({
            title: lessonDetails.title,
            description: lessonDetails.description,
            duration: Number(lessonDetails.duration),
            videoUrl: lessonDetails.videoUrl,
            downloadableUrl: lessonDetails.downloadableUrl,
            order: Number(lessonDetails.order),
            courseId: courseId,
          })
            .then((res) => {
              resetForm()
              resolve(res)
            })
            .catch((error) => {
              setSubmitting(false)
              reject(error)
            })
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
          await updateLesson(
            {
              title: lessonDetails.title,
              description: lessonDetails.description,
              duration: Number(lessonDetails.duration),
              videoUrl: lessonDetails.videoUrl,
              downloadableUrl: lessonDetails.downloadableUrl,
              order: Number(lessonDetails.order),
            },
            lesson?._id!
          )
            .then((res) => {
              setSubmitting(false)
              router.push(`/course/learn/${courseId}`)
              resolve(res)
            })
            .catch((error) => {
              setSubmitting(false)
              reject(error)
            })
        }),
        {
          pending: 'Updating ...',
          success: 'Lesson updated successfully 👌',
          error: 'Encountered error 🤯',
        }
      )
    }
  }

  const resetForm = () => {
    setLessonDetails({
      title: '',
      description: '',
      duration: 0,
      videoUrl: '',
      downloadableUrl: '',
      order: 0,
    })
    setSubmitting(false)
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
            <div className="flex justify-start items-center space-x-2 absolute top-2 left-2 z-40">
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
        {/* <div className="md:flex gap-8">
          <InputField
            label="Duration (in minutes)"
            name="duration"
            placeholder="Lesson Duration"
            required
            inputType="number"
            value={lessonDetails.duration}
            handleChange={handleChange}
          />
        </div> */}
        <div className="md:flex gap-8">
          {!lessonDetails.downloadableUrl && (
            <Button
              type="button"
              onClick={() =>
                handleFileAttachment('application/pdf, application/zip')
              }
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
                type="button"
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
        onUploadSuccess={(response) => handleFileMount(response)}
        accept={acceptType}
      />
    </div>
  )
}

export default LessonForm
