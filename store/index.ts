import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartSlice'
import userSlice from './userSlice'
import uploaderSlice from './uploaderSlice'

export const store = configureStore({
  reducer: {
    cartStates: cartSlice,
    userStates: userSlice,
    uploaderStates: uploaderSlice,
  },
})
