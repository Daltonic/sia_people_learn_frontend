'use client'
import Layout from '@/components/layout/Layout'
import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Payment Cancelled | People Learn</title>
        <meta
          name="description"
          content="We're sorry, but your payment was cancelled. Please try again or contact our support team for assistance."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://peoplelearn.io/payment-cancelled"
        />
        <meta property="og:title" content="Payment Cancelled | People Learn" />
        <meta
          property="og:description"
          content="We're sorry, but your payment was cancelled. Please try again or contact our support team for assistance."
        />
        <meta
          property="og:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@peoplelearn" />
        <meta name="twitter:title" content="Payment Cancelled | People Learn" />
        <meta
          name="twitter:description"
          content="We're sorry, but your payment was cancelled. Please try again or contact our support team for assistance."
        />
        <meta
          name="twitter:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
      </Head>

      <Layout>
        <div className="flex justify-center items-center p-5 sm:p-10">
          <div className="md:w-5/6 h-72 p-5 sm:p-10 sm:my-14 md:my-16 shadow shadow-slate-400  bg-[url('/images/instructors/instructorbg.svg')] bg-cover bg-center rounded-md flex flex-col items-center sm:items-start text-center">
            <Image
              className="w-16 h-16 object-cover mb-5"
              src="/images/general/cancel2.svg"
              width={10}
              height={20}
              alt=""
            />
            <h1 className="text-violet-950 text-xl sm:text-3xl font-bold">
              Payment Cancelled
            </h1>
            <p className="text-slate-600 text-base mt-2">
              We&apos;re sorry, but your payment was cancelled. Please try again
              or contact our support team for assistance.
            </p>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Page
