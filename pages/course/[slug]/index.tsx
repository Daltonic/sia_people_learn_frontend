import Tabs from "@/components/coursedetail/Tabs";
import Layout from "@/components/layout/Layout";
import { GetServerSidePropsContext, NextPage } from "next";
import { ICourse } from "@/utils/type.dt";
import InstructorCourseHead from "@/components/coursedetail/InstructorCourseHead";
import { fetchCourse } from "@/services/backend.services";

const Page: NextPage<{ courseData: ICourse }> = ({ courseData }) => {
  return (
    <Layout>
      <div className="md:px-14 md:py-10 p-5 sm:px-10 md:relative overflow-x-hidden">
        <InstructorCourseHead course={courseData} />
        <Tabs type="lesson" data={courseData} course={courseData} />
      </div>
    </Layout>
  );
};

export default Page;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { slug } = context.query;

  try {
    const course = await fetchCourse(slug as string);

    return {
      props: {
        courseData: JSON.parse(JSON.stringify(course)),
      },
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      props: {
        courseData: {},
      },
    };
  }
};
