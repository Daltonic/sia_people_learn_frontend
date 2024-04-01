import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Layout from '@/components/layout/Layout'
import { NextPage } from 'next'
import Head from 'next/head'

const ShopCartTable = dynamic(
  () => import('@/components/shopcart/ShopCartTable')
)
const ShopCartMobile = dynamic(
  () => import('@/components/shopcart/ShopCartMobile')
)

const Page: NextPage = () => {
  const [isDesktopOrLaptop, setIsDesktopOrLaptop] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopOrLaptop(window.innerWidth > 768)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Shop Cart | People Learn</title>
        <meta
          name="description"
          content="Manage your selected courses and proceed to checkout on People Learn."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://peoplelearn.io/shopcart" />
        <meta property="og:title" content="Shop Cart | People Learn" />
        <meta
          property="og:description"
          content="Manage your selected courses and proceed to checkout on People Learn."
        />
        <meta
          property="og:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@peoplelearn" />
        <meta name="twitter:title" content="Shop Cart | People Learn" />
        <meta
          name="twitter:description"
          content="Manage your selected courses and proceed to checkout on People Learn."
        />
        <meta
          name="twitter:image"
          content="https://file.dappmentors.duckdns.org/download/image/1709450883536__fcix.png"
        />
      </Head>

      <Layout>
        <div className="flex flex-col items-center overflow-hidden">
          <div className="flex flex-col items-center px-5 md:mt-10 text-center">
            <h1 className="text-violet-950 text-3xl md:text-4xl font-bold">
              Shop Cart
            </h1>
            <p className="text-slate-600 text-md mt-3 capitalize">
              Manage your selected courses and proceed to checkout.
            </p>
          </div>
          {isDesktopOrLaptop ? <ShopCartTable /> : <ShopCartMobile />}
        </div>
      </Layout>
    </>
  )
}

export default Page
