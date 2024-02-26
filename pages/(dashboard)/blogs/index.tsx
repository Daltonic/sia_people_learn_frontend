import DashboardLayout from "@/components/dashboard/dashboardLayout/DashboardLayout";
import Blogs from "@/components/dashboard/blogs/Blogs";
import { GetServerSidePropsContext } from "next";
import { fetchPosts } from "@/services/backend.services";
import { FetchPostsParams, IPosts } from "@/utils/type.dt";

const Page: React.FC<{ postsObj: IPosts }> = ({ postsObj }) => {
  return (
    <DashboardLayout>
      <Blogs postsData={postsObj} options={true} />
    </DashboardLayout>
  );
};

export default Page;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const searchQuery = context.query.q || "";
  const page = context.query.page;
  const filter = context.query.filter || "newest";

  const token = context.req.cookies.accessToken;

  try {
    const posts = await fetchPosts(
      {
        searchQuery: searchQuery as string,
        page: Number(page),
        filter: filter as FetchPostsParams["filter"],
        parentsOnly: "true",
      },
      token
    );

    return {
      props: {
        postsObj: JSON.parse(JSON.stringify(posts)) as IPosts,
      },
    };
  } catch (e: any) {
    console.log(e.message);
    return {
      props: {
        postsObj: {} as IPosts,
      },
    };
  }
};
