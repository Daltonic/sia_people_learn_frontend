import React, { SyntheticEvent, useState } from 'react'
import Button from '@/components/reusableComponents/Button'
import InputField from '@/components/reusableComponents/InputField'
import TextAreaField from '@/components/reusableComponents/TextAreaField'
import { FaArrowsRotate, FaTrashCan } from 'react-icons/fa6'
import { MdCancel, MdOutlineFileCopy } from 'react-icons/md'
import { IoChevronDownSharp, IoChevronUpSharp } from 'react-icons/io5'
import FileUploader from '@/components/reusableComponents/FileUploader'
import { extractFileNameFromUrl } from '@/utils/helper'
import { useDispatch } from 'react-redux'
import { uploaderActions } from '@/store/slices/uploaderSlice'
import { toast } from 'react-toastify'
import { createLesson, updateLesson } from '@/services/backend.services'
import { ILesson } from '@/utils/type.dt'
import { genericActions } from '@/store/slices/genericSlice'

interface LessonFormProps {
  lesson?: ILesson
  type: 'create' | 'edit'
  courseId: string
  accordionState?: boolean
}

const LessonForm: React.FC<LessonFormProps> = ({
  lesson,
  type,
  courseId,
  accordionState,
}) => {
  const dispatch = useDispatch()
  const { setUploaderModal } = uploaderActions
  const [acceptType, setAcceptType] = useState<string>('')
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [isAccordionOpen, setIsAccordionOpen] = useState(accordionState)
  const { setDeleteModal, setData } = genericActions

  const [lessonDetails, setLessonDetails] = useState({
    title: lesson?.title || '',
    description: lesson?.description || '',
    duration: lesson?.duration || 0,
    videoUrl: lesson?.videoUrl || '',
    downloadableUrl: lesson?.downloadableUrl || '',
    order: lesson?.order || 0,
  })

  const handleFileMount = (fileInfo: any) => {
    if (acceptType.includes('video')) {
      setLessonDetails((prev: any) => ({
        ...prev,
        duration: fileInfo.duration / 60, // converting the duration from seconds to minutes
        videoUrl: fileInfo.url,
      }))
    } else {
      setLessonDetails((prev: any) => ({
        ...prev,
        downloadableUrl: fileInfo.url,
      }))
    }
  }

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen)
  }

  const handleFileAttachment = (type: string) => {
    setAcceptType(type)
    dispatch(setUploaderModal('scale-100'))
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.currentTarget
    setLessonDetails((prev: any) => ({
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

  const onDelete = () => {
    dispatch(setData({ ...lesson, name: lesson?.title, type: 'lesson' }))
    dispatch(setDeleteModal('scale-100'))
  }

  return (
    <div className="bg-white rounded-lg shadow-md my-4">
      <div className="p-5 flex justify-between items-center">
        <h4>{lessonDetails?.title || 'Add New Lesson'}</h4>
        <div>
          <Button
            onClick={onDelete}
            className="text-slate-600 hover:text-pink-500
            border border-transparent"
          >
            <FaTrashCan />
          </Button>
          <Button
            onClick={toggleAccordion}
            className="text-slate-600 border border-transparent"
          >
            {isAccordionOpen ? <IoChevronDownSharp /> : <IoChevronUpSharp />}
          </Button>
        </div>
      </div>

      {isAccordionOpen && (
        <div>
          <div className="p-5 pt-0 border-b border-[#EDEDED]">
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
                      setLessonDetails((prev: any) => ({
                        ...prev,
                        videoUrl: '',
                      }))
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
                    <p>
                      {extractFileNameFromUrl(lessonDetails.downloadableUrl)}
                    </p>
                  </div>

                  <Button
                    type="button"
                    onClick={() =>
                      setLessonDetails((prev: any) => ({
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

            <Button variant="pink" className="mt-5" disabled={submitting}>
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
      )}
    </div>
  )
}

export default LessonForm
