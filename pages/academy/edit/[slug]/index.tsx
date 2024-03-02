import AcademyForm from "@/components/academydetail/AcademyForm";
import EditAcademyHeader from "@/components/academydetail/EditAcademyHeader";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import PendingReviews from "@/components/dashboard/myProducts/PendingReviews";
import { fetchAcademy, fetchReviews } from "@/services/backend.services";
import { IAcademy, IReviews } from "@/utils/type.dt";
import { GetServerSidePropsContext, NextPage } from "next";

const Page: NextPage<{ academyData: IAcademy; reviewsData: IReviews }> = ({
  academyData,
  reviewsData,
}) => {
  return (
    <DashboardLayout>
      <EditAcademyHeader
        headerHead="Edit Your Academy"
        headerBody="Start modifying your Academy"
      />
      <AcademyForm academy={academyData} type="update" />
      <PendingReviews reviewsData={reviewsData} />
    </DashboardLayout>
  );
};

export default Page;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { slug } = context.query;
  const token = context.req.cookies.accessToken;

  try {
    const academy = await fetchAcademy(slug as string, token);
    const reviews = await fetchReviews(
      {
        productSlug: slug as string,
        productType: "Academy",
        approved: "false",
      },
      token
    );

    return {
      props: {
        academyData: JSON.parse(JSON.stringify(academy)) as IAcademy,
        reviewsData: JSON.parse(JSON.stringify(reviews)) as IReviews,
      },
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      props: {
        academyData: {} as IAcademy,
        reviewsData: {} as IReviews,
      },
    };
  }
};
