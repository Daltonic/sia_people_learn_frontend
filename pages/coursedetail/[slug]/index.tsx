import CourseHead from '@/components/coursedetail/CourseHead'
import Tabs from '@/components/coursedetail/Tabs'
import Layout from '@/components/layout/Layout'
import { GetServerSidePropsContext, NextPage } from 'next'
import { Navigation, Pagination, Autoplay } from 'swiper'
import { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { SwiperSlide, Swiper } from 'swiper/react'
import { ICourse, ICourses, IReviews } from '@/utils/type.dt'
import CourseCardDetail from '@/components/coursedetail/CourseCardDetail'
import {
  fetchCourse,
  fetchCourses,
  fetchReviews,
} from '@/services/backend.services'
import ReviewSection from '@/components/blogs/ReviewSection'
import Head from 'next/head'
import MyCourseCard from '@/components/dashboard/myProducts/MyCourseCard'

const Page: NextPage<{
  courseData: ICourse
  alternateCourses: ICourse[]
  reviewsData: IReviews
}> = ({ courseData, alternateCourses, reviewsData }) => {
  const [showSlider, setShowSlider] = useState<boolean>(false)

  useEffect(() => {
    setShowSlider(true)
  }, [])

  return (
    <>
      {courseData && (
        <Head>
          <title>{courseData.name} | PeopleLearn</title>
          <meta
            name="description"
            content={`View details for ${courseData.name}, a course on PeopleLearn. Explore course information here.`}
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content={`https://peoplelearn.io/coursedetail/${courseData.slug}`}
          />
          <meta
            property="og:title"
            content={`${courseData.name} PeopleLearn`}
          />
          <meta
            property="og:description"
            content={`View details for ${courseData.name}, a course on PeopleLearn. Explore course information here.`}
          />
          <meta property="og:image" content={courseData.imageUrl ?? ''} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@peoplelearn" />
          <meta
            name="twitter:title"
            content={`${courseData.name} PeopleLearn`}
          />
          <meta
            name="twitter:description"
            content={`View details for ${courseData.name}, a course on PeopleLearn. Explore course information here.`}
          />
          <meta name="twitter:image" content={courseData.imageUrl ?? ''} />
        </Head>
      )}

      <Layout>
        <div className="md:px-14 md:py-10 p-5 sm:px-10 md:relative overflow-x-hidden">
          <div className="flex flex-col md:flex-row justify-between ">
            <CourseHead course={courseData} />
            <CourseCardDetail course={courseData} />
          </div>
          <Tabs data={courseData} type="Course" course={courseData} />
          <div className="mt-8 relative">
            <div className="mb-5">
              <h4 className="text-2xl md:text-xl text-[#321463] font-bold">
                You May Like
              </h4>
              <p className="md:text-sm text-[#4F547B]">
                10,000+ unique online course list designs
              </p>
            </div>
            <div
              className="overflow-hidden"
              data-aos="fade-left"
              data-aos-offset="80"
              data-aos-duration={800}
            >
              <div className="p-0 md:px-14">
                {showSlider && (
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={{
                      nextEl: '.icon-arrow-right',
                      prevEl: '.icon-arrow-left',
                    }}
                    spaceBetween={20}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    breakpoints={{
                      450: {
                        slidesPerView: 2,
                      },
                      758: {
                        slidesPerView: 2,
                      },
                      1200: {
                        slidesPerView: 4,
                      },
                    }}
                  >
                    {alternateCourses.map((elm, i: number) => (
                      <SwiperSlide key={i}>
                        <MyCourseCard data={elm} type="Course" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>
            </div>

            <div className="hidden md:flex">
              {/* Left button */}
              <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#1A064F] text-white w-10 h-10 p-2 flex justify-center items-center rounded-full z-10">
                <FaArrowLeft className="icon-arrow-left " />
              </button>

              {/* Right button */}
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#1A064F] text-white w-10 h-10 p-2 flex justify-center items-center rounded-full z-10">
                <FaArrowRight className="icon-arrow-right" />
              </button>
            </div>
          </div>
          <ReviewSection reviewsData={reviewsData} />
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
    const course = (await fetchCourse(slug as string, token)) as ICourse

    const courses = (await fetchCourses({})) as ICourses
    const alternateCourses = courses.courses.filter(
      (course) => course.slug !== slug
    )

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
        alternateCourses,
        reviewsData: reviews,
      },
    }
  } catch (e: any) {
    console.log(e.message)
    return {
      props: {
        courseData: {},
        alternateCourses: [],
        reviewsData: {},
      },
    }
  }
}
