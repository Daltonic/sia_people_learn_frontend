import { CartState, IAcademy, ICourse } from '@/utils/type.dt'

export const cartStates: CartState = {
  cartItems: [] as (ICourse | IAcademy)[],
  cartAmount: 0,
}
