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
import { AppProps } from 'next/app'
import ContextProvider from '@/context/Context'
import { Provider } from 'react-redux'
import { store } from '@/store'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Aos.init({
      duration: 700,
      offset: 120,
      easing: 'ease-out',
      once: true,
    })
  }, [])

  return (
    <Provider store={store}>
      <ContextProvider>
        <Component {...pageProps} />
      </ContextProvider>
    </Provider>
  )
}
