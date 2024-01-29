import BlogForm from "@/components/blogs/BlogForm";
import DashboardHeading from "@/components/dashboard/dashboardLayout/DashboardHeading";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <DashboardLayout>
     <DashboardHeading title="Create Blog" description="Provide your Blog Details" />
      <BlogForm type="create" />
    </DashboardLayout>
  );
};

export default Page;
