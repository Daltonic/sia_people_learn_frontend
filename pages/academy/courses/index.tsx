import Layout from "@/components/layout/Layout";
import { GetServerSidePropsContext, NextPage } from "next";
import { useEffect, useState } from "react";

import AcademyHead from "@/components/academydetail/AcademyHead";
import { _useContext } from "@/context/Context";
import { useRouter } from "next/navigation";
import { IAcademy, ICourse } from "@/utils/type.dt";
import AddRemoveCourse from "@/components/academydetail/AddRemoveCourse";
import courses from "@/pages/courses";

const Page: NextPage<{ academyData: IAcademy; coursesData: ICourse[] }> = ({
  academyData,
  coursesData,
}) => {
  const router = useRouter();
  const { user } = _useContext();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);
  const [showSlider, setShowSlider] = useState<boolean>(false);

  useEffect(() => {
    setShowSlider(true);
  }, []);

  return (
    <Layout>
      <div className="md:px-14 md:py-10 p-5 sm:px-10 md:relative overflow-x-hidden">
        <div className="flex flex-col md:flex-row justify-between ">
          <AcademyHead academy={academyData} />
        </div>
        <AddRemoveCourse courses={coursesData} academy={academyData} />
      </div>
    </Layout>
  );
};

export default Page;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { academyId, instructor } = context.query;

  const requestDetails = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/academies/${academyId}`,
      requestDetails
    );

    const academy = await response.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/courses?instructor=${instructor}`,
      requestDetails
    );

    const { courses } = await res.json();

    return {
      props: {
        academyData: JSON.parse(JSON.stringify(academy)),
        coursesData: JSON.parse(JSON.stringify(courses)),
      },
    };
  } catch (e: any) {
    console.log(e.message);
  }
};
