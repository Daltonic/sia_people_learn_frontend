'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Dropdown from '@/components/reusableComponents/Dropdown'
import { toast } from 'react-toastify'
import {
  approveAcademy,
  approveCourse,
  submitCourse,
} from '@/services/backend.services'
import { useDispatch } from 'react-redux'
import { genericActions } from '@/store/slices/genericSlice'
import { IAcademy, ICourse } from '@/utils/type.dt'
import { ViewRating } from '@/components/reusableComponents/Rating'

interface ComponentProps {
  data: ICourse | IAcademy
  type: 'Book' | 'Course' | 'Academy'
  owner?: boolean
  admin?: boolean
}

function isIAcademy(data: ICourse | IAcademy): data is IAcademy {
  return (data as IAcademy).courses !== undefined
}

const MyCourseCard: React.FC<ComponentProps> = ({
  data,
  type,
  owner,
  admin,
}) => {
  const [rating, setRating] = useState<string[]>([])
  const dispatch = useDispatch()
  const { setDeleteModal, setData } = genericActions

  const [course, setCourse] = useState<ICourse>(data as ICourse)
  const [academy, setAcademy] = useState<IAcademy>(data as IAcademy)

  useEffect(() => {
    if (isIAcademy(data)) {
      setAcademy(data)
    } else {
      setCourse(data)
    }
  }, [data, data.approved])

  useEffect(() => {
    const newRating = Array(5).fill('star')
    setRating(newRating)
  }, [data.rating])

  const handleSubmit = async () => {
    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        await submitCourse({ submitted: true }, data._id)
          .then((res: any) => {
            data.submitted = true
            resolve(res)
          })
          .catch((error: any) => reject(error))
      }),
      {
        pending: `Submitting...`,
        success: `Course submitted successfully 👌`,
        error: 'Encountered error 🤯',
      }
    )
  }

  const handleCourseApproval = async () => {
    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        await approveCourse(data._id)
          .then((res: any) => {
            data.approved = true
            resolve(res)
          })
          .catch((error: any) => reject(error))
      }),
      {
        pending: `Approving...`,
        success: `Course approved successfully 👌`,
        error: 'Encountered error 🤯',
      }
    )
  }

  const handleAcademyApprove = async () => {
    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        await approveAcademy(data._id)
          .then((res: any) => {
            data.approved = true
            resolve(res)
          })
          .catch((error: any) => reject(error))
      }),
      {
        pending: `Approving...`,
        success: `Academy approved successfully 👌`,
        error: 'Encountered error 🤯',
      }
    )
  }

  const onDelete = () => {
    dispatch(setData({ ...course, type: 'course' }))
    dispatch(setDeleteModal('scale-100'))
  }

  return (
    <div
      className="bg-white rounded-lg w-full sm:w-80 md:w-52 h-54
    border-[#EDEDED] border-1 p-2 shadow-[#EDEDED] shadow"
    >
      <div className="">
        <div className="h-32 relative rounded-lg hover:bg-black transition-opacity delay-1000 hover:ease-in">
          <Link
            href={
              type !== 'Academy'
                ? `/course/${data.slug}`
                : `/academies/${data.slug}`
            }
          >
            <Image
              width={200}
              height={200}
              className="rounded-lg object-cover h-full w-full  hover:opacity-70"
              src={data.imageUrl || '/images/general/cardimg.svg'}
              alt="image"
            />
          </Link>

          {owner && type !== 'Academy' && (
            <div className="absolute top-1 right-2">
              <Dropdown>
                <Link
                  href={`/(dashboard)/products/courses/edit/${String(
                    data.slug
                  )}`}
                  className="p-1 hover:bg-gray-100 w-full text-left"
                >
                  Edit
                </Link>
                <Link
                  href={{
                    pathname: `/course/learn/${String(data.slug)}`,
                  }}
                  className="p-1 hover:bg-gray-100 w-full text-left"
                >
                  Lessons
                </Link>
                <Link
                  href={{
                    pathname: `/course/lesson/create`,
                    query: {
                      course: data.slug,
                    },
                  }}
                  className="p-1 hover:bg-gray-100 w-full text-left"
                >
                  Add Lessons
                </Link>
                {!data.submitted && (
                  <button
                    onClick={handleSubmit}
                    className="p-1 hover:bg-gray-100 w-full text-left"
                  >
                    Submit
                  </button>
                )}

                <button
                  onClick={onDelete}
                  className="p-1 hover:bg-gray-100 w-full text-left"
                >
                  Delete
                </button>
              </Dropdown>
            </div>
          )}

          {owner && type === 'Academy' && (
            <div className="absolute top-1 right-2">
              <Dropdown>
                <Link
                  href={`/academy/edit/${String(data.slug)}`}
                  className="p-1 hover:bg-gray-100 w-full text-left"
                >
                  Edit
                </Link>
                <Link
                  href={`/academy/courses/${String(data.slug)}`}
                  className="p-1 hover:bg-gray-100 w-full text-left"
                >
                  Courses
                </Link>
                {!data.submitted && (
                  <button
                    onClick={handleSubmit}
                    className="p-1 hover:bg-gray-100 w-full text-left"
                  >
                    Submit
                  </button>
                )}

                <button
                  onClick={onDelete}
                  className="p-1 hover:bg-gray-100 w-full text-left"
                >
                  Delete
                </button>
              </Dropdown>
            </div>
          )}

          {admin && (
            <div className="absolute top-1 right-2">
              <Dropdown>
                {!data.approved && (
                  <>
                    {type !== 'Academy' && (
                      <button
                        onClick={handleCourseApproval}
                        className="p-1 hover:bg-gray-100 w-full text-left"
                      >
                        Approve
                      </button>
                    )}
                    {type === 'Academy' && (
                      <button
                        onClick={handleAcademyApprove}
                        className="p-1 hover:bg-gray-100 w-full text-left"
                      >
                        Approve
                      </button>
                    )}
                  </>
                )}
                <button className="p-1 hover:bg-gray-100 w-full text-left">
                  Button
                </button>
              </Dropdown>
            </div>
          )}
        </div>
        <div className="my-2 py-2 space-y-2">
          <div className="flex items-center justify-between md:text-xs gap-4">
            <div className="flex items-center justify-start gap-[1px]">
              <ViewRating value={data.rating || 0} />
              <p className="text-[#4F547B] pb-[1px]">
                ({data.reviewsCount || 0})
              </p>
            </div>
            {type === 'Course' && (
              <p className="text-[10px] bg-[#6440FB12] text-[#1A064F] rounded-md px-1">
                Lessons ({course.lessons.length})
              </p>
            )}
            {type === 'Academy' && (
              <p className="text-[10px] bg-[#6440FB12] text-[#1A064F] rounded-md px-1">
                Courses ({academy.courses?.length})
              </p>
            )}
          </div>

          <Link className="linkCustom" href={`/course/${data.slug}`}>
            <div className="md:text-sm font-medium text-[#321463] mt-2 h-10">
              <div className="line-clamp-2">{data.name}</div>
            </div>
          </Link>

          <div className="flex justify-between items-center my-2 border-b border-[#EDEDED] pb-1">
            <div className="flex items-center">
              <div className="mr-2 md:mr-1">
                <Image
                  width={100}
                  height={100}
                  src="/images/home/coursesCards/icons/2.svg"
                  alt="icon"
                  className="w-5 h-5 md:w-3 md:h-3"
                />
              </div>
              <div className="md:text-xs ">{`${Math.floor(
                data.duration / 60
              )}h ${Math.floor(data.duration % 60)}m`}</div>
            </div>

            <div className="flex items-start">
              <div className="mr-2 md:mr-1">
                <Image
                  width={100}
                  height={100}
                  src="/images/home/coursesCards/icons/3.svg"
                  alt="icon"
                  className="w-5 h-5  md:w-3 md:h-3"
                />
              </div>
              <div className="md:text-xs">{data.difficulty}</div>
            </div>
          </div>

          <div className="flex justify-between items-center bottom-0 mb-0">
            <div className="flex items-center gap-2">
              {data.userId.imgUrl ? (
                <Image
                  width={10}
                  height={10}
                  src={data.userId.imgUrl || '/images/courseCard/card1.svg'}
                  alt="image"
                  className="object-cover rounded-full w-8 h-8"
                />
              ) : (
                <div className="rounded-full w-8 h-8 text-white px-4 bg-[#C5165D] text-sm flex items-center justify-center">
                  {data.userId.firstName[0]}
                  {data.userId.lastName[0]}
                </div>
              )}

              <p className="md:text-xs text-[#4F547B]">
                {data.userId.firstName} {data.userId.lastName}
              </p>
            </div>

            <div className="flex items-center gap-1">
              <p className="md:text-xs text-[#4F547B] line-through">
                ${data.price}
              </p>
              <p className="text-lg md:text-sm medium text-[#321463]">
                ${data.price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyCourseCard
