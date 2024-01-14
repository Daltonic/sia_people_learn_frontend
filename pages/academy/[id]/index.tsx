import Tabs from "@/components/coursedetail/Tabs";
import CourseCard from "@/components/home/CoursesSlider/CourseCard";
import Layout from "@/components/layout/Layout";
import { coursesData } from "../../../data/courses";
import { GetServerSidePropsContext, NextPage } from "next";
import { Navigation, Pagination } from "swiper";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { SwiperSlide, Swiper } from "swiper/react";
import { IAcademy } from "@/utils/type.dt";

import AcademyHead from "@/components/academydetail/AcademyHead";
import AcademyDetails from "@/components/academydetail/AcademyDetails";
import { _useContext } from "@/context/Context";
import { useRouter } from "next/navigation";

const Page: NextPage<{ academyData: IAcademy }> = ({ academyData }) => {
  const router = useRouter();
  const { user } = _useContext();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);
  const [showSlider, setShowSlider] = useState<boolean>(false);

  useEffect(() => {
    setShowSlider(true);
  }, []);

  return (
    <Layout>
      <div className="md:px-14 md:py-10 p-5 sm:px-10 md:relative overflow-x-hidden">
        <div className="flex flex-col md:flex-row justify-between ">
          <AcademyHead academy={academyData} />
          <AcademyDetails academy={academyData} />
        </div>
        <Tabs />
        <div className="mt-14 relative">
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
                  modules={[Navigation, Pagination]}
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
                  {coursesData.slice(0, 12).map((elm, i: number) => (
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
  const { id } = context.query;
  console.log(id);

  const requestDetails = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/academies/${id}`,
      requestDetails
    );

    const academy = await response.json();

    return {
      props: {
        academyData: JSON.parse(JSON.stringify(academy)),
      },
    };
  } catch (e: any) {
    console.log(e.message);
  }
};
