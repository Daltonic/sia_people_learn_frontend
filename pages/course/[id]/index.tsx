import Tabs from "@/components/coursedetail/Tabs";
import Layout from "@/components/layout/Layout";
import { GetServerSidePropsContext, NextPage } from "next";
import { useEffect, useState } from "react";
import { ICourse } from "@/utils/type.dt";
import InstructorCourseHead from "@/components/coursedetail/InstructorCourseHead";
import Image from "next/image";

const Page: NextPage<{ courseData: ICourse }> = ({ courseData }) => {
  const [showSlider, setShowSlider] = useState<boolean>(false);

  useEffect(() => {
    setShowSlider(true);
  }, []);

  console.log(courseData);

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
