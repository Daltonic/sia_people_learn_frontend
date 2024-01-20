import BlogForm from "@/components/blogs/BlogForm";
import BlogHeader from "@/components/blogs/BlogHeader";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <DashboardLayout>
      <BlogHeader
        headerHead="Create Blog"
        headerBody="Provide your Blog Details"
      />
      <BlogForm type="create" />
    </DashboardLayout>
  );
};

export default Page;
