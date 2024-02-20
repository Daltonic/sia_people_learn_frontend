import { UploaderState } from '@/utils/type.dt'
import { PayloadAction } from '@reduxjs/toolkit'

export const uploaderActions = {
  setUploaderModal: (states: UploaderState, action: PayloadAction<string>) => {
    states.uploaderModal = action.payload
  },
}
