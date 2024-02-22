'use client'
import Layout from '@/components/layout/Layout'
import { NextPage } from 'next'

const Page: NextPage = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center p-5 sm:p-10">
        <div
          className="md:w-5/6 h-72 p-5 sm:p-10 sm:my-14 md:my-16
          shadow shadow-slate-400  bg-[url('/images/instructors/instructorbg.svg')]
          bg-cover bg-center rounded-md flex flex-col items-center sm:items-start text-center"
        >
          <video
            src="https://file.dappmentors.duckdns.org/download/video/1708596030238__AQgH.mp4"
            controls
            width="500"
            height="200"
          ></video>
        </div>
      </div>
    </Layout>
  )
}

export default Page
