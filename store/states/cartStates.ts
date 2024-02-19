import { CartState, IAcademy, ICourse } from "@/utils/type.dt";

export const cartStates: CartState = {
  cartAcademyItems: [] as IAcademy[],
  cartAcademyItem: null,
  cartCourseItems: [] as ICourse[],
  cartCourseItem: null,
  cartAmount: 0,
};
