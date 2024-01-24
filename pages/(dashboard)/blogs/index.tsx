import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import Blogs from "@/components/dashboard/blogs/Blogs";

const Page: React.FC = () => {
  return (
    <DashboardLayout>
      <Blogs />
    </DashboardLayout>
  );
};

export default Page;
