import { createSlice } from '@reduxjs/toolkit'
import { productStates as ProductStates } from '../states/productStates'
import { productActions as ProductActions } from '../actions/productActions'

export const productSlice = createSlice({
  name: 'product',
  initialState: ProductStates,
  reducers: ProductActions,
})

export const productActions = productSlice.actions
export default productSlice.reducer
