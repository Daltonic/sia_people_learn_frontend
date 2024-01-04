import React from 'react'
import Image from 'next/image'
import Button from '../reusableComponents/Button'
import Layout from '../layout/Layout'
import Link from 'next/link'

const NotFound: React.FC = () => {
  return (
    <Layout>
    <div className="flex justify-center w-full p-20">
      <div className="flex gap-20">
        <div className="">
          <Image
            width={530}
            height={480}
            src="/images/notfound.svg"
            alt="image"
          />
        </div>

        <div className="flex flex-col justify-center mt-4 gap-5">
          <h1 className="text-[#1A064F] text-[10rem] font-black leading-10">
            40<span className="text-[#C5165D]">4</span>
          </h1>
          <h2 className="text-[#1A064F] text-3xl font-medium mt-10">
            Oops! It looks like you are lost.
          </h2>
          <div className="text-[#4F547B] text-md">
            The page you are looking for is not available. Try to search again
            <br /> or use the go to.
          </div>
          <Link href="/">
            <Button
              variant="pink"
              style={{ width: '16rem', padding: '16px 10px', fontSize: '16px' }}
            >
              Go Back To Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default NotFound
