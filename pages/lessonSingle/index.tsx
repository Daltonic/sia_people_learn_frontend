import Layout from "@/components/layout/Layout";
import LessonAccordion from "@/components/lesson/LessonAccordion";
import LessonDetails from "@/components/lesson/LessonDetails";
import { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <Layout>
      <div className="flex justify-between items-start">
        {/* <LessonDetails /> */}
        <div className=" hidden md:block">
          <LessonAccordion />
        </div>
      </div>
    </Layout>
  );
};

export default Page;
