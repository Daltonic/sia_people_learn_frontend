'use client'

import '../public/assets/scss/styles.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './globals.css'
import 'react-calendar/dist/Calendar.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    Aos.init({
      duration: 700,
      offset: 120,
      easing: 'ease-out',
      once: true,
    })
  }, [])
  return (
    <html lang="en" className="">
      <head></head>
      <main> {children}</main>
    </html>
  )
}
