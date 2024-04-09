import React, { useEffect, useState } from 'react'
import DashBoardHeader from '@/components/dashboard/dashboardLayout/DashBoardHeader'
import DashBoardSidebar from '@/components/dashboard/dashboardLayout/DashBoardSidebar'
import DashBoardFooter from './DashBoardFooter'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/utils/type.dt'
import { userActions } from '@/store/slices/userSlice'
import { cartActions } from '@/store/slices/cartSlice'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  ...props
}) => {
  const [sidebarOpen] = useState(false)

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
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      <DashBoardHeader />
      <div className="flex justify-between md:pr-5 flex-grow">
        <div className="md:sticky md:top-6 md:h-full">
          <DashBoardSidebar isOpen={sidebarOpen} />
        </div>
        <main className="flex-1 bg-[#F7F8FB] px-0 py-10 sm:px-10 md:py-12 md:rounded-xl">
          {children}
        </main>
      </div>
      <DashBoardFooter />
    </div>
  )
}

export default DashboardLayout
