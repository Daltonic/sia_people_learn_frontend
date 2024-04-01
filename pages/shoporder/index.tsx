'use client'
import Layout from '@/components/layout/Layout'
import { NextPage } from 'next'
import Head from 'next/head'
import { FaCheck } from 'react-icons/fa'

interface CartProduct {
  name: string
  price: number
  quantity: number
}

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Checkout | People Learn</title>
        <meta
          name="description"
          content="Complete your purchase with People Learn. Manage your selected courses and proceed to checkout."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://peoplelearn.io/shopcheckout" />
        <meta property="og:title" content="Checkout | People Learn" />
        <meta
          property="og:description"
          content="Complete your purchase with People Learn. Manage your selected courses and proceed to checkout."
        />
        <meta
          property="og:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@peoplelearn" />
        <meta name="twitter:title" content="Checkout | People Learn" />
        <meta
          name="twitter:description"
          content="Complete your purchase with People Learn. Manage your selected courses and proceed to checkout."
        />
        <meta
          name="twitter:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
      </Head>

      <Layout>
        <div className="text-center w-full mb-16 p-5">
          <h1 className="text-violet-950 text-center text-3xl md:text-4xl font-bold">
            Order Status
          </h1>
          <p className="text-slate-600 text-center text-md mt-3 capitalize w-full">
            Stay updated with your order progress at People Learn, your journey
            is transparent and hassle-free.
          </p>
        </div>

        <section className="px-5  sm:px-10">
          <div className="flex flex-col items-center ">
            <div className="w-full text-center flex flex-col items-center">
              <div className="bg-[#C5165D] rounded-full text-xl p-6 md:p-4 text-white">
                <FaCheck />
              </div>
              <h2 className="text-violet-950 text-center text-xl md:text-lg font-bold mt-2">
                Your order is completed!
              </h2>
              <p className="text-slate-600 text-center text-sm mt-3">
                Thank you. Your order has been received.
              </p>
            </div>

            <div className="border-[#C5165D] border-dashed border-2 md:flex justify-between w-full md:w-3/5 py-6 px-5 md:px-14 rounded-lg my-8 md:my-16">
              <div>
                <h1 className="text-violet-950 text-md font-medium">
                  Order Number
                </h1>
                <p className="text-[#C5165D] font-medium text-sm mt-3">13119</p>
              </div>

              <div>
                <h1 className="text-violet-950 text-md font-medium">Date</h1>
                <p className="text-[#C5165D] font-medium text-sm mt-3">
                  27/07/2021
                </p>
              </div>

              <div>
                <h1 className="text-violet-950 text-md font-medium">Total</h1>
                <p className="text-[#C5165D] font-medium text-sm mt-3">
                  $40.10
                </p>
              </div>

              <div>
                <h1 className="text-violet-950 text-md font-medium">
                  Payment Method
                </h1>
                <p className="text-[#C5165D] font-medium text-sm mt-3">
                  Direct Bank Transfer
                </p>
              </div>
            </div>

            <div className="bg-[#F7F8FB] border border-[#EDEDED] rounded-xl p-5 md:p-8 w-full md:w-3/5 mb-20">
              <h1 className="text-violet-950 text-lg font-medium">
                Order details
              </h1>
              <div className="flex justify-between border-b border-[#EDEDED] py-4 text-violet-950 text-sm font-medium">
                <span>Product</span>
                <span>Subtotal</span>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Page
