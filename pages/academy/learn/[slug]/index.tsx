import Layout from "@/components/layout/Layout";
import { GetServerSidePropsContext, NextPage } from "next";
import Image from "next/image";
import { IAcademy, IReviews } from "@/utils/type.dt";
import ReviewSection from "@/components/blogs/ReviewSection";
import ReviewForm from "@/components/blogs/ReviewForm";
import { fetchAcademy, fetchReviews } from "@/services/backend.services";
import CoursesAccordion from "@/components/courses/CoursesAccordion";

const Page: NextPage<{ academyData: IAcademy; reviewsData: IReviews }> = ({
  academyData,
  reviewsData,
}) => {
  return (
    <Layout>
      <div className="w-full p-5 md:p-10 md:flex justify-between items-start gap-5">
        <div className="mb-4 w-full md:w-[70%]">
          <div className="w-full">
            <Image
              height={200}
              width={200}
              src={academyData.imageUrl || "/images/general/cardimg.svg"}
              alt="Course Image"
              className="w-full md:h-[70vh] object-cover rounded-lg"
            />
          </div>

          <div className="flex justify-between md:mt-4">
            <span className="text-[#321463] text-2xl font-medium capitalize">
              {academyData.name}
            </span>

            {/* {lessonsOrder.length > 0 && (
              <Button
                className="flex justify-start items-center space-x-2"
                variant="pink"
              >
                <span>Reorder</span>
                <SlRefresh />
              </Button>
            )} */}
          </div>

          <div className="my-4">
            <h1 className="text-xl md:text-lg text-[#321463] font-medium">
              Overview
            </h1>
            <p className=" text-[#4F547B]">{academyData.overview}</p>
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: academyData.description }}
            className="mt-2 md:mt-5 text-[#4F547B]"
          />

          <ReviewSection
            reviewsData={reviewsData}
            productId={academyData._id}
            productType="Academy"
            showReviewForm={true}
          />
        </div>

        <div className="md:w-[30%] mt-4 md:mt-0">
          <CoursesAccordion academy={academyData} />
        </div>
      </div>
    </Layout>
  );
};

export default Page;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { slug } = context.query;
  const token = context.req.cookies.accessToken;

  try {
    const academy = await fetchAcademy(slug as string, token);
    const reviews = await fetchReviews(
      {
        productSlug: slug as string,
        productType: "Academy",
      },
      token
    );

    return {
      props: {
        academyData: JSON.parse(JSON.stringify(academy)),
        reviewsData: JSON.parse(JSON.stringify(reviews)),
      },
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      props: {
        academyData: {} as IAcademy,
        reviewsData: {} as IReviews,
      },
    };
  }
};
