import PageHeader from "@/components/reusableComponents/PageHeader";
import Filterlayer from "@/components/courses/Filterlayer";
import Layout from "@/components/layout/Layout";
import { GetServerSidePropsContext, NextPage } from "next";
import { FetchProductsParams, IAcademies } from "@/utils/type.dt";
import AcademyLayer from "@/components/academies/AcademyLayer";
import Pagination from "@/components/reusableComponents/Pagination";
import { fetchAcademies } from "@/services/backend.services";

const sortOptions = [
  { name: "Newest", value: "newest" },
  { name: "Oldest", value: "oldest" },
];

const filterOptions = [
  { name: "Beginner", value: "Beginner" },
  { name: "Intermediate", value: "Intermediate" },
  { name: "Advanced", value: "Advanced" },
];

const Page: NextPage<{ academiesObj: IAcademies }> = ({ academiesObj }) => {
  return (
    <Layout>
      <div className="flex justify-center">
        <div className="flex flex-col w-[90%] mt-5 md:mt-10">
          <div>
            <PageHeader> Trending Academies</PageHeader>
            <p className="text-slate-600 text-sm md:text-lg capitalize w-full mt-1">
              Explore our trending Academies in Blockchain and We3 Development.
            </p>
          </div>
          <Filterlayer
            searchPlaceholder="Search Academies Here..."
            route="/academies"
            filterLabel="Difficulty"
            filterOptions={filterOptions}
            sortLabel="Order By"
            sortOptions={sortOptions}
          />
          <AcademyLayer data={academiesObj} />
          {academiesObj.numOfPages > 1 && (
            <Pagination totalPages={academiesObj.numOfPages} />
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
    const academies = await fetchAcademies({
      searchQuery: searchQuery as string,
      page: Number(page),
      filter: filter as FetchProductsParams["filter"],
      difficulty: difficulty as FetchProductsParams["difficulty"],
    });

    return {
      props: {
        academiesObj: JSON.parse(JSON.stringify(academies)),
      },
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      props: {
        academiesObj: {},
      },
    };
  }
};
