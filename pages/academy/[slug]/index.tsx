import Layout from "@/components/layout/Layout";
import { GetServerSidePropsContext, NextPage } from "next";
import { useEffect, useState } from "react";

import AcademyHead from "@/components/academydetail/AcademyHead";
import { useRouter } from "next/navigation";
import Tabs from "@/components/academydetail/Tabs";
import { IAcademy } from "@/utils/type.dt";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/utils/type.dt";
import { userActions } from "@/store/slices/userSlice";
import { fetchAcademy } from "@/services/backend.services";

const Page: NextPage<{ academyData: IAcademy }> = ({ academyData }) => {
  const router = useRouter();
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
      <div className="md:px-14 md:py-10 p-5 sm:px-10 md:relative overflow-x-hidden">
        <div className="flex flex-col md:flex-row justify-between ">
          <AcademyHead academy={academyData} />
        </div>
        <Tabs data={academyData} type="Academy" academy={academyData} />
      </div>
    </Layout>
  );
};

export default Page;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;

  try {
    const academy = await fetchAcademy(id as string);

    return {
      props: {
        academyData: JSON.parse(JSON.stringify(academy)),
      },
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      props: {
        academyData: {},
      },
    };
  }
};
