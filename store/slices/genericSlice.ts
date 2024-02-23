import { createSlice } from '@reduxjs/toolkit'
import { genericStates as GenericStates } from '../states/genericStates'
import { genericActions as GenericActions } from '../actions/genericActions'

export const genericSlice = createSlice({
  name: 'generic',
  initialState: GenericStates,
  reducers: GenericActions,
})

export const genericActions = genericSlice.actions
export default genericSlice.reducer
