import NotFound from '@/components/not-found/NotFound'
import PageLinks from '@/components/common/PageLinks'
import Preloader from '@/components/common/Preloader'

import Footer from '@/components/layout/footers/Footer'
import Header from '@/components/layout/headers/Header'
import React from 'react'

export const metadata = {
  title: 'Page not found | Dapp Mentors',
  description: 'Lorem Ipsum dalum.',
}

export default function page() {
  return (
    <div className="main-content  ">
      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />
        <NotFound />
        <Footer />
      </div>
    </div>
  )
}
