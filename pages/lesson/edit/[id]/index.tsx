import CourseForm from "@/components/coursedetail/CourseForm";
import EditCourseHeader from "@/components/coursedetail/EditCourseHeader";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import { ICourse } from "@/utils/type.dt";
import { GetServerSidePropsContext, NextPage } from "next";

const Page: NextPage<{ courseData: ICourse }> = ({ courseData }) => {
  return (
    <DashboardLayout>
      <EditCourseHeader
        headerHead="Edit Your Academy"
        headerBody="Start modifying your Academy"
      />
      <CourseForm course={courseData} />
    </DashboardLayout>
  );
};

export default Page;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;

  const requestDetails = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/courses/${id}`,
      requestDetails
    );

    const course = await response.json();

    return {
      props: {
        courseData: JSON.parse(JSON.stringify(course)),
      },
    };
  } catch (e: any) {
    console.log(e.message);
  }
};
