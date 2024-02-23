import { createSlice } from '@reduxjs/toolkit'
import { userStates as UserStates } from '../states/userStates'
import { userActions as UserActions } from '../actions/userActions'

export const userSlice = createSlice({
  name: 'user',
  initialState: UserStates,
  reducers: UserActions,
})

export const userActions = userSlice.actions
export default userSlice.reducer
