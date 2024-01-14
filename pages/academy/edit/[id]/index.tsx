import AcademyForm from "@/components/academydetail/AcademyForm";
import EditAcademyHeader from "@/components/academydetail/EditAcademyHeader";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import { IAcademy } from "@/utils/type.dt";
import { GetServerSidePropsContext, NextPage } from "next";

const Page: NextPage<{ academyData: IAcademy }> = ({ academyData }) => {
  return (
    <DashboardLayout>
      <EditAcademyHeader
        headerHead="Edit Your Academy"
        headerBody="Start modifying your Academy"
      />
      <AcademyForm academy={academyData} />
    </DashboardLayout>
  );
};

export default Page;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;

  const requestDetails = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/academies/${id}`,
      requestDetails
    );

    const academy = await response.json();

    return {
      props: {
        academyData: JSON.parse(JSON.stringify(academy)),
      },
    };
  } catch (e: any) {
    console.log(e.message);
  }
};
