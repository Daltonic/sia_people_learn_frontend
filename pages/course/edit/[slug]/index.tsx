import CourseForm from "@/components/dashboard/courses/CourseForm";
import DashboardHeading from "@/components/dashboard/dashboardLayout/DashboardHeading";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import PendingReviews from "@/components/dashboard/myProducts/PendingReviews";
import { fetchCourse, fetchReviews } from "@/services/backend.services";
import { ICourse, IReviews } from "@/utils/type.dt";
import { GetServerSidePropsContext, NextPage } from "next";

const Page: NextPage<{ courseData: ICourse; reviewsData: IReviews }> = ({
  courseData,
  reviewsData,
}) => {
  return (
    <DashboardLayout>
      <DashboardHeading
        title="Edit Product"
        description="Update your products info."
      />
      <CourseForm course={courseData} type="update" />
      <PendingReviews reviewsData={reviewsData} />
    </DashboardLayout>
  );
};

export default Page;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { slug } = context.query;
  const token = context.req.cookies.accessToken;

  try {
    const course = await fetchCourse(slug as string, token);
    const reviews = await fetchReviews(
      {
        productSlug: slug as string,
        productType: "Course",
        approved: "false",
      },
      token
    );
    console.log(reviews);

    return {
      props: {
        courseData: JSON.parse(JSON.stringify(course)) as ICourse,
        reviewsData: JSON.parse(JSON.stringify(reviews)) as IReviews,
      },
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      props: {
        courseData: {} as ICourse,
        reviewsData: {} as IReviews,
      },
    };
  }
};
