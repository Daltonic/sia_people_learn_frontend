'use client'
import React, { ReactNode, useEffect } from 'react'
import Footer from './footers/Footer'
import Header from './headers/Header'
import 'aos/dist/aos.css'
import AOS from 'aos'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/utils/type.dt'
import { userActions } from '@/store/slices/userSlice'
import { cartActions } from '@/store/slices/cartSlice'

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    AOS.init()
  }, [])
  const dispatch = useDispatch()
  const { setUserData } = userActions
  const { userData } = useSelector((states: RootState) => states.userStates)
  const { setCartItems, setCartAmount } = cartActions
  const { cartItems, cartAmount } = useSelector(
    (states: RootState) => states.cartStates
  )

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem('user')!)
      if (sessionUser) {
        dispatch(setUserData(sessionUser))
      }
    }
  }, [dispatch, setUserData, userData])

  useEffect(() => {
    if (cartAmount === 0) {
      const sessionCartAmount = JSON.parse(
        sessionStorage.getItem('cartAmount')!
      )
      if (sessionCartAmount) {
        dispatch(setCartAmount(sessionCartAmount))
      }
    }
  }, [cartAmount, dispatch, setCartAmount])

  useEffect(() => {
    if (cartItems.length === 0) {
      const sessionCartItems = JSON.parse(
        sessionStorage.getItem('sessionCartItems')!
      )
      if (sessionCartItems) {
        dispatch(setCartItems(sessionCartItems))
      }
    }
  }, [cartItems.length, dispatch, setCartItems])

  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
