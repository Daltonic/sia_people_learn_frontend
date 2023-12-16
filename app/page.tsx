import Banner from '@/components/Banner'
import CTA from '@/components/CTA'
import Header from '@/components/Header'
import HowItWorks from '@/components/HowItWorks'
import Newsletter from '@/components/Newsletter'
import Stats from '@/components/Stats'
import { NextPage } from 'next'

export const metadata = {
  title: 'Home | Dapp Mentors',
  description: 'Lorem Ipsu,',
}

const Page: NextPage = () => {
  return (
    <main className="space-y-4">
      {/* <h4>Hello World</h4> */}
      <Header />
      <Banner />
      <Stats />
      <HowItWorks />
      <CTA />
      <Newsletter />
    </main>
  )
}

export default Page
