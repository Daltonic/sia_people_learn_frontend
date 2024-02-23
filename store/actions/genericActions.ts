import { GenericState } from '@/utils/type.dt'
import { PayloadAction } from '@reduxjs/toolkit'

export const genericActions = {
  setDeleteModal: (states: GenericState, action: PayloadAction<string>) => {
    states.deleteModal = action.payload
  },
  setData: (states: GenericState, action: PayloadAction<object | null>) => {
    states.data = action.payload
  },
}
