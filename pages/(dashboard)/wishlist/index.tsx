import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import Bookmarks from "@/components/dashboard/wishList/Bookmarks";
import { fetchWishlists } from "@/services/backend.services";
import { IWishlist } from "@/utils/type.dt";
import { GetServerSidePropsContext } from "next";

const WishList: React.FC<{
  academiesData: IWishlist[];
  coursesData: IWishlist[];
}> = ({ academiesData, coursesData }) => {
  return (
    <DashboardLayout>
      <Bookmarks academiesData={academiesData} coursesData={coursesData} />
    </DashboardLayout>
  );
};

export default WishList;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = context.req.cookies.accessToken as string;

  try {
    const academies = await fetchWishlists({ productType: "Academy" }, token);
    const courses = await fetchWishlists({ productType: "Course" }, token);

    return {
      props: {
        academiesData: JSON.parse(JSON.stringify(academies)) as IWishlist[],
        coursesData: JSON.parse(JSON.stringify(courses)) as IWishlist[],
      },
    };
  } catch (e: any) {
    console.log(e);
    return {
      props: {
        academiesData: {} as IWishlist[],
        coursesData: {} as IWishlist[],
      },
    };
  }
};
