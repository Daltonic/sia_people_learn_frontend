import DashboardLayout from '@/components/dashboard/dashboardLayout/DashboardLayout'
import Blogs from '@/components/dashboard/myBlogs/Blogs'
import DeleteModal from '@/components/reusableComponents/DeleteModal'
import { fetchUserPosts } from '@/services/backend.services'
import { IPosts } from '@/utils/type.dt'
import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'

const Page: React.FC<{
  publishedPostsData: IPosts
  unpublishedPostsData: IPosts
}> = ({ publishedPostsData, unpublishedPostsData }) => {
  return (
    <>
      <Head>
        <title>View Personal Blog Posts | People Learn</title>
        <meta
          name="description"
          content="Explore a collection of personal blog posts created by a unique individual on  People Learn. Discover insights, knowledge, and stories shared by this individual."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://peoplelearn.com/personalblogposts"
        />
        <meta
          property="og:title"
          content="View Personal Blog Posts | People Learn"
        />
        <meta
          property="og:description"
          content="Explore a collection of personal blog posts created by a unique individual on  People Learn. Discover insights, knowledge, and stories shared by this individual."
        />
        <meta
          property="og:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709464016436__evSf.jpeg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@peoplelearn" />
        <meta
          name="twitter:title"
          content="View Personal Blog Posts |  People Learn"
        />
        <meta
          name="twitter:description"
          content="Explore a collection of personal blog posts created by a unique individual on  People Learn. Discover insights, knowledge, and stories shared by this individual."
        />
        <meta
          name="twitter:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709464016436__evSf.jpeg"
        />
      </Head>

      <DashboardLayout>
        <Blogs
          publishedPostsData={publishedPostsData}
          unpublishedPostsData={unpublishedPostsData}
        />
        <DeleteModal />
      </DashboardLayout>
    </>
  )
}

export default Page

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = context.req.cookies.accessToken

  try {
    const publishedPosts = await fetchUserPosts(
      { published: 'true', parentsOnly: 'true' },
      token
    )

    const unpublishedPosts = await fetchUserPosts(
      { published: 'false', parentsOnly: 'true' },
      token
    )

    return {
      props: {
        publishedPostsData: JSON.parse(
          JSON.stringify(publishedPosts)
        ) as IPosts,
        unpublishedPostsData: JSON.parse(
          JSON.stringify(unpublishedPosts)
        ) as IPosts,
      },
    }
  } catch (e: any) {
    console.log(e)
    return {
      props: {
        publishedPostsData: {} as IPosts,
        unpublishedPostsData: {} as IPosts,
      },
    }
  }
}
