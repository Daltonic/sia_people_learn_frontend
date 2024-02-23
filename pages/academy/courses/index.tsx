import Layout from "@/components/layout/Layout";
import { GetServerSidePropsContext, NextPage } from "next";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/slices/userSlice";
import { RootState } from "@/utils/type.dt";
import { IAcademy, ICourse } from "@/utils/type.dt";
import AddRemoveCourse from "@/components/academydetail/AddRemoveCourse";
import { fetchAcademy, fetchCourses } from "@/services/backend.services";

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
  const { academyId } = context.query;
  const token = context.req.cookies.accessToken;

  try {
    const academy = await fetchAcademy(academyId as string, token);

    const { courses } = await fetchCourses({ instructor: "true" }, token);
    return {
      props: {
        academyData: JSON.parse(JSON.stringify(academy)),
        coursesData: JSON.parse(JSON.stringify(courses)),
      },
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      props: {
        academyData: {},
        coursesData: {},
      },
    };
  }
};
