import PageHeader from "@/components/reusableComponents/PageHeader";
import CourseLayer from "@/components/courses/CourseLayer";
import Filterlayer from "@/components/courses/Filterlayer";
import Layout from "@/components/layout/Layout";
import { GetServerSidePropsContext, NextPage } from "next";
import { ICourses } from "@/utils/type.dt";
import Pagination from "@/components/reusableComponents/Pagination";

const sortOptions = [
  { name: "Newest", value: "newest" },
  { name: "Oldest", value: "oldest" },
];

const filterOptions = [
  { name: "Beginner", value: "Beginner" },
  { name: "Intermediate", value: "Intermediate" },
  { name: "Advanced", value: "Advanced" },
];

const Page: NextPage<{ coursesObj: ICourses }> = ({ coursesObj }) => {
  return (
    <Layout>
      <div className="flex justify-center">
        <div className="flex flex-col w-[90%] mt-5 md:mt-10">
          <div>
            <PageHeader> Trending courses</PageHeader>
            <p className="text-slate-600 text-sm md:text-lg capitalize w-full mt-1">
              Explore our trending courses in Blockchain and We3 Development.
            </p>
          </div>
          <Filterlayer
            searchPlaceholder="Search Courses Here..."
            route="/courses"
            filterLabel="Filter by Difficulty:"
            filterOptions={filterOptions}
            sortLabel="Sort by Date"
            sortOptions={sortOptions}
          />
          <CourseLayer data={coursesObj} />
          <Pagination totalPages={coursesObj.numOfPages} />
        </div>
      </div>
    </Layout>
  );
};

export default Page;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const requestDetails = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const searchQuery = context.query.q || "";
  const page = context.query.page;
  const filter = context.query.filter || "newest";
  const difficulty = context.query.difficulty;

  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URI
      }/api/v1/courses?type=Course&searchQuery=${searchQuery}&page=${Number(
        page
      )}&filter=${filter}${difficulty ? `&difficulty=${difficulty}` : ""}`,
      requestDetails
    );

    const courses = await response.json();

    return {
      props: {
        coursesObj: JSON.parse(JSON.stringify(courses)),
      },
    };
  } catch (e: any) {
    console.log(e.message);
  }
};
