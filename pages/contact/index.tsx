'use client'
import FrequentlyAsked from '@/components/contact/FrequentlyAsked'
import Hero from '@/components/contact/Hero'
import Offices from '@/components/contact/Offices'
import Layout from '@/components/layout/Layout'
import { accordion } from '@/data/accordion'
import { NextPage } from 'next'
import Head from 'next/head'

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contact Us | People Learn</title>
        <meta
          name="description"
          content="Get in touch with us at People Learn. We're here to help you with your learning journey in Blockchain and Web3 Development."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://peoplelearn.io/contact" />
        <meta property="og:title" content="Contact Us | People Learn" />
        <meta
          property="og:description"
          content="Get in touch with us at People Learn. We're here to help you with your learning journey in Blockchain and Web3 Development."
        />
        <meta
          property="og:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709464016436__evSf.jpeg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@peoplelearn" />
        <meta name="twitter:title" content="Contact Us | People Learn" />
        <meta
          name="twitter:description"
          content="Get in touch with us at People Learn. We're here to help you with your learning journey in Blockchain and Web3 Development."
        />
        <meta
          name="twitter:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709464016436__evSf.jpeg"
        />
      </Head>

      <Layout>
        <div className="md:pb-24">
          <Hero />
          <Offices />
          <FrequentlyAsked items={accordion} />
        </div>
      </Layout>
    </>
  )
}

export default Page
