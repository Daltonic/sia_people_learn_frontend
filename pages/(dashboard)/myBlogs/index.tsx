import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import Blogs from "@/components/dashboard/myBlogs/Blogs";
import { _useContext } from "@/context/Context";

const Page: React.FC = () => {
  return (
    <DashboardLayout>
      <Blogs />
    </DashboardLayout>
  );
};

export default Page;
