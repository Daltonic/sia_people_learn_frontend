'use client'
import Layout from '@/components/layout/Layout'
import { NextPage } from 'next'
import { helpItems } from '../../data/helpItems'
import { FormEvent } from 'react'
import { FaSearch } from 'react-icons/fa'
import HelpCenterCard from '@/components/helpcenter/HelpCenterCard'
import { accordion } from '@/data/accordion'
import FrequentlyAsked from '@/components/helpcenter/FrequentlyAsked'
import Head from 'next/head'

const Page: NextPage = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }
  return (
    <>
      <Head>
        <title>Help Center | PeopleLearn</title>
        <meta
          name="description"
          content="Find answers to your questions about Blockchain and Web3 Development. Explore our Help Center for guidance and support."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://peoplelearn.io/help-center" />
        <meta property="og:title" content="Help Center | PeopleLearn" />
        <meta
          property="og:description"
          content="Find answers to your questions about Blockchain and Web3 Development. Explore our Help Center for guidance and support."
        />
        <meta
          property="og:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709464016436__evSf.jpeg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@peoplelearn" />
        <meta name="twitter:title" content="Help Center | PeopleLearn" />
        <meta
          name="twitter:description"
          content="Find answers to your questions about Blockchain and Web3 Development. Explore our Help Center for guidance and support."
        />
        <meta
          name="twitter:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709464016436__evSf.jpeg"
        />
      </Head>

      <Layout>
        <div className="flex flex-col items-center">
          <div className="px-5 mt-10 text-center">
            <h1 className="text-violet-950 text-3xl md:text-4xl font-bold">
              How can we help you?
            </h1>
            <p className="text-slate-600 text-md mt-3 capitalize">
              We&apos;re eager to help you navigate your learning journey in
              Blockchain and Web3 development.
            </p>
          </div>
          <div className="flex mt-10 justify-center ">
            <form
              className="relative h-14 flex"
              action="post"
              onSubmit={handleSubmit}
            >
              <input
                required
                type="text"
                placeholder="Enter a question"
                className="w-[20rem] md:w-[30rem] rounded-lg h-full border border-[#EDEDED] px-4 focus:outline-none"
              />
              <button
                className="absolute right-2 top-1.5 rounded-md bg-[#C5165D] text-white font-medium h-[80%] px-4 flex gap-2 items-center"
                type="submit"
              >
                <FaSearch />
                Search
              </button>
            </form>
          </div>
          <div className="flex justify-center md:justify-between flex-wrap gap-5 mt-16 md:px-20">
            {helpItems.map((item, i) => (
              <HelpCenterCard key={i} {...item} />
            ))}
          </div>
          <FrequentlyAsked items={accordion} />
        </div>
      </Layout>
    </>
  )
}

export default Page
