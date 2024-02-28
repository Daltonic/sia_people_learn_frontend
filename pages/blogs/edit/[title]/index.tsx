import BlogForm from "@/components/blogs/BlogForm";
import BlogHeader from "@/components/blogs/BlogHeader";
import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import { fetchPost } from "@/services/backend.services";
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
  const { title } = context.query;
  const token = context.req.cookies.accessToken;

  try {
    const post = await fetchPost(title as string, token);
    return {
      props: {
        postData: post,
      },
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      props: {
        postData: {},
      },
    };
  }
};
