import Layout from "@/components/layout/Layout";
import { GetServerSidePropsContext, NextPage } from "next";
import Image from "next/image";
import { ICourse, IReviews } from "@/utils/type.dt";
import ReviewSection from "@/components/blogs/ReviewSection";
import ReviewForm from "@/components/blogs/ReviewForm";
import LessonAccordion from "@/components/lesson/LessonAccordion";
import { fetchCourse, fetchReviews } from "@/services/backend.services";

const Page: NextPage<{ courseData: ICourse; reviews: IReviews }> = ({
  courseData,
  reviews,
}) => {
  return (
    <Layout>
      <div className="w-full p-5 md:p-10">
        <div className="md:flex justify-between items-start w-full gap-5">
          <div className="w-full md:w-[70%]">
            <Image
              height={100}
              width={100}
              src={courseData.imageUrl || "/images/courseCard/card3.svg"}
              alt="Course Image"
              className="w-full md:h-[70vh] object-cover rounded-lg"
            />
          </div>
          <div className="md:w-[30%] mt-4 md:mt-0">
            <LessonAccordion course={courseData} />
          </div>
        </div>
        <ReviewSection reviewsData={reviews} />
        <ReviewForm productId={courseData._id} productType="Course" />
      </div>
    </Layout>
  );
};

export default Page;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;

  try {
    const course = await fetchCourse(id as string);
    const reviews = await fetchReviews({
      productId: id as string,
      productType: "Course",
    });

    return {
      props: {
        courseData: JSON.parse(JSON.stringify(course)),
        reviewsData: JSON.parse(JSON.stringify(reviews)),
      },
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      props: {
        courseData: {},
        reviewsData: {},
      },
    };
  }
};
