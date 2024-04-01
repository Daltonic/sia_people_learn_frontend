import MyCourses from "@/components/dashboard/courses/MyCourses";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import { fetchUserSubscriptions } from "@/services/backend.services";
import { IUserSubscriptions } from "@/utils/type.dt";
import { GetServerSidePropsContext } from "next";

const Page: React.FC<{
  academiesSubData: IUserSubscriptions;
  coursesSubData: IUserSubscriptions;
}> = ({ academiesSubData, coursesSubData }) => {
  return (
    <DashboardLayout>
      <MyCourses
        academiesSubObj={academiesSubData}
        coursesSubObj={coursesSubData}
      />
    </DashboardLayout>
  );
};

export default Page;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = context.req.cookies.accessToken;

  try {
    const subscribedCourses = (await fetchUserSubscriptions(
      { productType: "Course" },
      token as string
    )) as IUserSubscriptions;

    const subscribedAcademies = await fetchUserSubscriptions(
      { productType: "Academy" },
      token as string
    );

    return {
      props: {
        academiesSubData: JSON.parse(
          JSON.stringify(subscribedAcademies)
        ) as IUserSubscriptions,
        coursesSubData: JSON.parse(
          JSON.stringify(subscribedCourses)
        ) as IUserSubscriptions,
      },
    };
  } catch (e: any) {
    console.log(e);
    return {
      props: {
        academiesSubData: {} as IUserSubscriptions,
        coursesSubData: {} as IUserSubscriptions,
      },
    };
  }
};
