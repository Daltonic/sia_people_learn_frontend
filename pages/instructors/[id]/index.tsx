import Profile from '@/components/instructors/Profile'
import Tabs from '@/components/instructors/Tabs'
import Layout from '@/components/layout/Layout'
import Head from 'next/head'
import React from 'react'

const Page: React.FC = () => {
  return (
    <>
      <Head>
        <title>Instructor Profiles | People Learn</title>
        <meta
          name="description"
          content="Discover the profiles of our expert instructors in Blockchain and Web3 Development. Learn more about their backgrounds and courses."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://peoplelearn.io/instructors" />
        <meta
          property="og:title"
          content="Instructor Profiles | People Learn"
        />
        <meta
          property="og:description"
          content="Discover the profiles of our expert instructors in Blockchain and Web3 Development. Learn more about their backgrounds and courses."
        />
        <meta
          property="og:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@peoplelearn" />
        <meta
          name="twitter:title"
          content="Instructor Profiles | People Learn"
        />
        <meta
          name="twitter:description"
          content="Discover the profiles of our expert instructors in Blockchain and Web3 Development. Learn more about their backgrounds and courses."
        />
        <meta
          name="twitter:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
      </Head>

      <Layout>
        <div className="md:px-20">
          <Profile />
          <Tabs />
        </div>
      </Layout>
    </>
  )
}

export default Page
