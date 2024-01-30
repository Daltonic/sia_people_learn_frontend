import { CartState, IAcademy, ICourse } from '@/utils/type.dt'
import { PayloadAction } from '@reduxjs/toolkit'

export const cartActions = {
  setCartAcademyItems: (
    states: CartState,
    action: PayloadAction<IAcademy[]>
  ) => {
    states.cartAcademyItems = action.payload
  },
  setCartAcademyItem: (
    states: CartState,
    action: PayloadAction<IAcademy | null>
  ) => {
    states.cartAcademyItem = action.payload
  },
  setCartCourseItems: (states: CartState, action: PayloadAction<ICourse[]>) => {
    states.cartCourseItems = action.payload
  },
  setCartCourseItem: (
    states: CartState,
    action: PayloadAction<ICourse | null>
  ) => {
    states.cartCourseItem = action.payload
  },
}
