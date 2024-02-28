import CourseHead from "@/components/coursedetail/CourseHead";
import Tabs from "@/components/coursedetail/Tabs";
import CourseCard from "@/components/courses/CourseCard";
import Layout from "@/components/layout/Layout";
import { GetServerSidePropsContext, NextPage } from "next";
import { Navigation, Pagination, Autoplay } from "swiper";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { SwiperSlide, Swiper } from "swiper/react";
import { ICourse, ICourses } from "@/utils/type.dt";
import CourseCardDetail from "@/components/coursedetail/CourseCardDetail";
import { fetchCourse, fetchCourses } from "@/services/backend.services";

const Page: NextPage<{ courseData: ICourse; alternateCourses: ICourse[] }> = ({
  courseData,
  alternateCourses,
}) => {
  const [showSlider, setShowSlider] = useState<boolean>(false);

  useEffect(() => {
    setShowSlider(true);
  }, []);

  return (
    <Layout>
      <div className="md:px-14 md:py-10 p-5 sm:px-10 md:relative overflow-x-hidden">
        <div className="flex flex-col md:flex-row justify-between ">
          <CourseHead course={courseData} />
          <CourseCardDetail course={courseData} />
        </div>
        <Tabs data={courseData} type="Course" course={courseData} />
        <div className="md:mt-36 relative">
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
                    nextEl: ".icon-arrow-right",
                    prevEl: ".icon-arrow-left",
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
                      <CourseCard data={elm} index={i} />
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
      </div>
    </Layout>
  );
};

export default Page;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { name } = context.query;
  const token = context.req.cookies.accessToken;

  try {
    const course = (await fetchCourse(name as string, token)) as ICourse;

    const courses = (await fetchCourses({})) as ICourses;
    const alternateCourses = courses.courses.filter(
      (course) => course.name !== name
    );

    return {
      props: {
        courseData: JSON.parse(JSON.stringify(course)),
        alternateCourses,
      },
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      props: {
        courseData: {},
        alternateCourses: [],
      },
    };
  }
};
