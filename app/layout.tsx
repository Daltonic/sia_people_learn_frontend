'use client'

import 'swiper/css'
import './globals.css'
import 'swiper/css/pagination'
import 'react-calendar/dist/Calendar.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="">
      <head></head>
      <body>{children}</body>
    </html>
  )
}
