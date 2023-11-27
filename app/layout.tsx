'use client'

import '../public/assets/sass/styles.scss'
import Aos from 'aos'
import './globals.css'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import 'react-calendar/dist/Calendar.css'
import Context from '@/context/Context'

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
      <body>
        <Context>{children}</Context>
      </body>
    </html>
  )
}
