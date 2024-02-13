import PageHeader from "@/components/reusableComponents/PageHeader";
import CourseLayer from "@/components/courses/CourseLayer";
import Filterlayer from "@/components/courses/Filterlayer";
import Layout from "@/components/layout/Layout";
import { GetServerSidePropsContext, NextPage } from "next";
import { FetchProductsParams, ICourses } from "@/utils/type.dt";
import Pagination from "@/components/reusableComponents/Pagination";
import { fetchCourses } from "@/services/backend.services";

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
            filterLabel="Difficulty"
            filterOptions={filterOptions}
            sortLabel="Order By"
            sortOptions={sortOptions}
          />
          <CourseLayer data={coursesObj} />
          {coursesObj.numOfPages > 1 && (
            <Pagination totalPages={coursesObj.numOfPages} />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Page;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const searchQuery = context.query.q || "";
  const page = context.query.page;
  const filter = context.query.filter || "newest";
  const difficulty = context.query.difficulty;

  try {
    const courses = await fetchCourses({
      searchQuery: searchQuery as string,
      page: Number(page),
      filter: filter as FetchProductsParams["filter"],
      difficulty: difficulty as FetchProductsParams["difficulty"],
      type: "Course",
    });

    return {
      props: {
        coursesObj: JSON.parse(JSON.stringify(courses)),
      },
    };
  } catch (e: any) {
    console.log(e.message);
  }
};
