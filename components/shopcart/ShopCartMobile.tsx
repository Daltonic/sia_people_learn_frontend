"use client";

import { cartActions } from "@/store/slices/cartSlice";
import { RootState } from "@/utils/type.dt";
import Image from "next/image";
import { LiaTimesSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EmptyComponent from "../reusableComponents/EmptyComponent";
import Button from "../reusableComponents/Button";

interface Product {
  imageUrl: string | null;
  name: string;
  type: "Academy" | "Course" | "Book";
  price: number;
  discountedPrice: number;
  _id: string;
}

const ShopCartMobile: React.FC = () => {
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

  const handleCheckout = () => {
    if (!userData) {
      sessionStorage.setItem("prevPath", pathname);
      router.push("/login");
    }
    const checkout = async () => {
      const requestDetails = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };

      try {
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
        const subscriptionBody = {
          products,
          paymentType: "Stripe",
        };
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/processors/stripe/checkout`,
          { ...requestDetails, body: JSON.stringify(subscriptionBody) }
        );
        if (response.status === 400) {
          const message = await response.text();
          alert(message);
        } else {
          const result = await response.json();
          console.log(result);
          router.push(result.url);
        }
      } catch (e: any) {
        console.log(e.message);
      }
    };
    checkout();
  };

  return (
    <div className="">
      <div className="px-5 mt-10">
        {cartItems.length === 0 && (
          <div className="w-5/6 mt-10 mx-auto">
            <EmptyComponent
              title="Cart is Empty"
              buttonText="Add an Item to Cart"
            />
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="">
            {cartItems.map((item, index) => (
              <div className="" key={index}>
                <div className="flex justify-start items-center gap-5">
                  <Image
                    className="w-20 h-12 rounded-md"
                    alt=""
                    width={100}
                    height={100}
                    src={item.imageUrl || "/images/general/shape.svg"}
                  />
                  <span className="text-[#321463] font-medium">
                    {item.name}
                  </span>
                  {/* <span className="text-[#321463] font-medium">
                    {item.type}
                  </span> */}
                </div>
                <div className="flex items-center justify-end gap-5">
                  <h1 className="text-start text-[#4F547B] line-through">
                    ${item.price}
                  </h1>
                  <p className="text-start text-[#321463] font-medium text-2xl">
                    ${item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col items-center md:items-end w-full md:w-5/6 mt-16 px-5 md:px-0">
        < div className="border border-[#EDEDED] bg-slate-50 p-5 rounded-lg w-full md:w-1/3">
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
  );
};

export default ShopCartMobile;
