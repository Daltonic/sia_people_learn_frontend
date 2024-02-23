import { createSlice } from '@reduxjs/toolkit'
import { cartStates as CartStates } from '../states/cartStates'
import { cartActions as CartActions } from '../actions/cartActions'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: CartStates,
  reducers: CartActions,
})

export const cartActions = cartSlice.actions
export default cartSlice.reducer
