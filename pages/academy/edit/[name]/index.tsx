import AcademyForm from "@/components/academydetail/AcademyForm";
import EditAcademyHeader from "@/components/academydetail/EditAcademyHeader";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import { fetchAcademy } from "@/services/backend.services";
import { IAcademy } from "@/utils/type.dt";
import { GetServerSidePropsContext, NextPage } from "next";

const Page: NextPage<{ academyData: IAcademy }> = ({ academyData }) => {
  return (
    <DashboardLayout>
      <EditAcademyHeader
        headerHead="Edit Your Academy"
        headerBody="Start modifying your Academy"
      />
      <AcademyForm academy={academyData} type="update" />
    </DashboardLayout>
  );
};

export default Page;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { name } = context.query;
  const token = context.req.cookies.accessToken;

  try {
    const academy = await fetchAcademy(name as string, token);

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
