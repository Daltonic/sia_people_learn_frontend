import BlogForm from '@/components/blogs/BlogForm'
import DashboardHeading from '@/components/dashboard/dashboardLayout/DashboardHeading'
import DashboardLayout from '@/components/dashboard/dashboardLayout/DashboardLayout'
import { NextPage } from 'next'
import Head from 'next/head'

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create a Blog | PeopleLearn</title>
        <meta
          name="description"
          content="Start your journey with PeopleLearn by creating your own blog. Share your insights, knowledge, and inspire others."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://peoplelearn.io/createblog" />
        <meta property="og:title" content="Create a Blog | PeopleLearn" />
        <meta
          property="og:description"
          content="Start your journey with PeopleLearn by creating your own blog. Share your insights, knowledge, and inspire others."
        />
        <meta
          property="og:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@peoplelearn" />
        <meta name="twitter:title" content="Create a Blog | PeopleLearn" />
        <meta
          name="twitter:description"
          content="Start your journey with PeopleLearn by creating your own blog. Share your insights, knowledge, and inspire others."
        />
        <meta
          name="twitter:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
      </Head>

      <DashboardLayout>
        <DashboardHeading
          title="Create Blog"
          description="Provide your Blog Details"
        />
        <BlogForm type="create" />
      </DashboardLayout>
    </>
  )
}

export default Page
