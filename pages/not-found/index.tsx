import NotFound from '@/components/notFound/NotFound'
import Head from 'next/head'
import React from 'react'

const Page: React.FC = () => {
  return (
    <>
      <Head>
        <title>Page Not Found | People Learn</title>
        <meta
          name="description"
          content="Oops! The page you're looking for doesn't exist. Let's get you back on track."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://peoplelearn.io/not-found" />
        <meta property="og:title" content="Page Not Found | People Learn" />
        <meta
          property="og:description"
          content="Oops! The page you're looking for doesn't exist. Let's get you back on track."
        />
        <meta
          property="og:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@peoplelearn" />
        <meta name="twitter:title" content="Page Not Found | People Learn" />
        <meta
          name="twitter:description"
          content="Oops! The page you're looking for doesn't exist. Let's get you back on track."
        />
        <meta
          name="twitter:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
      </Head>

      <div className="bg-[#F9F9F9]">
        <div className="">
          <NotFound />
        </div>
      </div>
    </>
  )
}

export default Page
