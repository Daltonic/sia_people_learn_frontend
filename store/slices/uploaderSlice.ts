import { createSlice } from '@reduxjs/toolkit'
import { uploaderStates as UploaderStates } from '../states/uploaderStates'
import { uploaderActions as UploaderActions } from '../actions/uploaderActions'

export const uploaderSlice = createSlice({
  name: 'uploader',
  initialState: UploaderStates,
  reducers: UploaderActions,
})

export const uploaderActions = uploaderSlice.actions
export default uploaderSlice.reducer
