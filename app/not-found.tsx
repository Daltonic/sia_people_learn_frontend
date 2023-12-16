// import Preloader from '@/components/common/Preloader';
import Footer from '@/components/layout/footers/Footer';
import Header from '@/components/layout/headers/Header';
import NotFound from '@/components/notFound/NotFound';
import React from 'react';

const Page: React.FC = () => {
  return (
    <div className="bg-[#F9F9F9]">
      {/* <Preloader /> */}
      <Header />
      <div className=''>
        <NotFound />
        <Footer />
      </div>
    </div>
  );
};

export const metadata = {
  title:
    'Page not found || Educrat - Professional LMS Online Education Course NextJS Template',
  description:
    'Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.',
};

export default Page;
