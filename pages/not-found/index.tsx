import NotFound from '@/components/notFound/NotFound'
import React from 'react'

const Page: React.FC = () => {
  return (
    <div className="bg-[#F9F9F9]">
      <div className="">
        <NotFound />
      </div>
    </div>
  )
}

export const metadata = {
  title:
    'Page not found || Educrat - Professional LMS Online Education Course NextJS Template',
  description:
    'Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.',
}

export default Page
