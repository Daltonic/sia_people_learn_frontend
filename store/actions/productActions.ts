import { IAcademy, ICourse, ProductState } from '@/utils/type.dt'
import { PayloadAction } from '@reduxjs/toolkit'

export const productActions = {
  setCourses: (states: ProductState, action: PayloadAction<ICourse[]>) => {
    states.courses = action.payload
  },
  setCourse: (states: ProductState, action: PayloadAction<ICourse | null>) => {
    states.course = action.payload
  },
  setAcademies: (states: ProductState, action: PayloadAction<IAcademy[]>) => {
    states.academies = action.payload
  },
  setAcademy: (
    states: ProductState,
    action: PayloadAction<IAcademy | null>
  ) => {
    states.academy = action.payload
  },
}
