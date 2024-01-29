import { IUser } from '@/context/Context'
import { UserState } from '@/utils/type.dt'
import { PayloadAction } from '@reduxjs/toolkit'

export const userActions = {
  setUserData: (states: UserState, action: PayloadAction<IUser | null>) => {
    states.userData = action.payload
  },
}
