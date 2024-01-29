import Layout from "@/components/layout/Layout";
import { GetServerSidePropsContext, NextPage } from "next";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/userSlice";
import { RootState } from "@/utils/type.dt";
import { IAcademy, ICourse } from "@/utils/type.dt";
import AddRemoveCourse from "@/components/academydetail/AddRemoveCourse";

const Page: NextPage<{ academyData: IAcademy; coursesData: ICourse[] }> = ({
  academyData,
  coursesData,
}) => {
  const dispatch = useDispatch();
  const { setUserData } = userActions;
  const { userData } = useSelector((states: RootState) => states.userStates);

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
      if (sessionUser) {
        dispatch(setUserData(sessionUser));
      }
    }
  }, [dispatch, setUserData, userData]);
  const [showSlider, setShowSlider] = useState<boolean>(false);

  useEffect(() => {
    setShowSlider(true);
  }, []);

  return (
    <Layout>
      <AddRemoveCourse courses={coursesData} academy={academyData} />
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
