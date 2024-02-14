"use client";

import LessonForm from "@/components/coursedetail/lesson/LessonForm";
import LessonHeader from "@/components/coursedetail/lesson/LessonHeader";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import { GetServerSidePropsContext, NextPage } from "next";
import { ILesson } from "@/utils/type.dt";
import { fetchLesson } from "@/services/backend.services";

const Page: NextPage<{ lessonData: ILesson }> = ({ lessonData }) => {
  return (
    <DashboardLayout>
      {lessonData && (
        <>
          <LessonHeader
            headerHead="Edit Lesson"
            headerBody="Edit lesson for your Course"
          />
          <LessonForm
            courseId={lessonData.courseId}
            lesson={lessonData}
            type="edit"
          />
        </>
      )}
    </DashboardLayout>
  );
};

export default Page;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;

  const token = context.req.cookies.accessToken;

  try {
    const lesson = await fetchLesson(id as string, token);

    return {
      props: {
        lessonData: JSON.parse(JSON.stringify(lesson)),
      },
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      props: {
        lessonData: {},
      },
    };
  }
};
