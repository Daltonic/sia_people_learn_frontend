import DashboardLayout from '@/components/dashboard/dashboardLayout/DashboardLayout'
import AllReviews from '@/components/dashboard/reviews/AllReviews'
import Head from 'next/head'

const Reviews: React.FC = () => {
  return (
    <>
      <Head>
        <title>Reviews | People Learn Dashboard</title>
        <meta
          name="description"
          content="Explore and manage reviews for courses and instructors on the People Learn dashboard. Engage with the community and enhance your learning experience."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://peoplelearn.io/dashboard/reviews"
        />
        <meta
          property="og:title"
          content="Reviews | People Learn Dashboard"
        />
        <meta
          property="og:description"
          content="Explore and manage reviews for courses and instructors on the People Learn dashboard. Engage with the community and enhance your learning experience."
        />
        <meta
          property="og:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@peoplelearn" />
        <meta
          name="twitter:title"
          content="Reviews | People Learn Dashboard"
        />
        <meta
          name="twitter:description"
          content="Explore and manage reviews for courses and instructors on the People Learn dashboard. Engage with the community and enhance your learning experience."
        />
        <meta
          name="twitter:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
      </Head>

      <DashboardLayout>
        <AllReviews />
      </DashboardLayout>
    </>
  )
}

export default Reviews
