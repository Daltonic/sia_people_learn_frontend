import Layout from "@/components/layout/Layout";
import { NextPage } from "next";
import Image from "next/image";
import { ICourse } from "@/utils/type.dt";
import ReviewSection from "@/components/blogs/ReviewSection";
import ReviewForm from "@/components/blogs/ReviewForm";
import LessonAccordion from "@/components/lesson/LessonAccordion";

const Page: NextPage<{ courseData: ICourse }> = ({ courseData }) => {
  return (
    <Layout>
      <div className="w-full p-5 md:p-10">
        <div className="md:flex justify-between items-start w-full gap-5">
          <div className="w-full md:w-[70%]">
            <Image
              height={100}
              width={100}
              src={
                // courseData.imageUrl  ||
                "/images/courseCard/card3.svg"
              }
              alt="Course Image"
              className="w-full md:h-[70vh] object-cover rounded-lg"
            />
          </div>
          <div className="md:w-[30%] mt-4 md:mt-0">
            {/* <LessonAccordion /> */}
          </div>
        </div>
        <ReviewSection />
        <ReviewForm />
      </div>
    </Layout>
  );
};

export default Page;
