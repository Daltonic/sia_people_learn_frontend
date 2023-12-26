import Layout from "@/components/layout/Layout";
import LessonDetails from "@/components/lesson/LessonDetails";
import { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <Layout>
      <div>
        <LessonDetails  />
      </div>
    </Layout>
  );
};

export default Page;
