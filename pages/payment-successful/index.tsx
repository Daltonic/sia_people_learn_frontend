'use client'
import Layout from '@/components/layout/Layout'
import { cartActions } from '@/store/slices/cartSlice'
import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const Page: NextPage = () => {
  const dispatch = useDispatch()

  const { setCartItems, setCartAmount } = cartActions

  useEffect(() => {
    dispatch(setCartItems([]))
    sessionStorage.removeItem('sessionCartItems')
    dispatch(setCartAmount(0))
    sessionStorage.removeItem('cartAmount')
  }, [dispatch, setCartItems, setCartAmount])

  return (
    <>
      <Head>
        <title>Payment Successful | People Learn</title>
        <meta
          name="description"
          content="We're sorry, but your payment was successful. Please try again or contact our support team for assistance."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://peoplelearn.io/payment-successful"
        />
        <meta property="og:title" content="Payment successful | People Learn" />
        <meta
          property="og:description"
          content="We're sorry, but your payment was successful. Please try again or contact our support team for assistance."
        />
        <meta
          property="og:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@peoplelearn" />
        <meta
          name="twitter:title"
          content="Payment successful | People Learn"
        />
        <meta
          name="twitter:description"
          content="We're sorry, but your payment was successful. Please try again or contact our support team for assistance."
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
              src="/images/general/sucess.svg"
              width={10}
              height={20}
              alt=""
            />
            <h1 className="text-violet-950 text-xl sm:text-3xl font-bold">
              Payment Successful
            </h1>
            <p className="text-slate-600 text-base mt-2">
              Thank you for your purchase! Your payment has been successfully
              processed.
            </p>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Page
