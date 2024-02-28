import Layout from '@/components/layout/Layout'
import { GetServerSidePropsContext, NextPage } from 'next'
import Image from 'next/image'
import { ICourse, ILesson, IReviews, RootState } from '@/utils/type.dt'
import ReviewSection from '@/components/blogs/ReviewSection'
import ReviewForm from '@/components/blogs/ReviewForm'
import LessonAccordion from '@/components/lesson/LessonAccordion'
import { fetchCourse, fetchReviews } from '@/services/backend.services'
import { useState } from 'react'
import Button from '@/components/reusableComponents/Button'
import { SlRefresh } from 'react-icons/sl'
import { useSelector } from 'react-redux'

const Page: NextPage<{ courseData: ICourse; reviewsData: IReviews }> = ({
  courseData,
  reviewsData,
}) => {
  const [lessons, setLessons] = useState<ILesson[]>(courseData.lessons)
  const [lessonsOrder, setLessonsOrder] = useState<string[]>([])
  const { userData } = useSelector((states: RootState) => states.userStates)

  const onReorder = (sourceIndex: number, destinationIndex: number) => {
    const newLessons = [...courseData.lessons]
    const [removed] = newLessons.splice(sourceIndex, 1)
    newLessons.splice(destinationIndex, 0, removed)
    setLessons(newLessons)
    setLessonsOrder(newLessons.map((lesson) => lesson._id))
  }

  const handleReorder = () => {
    // TODO: Send an API call using the lessonsOrder
    // TODO: Clear lessonsOrder
    // The lessonsOrder contains the lessons IDs in the new order they should appear
  }

  return (
    <Layout>
      <div className="w-full p-5 md:p-10 md:flex justify-between items-start gap-5">
        <div className="mb-4 w-full md:w-[70%]">
          <div className="w-full">
            <Image
              height={200}
              width={200}
              src={courseData.imageUrl || '/images/general/cardimg.svg'}
              alt="Course Image"
              className="w-full md:h-[70vh] object-cover rounded-lg"
            />
          </div>

          <div className="flex justify-between md:mt-4">
            <span className="text-[#321463] text-2xl font-medium capitalize">
              {courseData.name}
            </span>

            {lessonsOrder.length > 0 && (
              <Button
                className="flex justify-start items-center space-x-2"
                variant="pink"
              >
                <span>Reorder</span>
                <SlRefresh />
              </Button>
            )}
          </div>

          <div className="my-4">
            <h1 className="text-xl md:text-lg text-[#321463] font-medium">
              Overview
            </h1>
            <p className=" text-[#4F547B]">{courseData.overview}</p>
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: courseData.description }}
            className="mt-2 md:mt-5 text-[#4F547B]"
          />

          <ReviewForm productId={courseData._id} productType="Course" />
          <ReviewSection reviewsData={reviewsData} />
        </div>

        <div className="md:w-[30%] mt-4 md:mt-0">
          {courseData.userId._id == userData?._id ? (
            <LessonAccordion
              course={courseData}
              lessons={lessons}
              onReorder={onReorder}
            />
          ) : (
            <LessonAccordion course={courseData} lessons={lessons} />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Page

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query
  const token = context.req.cookies.accessToken

  try {
    const course = await fetchCourse(id as string, token)
    const reviews = await fetchReviews(
      {
        productId: id as string,
        productType: 'Course',
      },
      token
    )

    return {
      props: {
        courseData: JSON.parse(JSON.stringify(course)),
        reviewsData: JSON.parse(JSON.stringify(reviews)),
      },
    }
  } catch (e: any) {
    console.log(e.message)
    return {
      props: {
        courseData: {} as ICourse,
        reviewsData: {} as IReviews,
      },
    }
  }
}
