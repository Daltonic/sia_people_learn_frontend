import PageHeader from "@/components/reusableComponents/PageHeader";
import CourseLayer from "@/components/courses/CourseLayer";
import Filterlayer from "@/components/courses/Filterlayer";
import Layout from "@/components/layout/Layout";
import { NextPage } from "next";
import { IAcademies } from "@/utils/type.dt";
import AcademyLayer from "@/components/academies/AcademyLayer";

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
          <Filterlayer />
          <AcademyLayer data={academiesObj} />
        </div>
      </div>
    </Layout>
  );
};

export default Page;

export const getServerSideProps = async () => {
  const requestDetails = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/academies`,
      requestDetails
    );

    const academies = await response.json();

    return {
      props: {
        academiesObj: JSON.parse(JSON.stringify(academies)),
      },
    };
  } catch (e: any) {
    console.log(e.message);
  }
};
