import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './slices/cartSlice'
import userSlice from './slices/userSlice'
import uploaderSlice from './slices/uploaderSlice'
import genericSlice from './slices/genericSlice'

export const store = configureStore({
  reducer: {
    cartStates: cartSlice,
    userStates: userSlice,
    uploaderStates: uploaderSlice,
    genericStates: genericSlice,
  },
})
