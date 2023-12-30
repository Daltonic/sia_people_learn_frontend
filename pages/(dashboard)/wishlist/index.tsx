import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import Bookmarks from "@/components/dashboard/wishList/Bookmarks";

const WishList: React.FC = () => {
 return (
   <DashboardLayout>
     <Bookmarks />
   </DashboardLayout>
 );
};

export default WishList;
