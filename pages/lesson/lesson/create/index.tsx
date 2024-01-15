import LessonForm from "@/components/coursedetail/lesson/LessonForm";
import LessonHeader from "@/components/coursedetail/lesson/LessonHeader";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";

import { GetServerSidePropsContext, NextPage } from "next";

const Page: NextPage<{ courseId: string }> = ({ courseId }) => {
  return (
    <DashboardLayout>
      <LessonHeader
        headerHead="Create Lesson"
        headerBody="Create lesson for your Course"
      />
      <LessonForm courseId={courseId} type="create" />
    </DashboardLayout>
  );
};

export default Page;

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { courseId } = context.query;
  return {
    props: {
      courseId,
    },
  };
};
