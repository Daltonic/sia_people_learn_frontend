import Layout from '@/components/layout/Layout'
import { GetServerSidePropsContext, NextPage } from 'next'
import Image from 'next/image'
import { ICourse, IReviews, RootState } from '@/utils/type.dt'
import ReviewSection from '@/components/blogs/ReviewSection'
import LessonAccordion from '@/components/lesson/LessonAccordion'
import { fetchCourse, fetchReviews } from '@/services/backend.services'
import Button from '@/components/reusableComponents/Button'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import Head from 'next/head'

const Page: NextPage<{ courseData: ICourse; reviewsData: IReviews }> = ({
  courseData,
  reviewsData,
}) => {
  const { userData } = useSelector((states: RootState) => states.userStates)
  const router = useRouter()
  const searchParams = useSearchParams()

  const subscriptionId = searchParams.get('sub') as string

  return (
    <>
      {courseData && (
        <Head>
          <title>{courseData.name} | PeopleLearn</title>
          <meta
            name="description"
            content={`Explore ${courseData.name}, a course on PeopleLearn offering ${courseData.lessons.length} lessons.`}
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content={`https://peoplelearn.io/course/learn/${courseData.slug}`}
          />
          <meta
            property="og:title"
            content={`${courseData.name} | PeopleLearn`}
          />
          <meta
            property="og:description"
            content={`Explore ${courseData.name}, a course on PeopleLearn offering ${courseData.lessons.length} lessons.`}
          />
          <meta property="og:image" content={courseData.imageUrl ?? ''} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@peoplelearn" />
          <meta
            name="twitter:title"
            content={`${courseData.name} | PeopleLearn`}
          />
          <meta
            name="twitter:description"
            content={`Explore ${courseData.name}, a course on PeopleLearn offering ${courseData.lessons.length} lessons.`}
          />
          <meta name="twitter:image" content={courseData.imageUrl ?? ''} />
        </Head>
      )}
      <Layout>
        <div className="w-full p-5 md:p-10 md:flex justify-between items-start gap-5">
          <div className="mb-4 w-full md:w-[70%]">
            <div className="w-full">
              <Image
                height={500}
                width={1000}
                src={courseData.imageUrl || '/images/general/cardimg.svg'}
                alt={courseData.name}
                className="w-full md:h-[55vh] object-cover rounded-lg"
              />
            </div>

            <div className="flex flex-wrap justify-between md:mt-4">
              <span className="text-[#321463] text-2xl font-medium capitalize">
                {courseData.name}
              </span>

              {courseData.userId._id === userData?._id && (
                <Button
                  variant="pink"
                  className="flex justify-start items-center space-x-2"
                  onClick={() =>
                    router.push({
                      pathname: `/(dashboard)/products/courses/edit/${String(courseData._id)}`,
                    })
                  }
                >
                  <span>Edit</span>
                  <MdOutlineModeEditOutline />
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

            <div className="sm:hidden flex my-4">
              <LessonAccordion
                course={courseData}
                lessons={courseData.lessons}
                subscriptionId={subscriptionId}
              />
            </div>

            <ReviewSection
              reviewsData={reviewsData}
              showReviewForm={true}
              productId={courseData._id}
              productType="Course"
            />
          </div>

          <div className="hidden sm:flex md:w-[30%] my-4 md:mt-0">
            <LessonAccordion
              course={courseData}
              lessons={courseData.lessons}
              subscriptionId={subscriptionId}
            />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Page

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { slug } = context.query
  const token = context.req.cookies.accessToken

  try {
    const course = await fetchCourse(slug as string, token)
    const reviews = await fetchReviews(
      {
        productSlug: slug as string,
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
