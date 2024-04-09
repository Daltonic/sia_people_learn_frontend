import { CartState, IAcademy, ICourse } from '@/utils/type.dt'
import { PayloadAction } from '@reduxjs/toolkit'

export const cartActions = {
  setCartItems: (
    states: CartState,
    action: PayloadAction<(ICourse | IAcademy)[]>
  ) => {
    states.cartItems = action.payload
  },
  setCartAmount: (states: CartState, action: PayloadAction<number>) => {
    states.cartAmount = action.payload
  },
}
