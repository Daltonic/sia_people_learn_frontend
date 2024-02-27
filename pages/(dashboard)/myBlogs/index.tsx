import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import Blogs from "@/components/dashboard/myBlogs/Blogs";
import DeleteModal from "@/components/reusableComponents/DeleteModal";
import { fetchUserPosts } from "@/services/backend.services";
import { IPosts } from "@/utils/type.dt";
import { GetServerSidePropsContext } from "next";

const Page: React.FC<{
  publishedPostsData: IPosts;
  unpublishedPostsData: IPosts;
}> = ({ publishedPostsData, unpublishedPostsData }) => {
  return (
    <DashboardLayout>
      <Blogs
        publishedPostsData={publishedPostsData}
        unpublishedPostsData={unpublishedPostsData}
      />
      <DeleteModal />
    </DashboardLayout>
  );
};

export default Page;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = context.req.cookies.accessToken;

  try {
    const publishedPosts = await fetchUserPosts(
      { published: "true", parentsOnly: "true" },
      token
    );

    const unpublishedPosts = await fetchUserPosts(
      { published: "false", parentsOnly: "true" },
      token
    );

    return {
      props: {
        publishedPostsData: JSON.parse(
          JSON.stringify(publishedPosts)
        ) as IPosts,
        unpublishedPostsData: JSON.parse(
          JSON.stringify(unpublishedPosts)
        ) as IPosts,
      },
    };
  } catch (e: any) {
    console.log(e);
    return {
      props: {
        publishedPostsData: {} as IPosts,
        unpublishedPostsData: {} as IPosts,
      },
    };
  }
};
