"use client";

import { cartActions } from "@/store/slices/cartSlice";
import {
  ICourse,
  IUserSubscription,
  IUserSubscriptions,
  RootState,
} from "@/utils/type.dt";
import Image from "next/image";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EmptyComponent from "../reusableComponents/EmptyComponent";
import { toast } from "react-toastify";
import { stripeCheckout } from "@/services/backend.services";
import { FaTimes } from "react-icons/fa";
import Button from "../reusableComponents/Button";

interface Product {
  imageUrl: string | null;
  name: string;
  type: "Academy" | "Course" | "Book";
  price: number;
  discountedPrice: number;
  _id: string;
}

const ShopCartTable: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setCartAcademyItems, setCartCourseItems, setCartAmount } =
    cartActions;
  const dispatch = useDispatch();
  const { cartAcademyItems, cartCourseItems, cartAmount } = useSelector(
    (states: RootState) => states.cartStates
  );

  const { userData } = useSelector((states: RootState) => states.userStates);

  const cartItems: Product[] = [];

  cartAcademyItems.forEach((item) =>
    cartItems.push({
      imageUrl: item?.imageUrl,
      name: item.name,
      type: "Academy",
      price: item.price,
      discountedPrice: item.price,
      _id: item._id,
    })
  );

  cartCourseItems.forEach((item) => {
    cartItems.push({
      imageUrl: item?.imageUrl,
      name: item.name,
      type: "Course",
      price: item.price,
      discountedPrice: item.price,
      _id: item._id,
    });
  });

  const handleRemoveFromCart = (
    _id: string,
    type: "Academy" | "Course" | "Book",
    price: number
  ) => {
    if (type === "Academy") {
      const updatedAcademies = cartAcademyItems.filter(
        (item) => item._id !== _id
      );
      dispatch(setCartAcademyItems(updatedAcademies));
      sessionStorage.setItem(
        "sessionAcademies",
        JSON.stringify(updatedAcademies)
      );
      const currentAmount = cartAmount - price;
      sessionStorage.setItem("cartAmount", JSON.stringify(currentAmount));
      dispatch(setCartAmount(currentAmount));
    } else {
      const updatedCourses = cartCourseItems.filter((item) => item._id !== _id);
      dispatch(setCartCourseItems(updatedCourses));
      sessionStorage.setItem("sessionCourses", JSON.stringify(updatedCourses));
      const currentAmount = cartAmount - price;
      sessionStorage.setItem("cartAmount", JSON.stringify(currentAmount));
      dispatch(setCartAmount(currentAmount));
    }
  };

  const handleCheckout = async () => {
    if (!userData) {
      sessionStorage.setItem("prevPath", pathname);
      router.push("/login");
    }

    const products: {
      productId: string;
      productType: "Course" | "Academy";
    }[] = [];
    for (let item of cartItems) {
      products.push({
        productId: item._id,
        productType: item.type === "Academy" ? "Academy" : "Course",
      });
    }

    const token = sessionStorage.getItem("accessToken") as string;

    try {
      await toast.promise(
        new Promise<void>(async (resolve, reject) => {
          await stripeCheckout(products, token)
            .then((result) => {
              console.log(result);
              if (result.url) {
                router.push(result.url);
              } else {
                router.push("/payment-successful");
              }

              resolve(result);
            })
            .catch((error) => {
              console.log(error);
              reject(error);
            });
        }),
        {
          pending: `Processing...`,
          success: `Payment successful 👌`,
          error: "Encountered error 🤯",
        }
      );
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <div
      className="w-full flex flex-col justify-center px-10 md:p-0"
      suppressHydrationWarning
    >
      {cartItems.length === 0 && (
        <div className="w-5/6 mt-10 mx-auto">
          <EmptyComponent
            title="Cart is Empty"
            buttonText="Add an Item to Cart"
          />
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="flex flex-col items-center overflow-hidden w-full">
          <table className="mt-14 md:w-5/6">
            <thead className="bg-[#F5F7FE] text-[#C5165D] font-medium h-20 rounded-md">
              <tr>
                <th className="text-start pl-10">Product</th>
                <th className="px-10 w-1/6 text-start">Type</th>
                <th className="px-10 w-1/6 text-start">Price</th>
                <th className="px-10 w-1/6 text-center pr-10">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, i) => (
                <tr key={i} className="border-b border-[#EDEDED]">
                  <td className="flex items-center gap-5 pl-10 py-2 w-fit px-5">
                    <Image
                      className="w-20 h-14 rounded-md"
                      alt=""
                      width={100}
                      height={100}
                      src={item.imageUrl || "/images/general/shape.svg"}
                    />
                    <span className="text-[#321463] font-medium">
                      {item.name}
                    </span>
                  </td>
                  <td className="w-1/6 px-10 text-start text-[#4F547B]">
                    {item.type}
                  </td>
                  <td className="w-1/6 px-10 text-start text-[#4F547B]">
                    ${item.price}
                  </td>
                  <td className="w-1/6 px-16 text-base text-[#1A3454]">
                    <div
                      onClick={() =>
                        handleRemoveFromCart(item._id, item.type, item.price)
                      }
                      className="cursor-pointer flex justify-center"
                    >
                      <FaTimes className="w-full" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-col items-center md:items-end w-full md:w-5/6 mt-16 px-5 md:px-0">
            <div className="border border-[#EDEDED] bg-slate-50 p-5 rounded-lg w-full md:w-1/3">
              <div className=" flex justify-between  border-b border-[#EDEDED] py-2">
                <h1 className="text-[#321463] font-medium">Total </h1>
                <p className="text-[#4F547B]"> ${cartAmount}</p>
              </div>

              <Button variant="pink"
                className="w-full my-4"
                onClick={handleCheckout}
              >
                Proceed to checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopCartTable;
