import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import Blogs from "@/components/dashboard/myBlogs/Blogs";
import { _useContext } from "@/context/Context";

const Page: React.FC = () => {
  const { user } = _useContext();
  if (!user) return;
  return (
    <DashboardLayout>
      <Blogs />
    </DashboardLayout>
  );
};

export default Page;
