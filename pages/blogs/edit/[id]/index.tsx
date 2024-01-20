import BlogForm from "@/components/blogs/BlogForm";
import BlogHeader from "@/components/blogs/BlogHeader";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import { IPost } from "@/utils/type.dt";
import { GetServerSidePropsContext, NextPage } from "next";

const Page: NextPage<{ postData: IPost }> = ({ postData }) => {
  return (
    <DashboardLayout>
      <BlogHeader headerHead="Edit Blog" headerBody="Edit your Blog" />
      <BlogForm type="edit" post={postData} />
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
      `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/posts/${id}`,
      requestDetails
    );

    const post = await response.json();
    return {
      props: {
        postData: post,
      },
    };
  } catch (e: any) {
    console.log(e.message);
  }
};
