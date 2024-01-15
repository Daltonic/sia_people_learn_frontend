import Layout from "@/components/layout/Layout";
import { GetServerSidePropsContext, NextPage } from "next";
import { ICourse } from "@/utils/type.dt";
import LessonDetails from "@/components/lesson/LessonDetails";

const Page: NextPage<{ courseData: ICourse }> = ({ courseData }) => {

  return (
    <Layout>
      <div className="md:px-14 md:py-10 p-5 sm:px-10 md:relative overflow-x-hidden">
        <LessonDetails lesson={courseData} />
     
      </div>
    </Layout>
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

    if (response.status === 400) {
      alert(await response.text());
    }

    const course = await response.json();
    console.log(course);

    return {
      props: {
        courseData: JSON.parse(JSON.stringify(course)),
      },
    };
  } catch (e: any) {
    console.log(e.message);
  }
};
