"use client";
import React, { useState } from "react";
import { IAcademy, RootState } from "@/utils/type.dt";
import Image from "next/image";
import Button from "../reusableComponents/Button";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/store/cartSlice";
import { useRouter } from "next/navigation";

interface ComponentProps {
  academy: IAcademy;
  index?: number;
}

const AcademyDetails: React.FC<ComponentProps> = ({ academy }) => {
  console.log(academy);
  const router = useRouter();
  const { cartAcademyItems } = useSelector(
    (states: RootState) => states.cartStates
  );
  const { setCartAcademyItems } = cartActions;
  const dispatch = useDispatch();
  const [buttonText, setButtonText] = useState<string>(() => {
    const currentAcademy = cartAcademyItems.find(
      (item) => item._id === academy._id
    );
    return currentAcademy ? "Remove from Cart" : "Add to Cart";
  });

  const handleAddToCart = () => {
    const cartCourse = cartAcademyItems.find(
      (item) => item._id === academy._id
    );
    if (cartCourse) {
      const updatedAcademies = cartAcademyItems.filter(
        (item) => item._id !== academy._id
      );
      dispatch(setCartAcademyItems(updatedAcademies));
      setButtonText("Add To Cart");
    } else {
      const updatedAcademies = [...cartAcademyItems, academy];
      dispatch(setCartAcademyItems(updatedAcademies));
      setButtonText("Remove from Cart");
    }
  };

  const handleSubscribe = () => {
    const subscribe = async () => {
      const requestDetails = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };

      try {
        const subscriptionBody = {
          productId: academy._id,
          paymentType: "Stripe",
        };
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/processors/stripe/subscribe`,
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
    subscribe();
  };
  return (
    <div className="bg-white w-full md:w-[25%] md:right-10 md:top-0 md:absolute md:border border-[#EDEDED] p-2 space-y-2 mt-10 md:mt-0 rounded-md z-10">
      <div className="relative flex justify-center items-center">
        <div className="w-full">
          <Image
            width={250}
            height={250}
            style={{ height: "30%", width: "100%" }}
            className="rounded-md w-full"
            src={academy.imageUrl || "/images/shape.svg"}
            alt="image"
          />
        </div>
        <div className="p-4 bg-[#C5165D] rounded-full absolute">
          {" "}
          <Image
            width={12}
            height={12}
            src="/images/instructors/icons/playwhite.svg"
            alt="icon"
          />
        </div>
      </div>
      <div className="px-2 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-2xl text-[#321463]">${academy.price}</p>
          <p className="text-sm text-[#4F547B] line-through">
            ${academy.price}
          </p>
        </div>

        <div className="block ">
          {academy.validity < 1 ? (
            <Button
              variant="pink"
              className="w-full mb-3"
              onClick={handleAddToCart}
            >
              {buttonText}
            </Button>
          ) : (
            <Button
              variant="pink"
              className="w-full mb-3"
              onClick={handleSubscribe}
            >
              Subscribe
            </Button>
          )}

          <Link href="/shopcart">
            <Button variant="pinkoutline" className="w-full">
              Proceed to Cart
            </Button>
          </Link>
        </div>
        <p className="text-[#4F547B] text-sm text-center">
          30-Day Money-Back Guarantee
        </p>

        <div>
          <div className="flex justify-between items-center border-b py-2 border-[#EDEDED]">
            <div className="flex gap-2 items-center">
              <Image
                width={5}
                height={5}
                className="rounded-md w-4 h-4"
                src="/images/cardInfo/video-file.svg"
                alt="image"
              />
              <p className="text-[#321463]">Courses</p>
            </div>
            {/* <p className="text-[#4F547B]">{academy.courses.length}</p> */}
          </div>
          <div className="flex justify-between items-center border-b py-2 border-[#EDEDED]">
            <div className="flex gap-2 items-center">
              <Image
                width={5}
                height={5}
                className="rounded-md w-4 h-4"
                src="/images/cardInfo/clock.svg"
                alt="image"
              />
              <p className="text-[#321463]">Duration</p>
            </div>
            <p className="text-[#4F547B]">{academy.duration}</p>
          </div>
          <div className="flex justify-between items-center border-b py-2 border-[#EDEDED]">
            <div className="flex gap-2 items-center">
              <Image
                width={5}
                height={5}
                className="rounded-md w-4 h-4"
                src="/images/cardInfo/bar-chart.svg"
                alt="image"
              />
              <p className="text-[#321463]">Skill level</p>
            </div>
            <p className="text-[#4F547B]">{academy.difficulty}</p>
          </div>
          <div className="flex justify-between items-center border-b py-2 border-[#EDEDED]">
            <div className="flex gap-2 items-center">
              <Image
                width={5}
                height={5}
                className="rounded-md w-4 h-4"
                src="/images/cardInfo/translate.svg"
                alt="image"
              />
              <p className="text-[#321463]">Language</p>
            </div>
            <p className="text-[#4F547B]">{"English"}</p>
          </div>
          <div className="flex justify-between items-center border-b py-2 border-[#EDEDED]">
            {/* <div className="flex gap-2 items-center">
              <Image
                width={5}
                height={5}
                className="rounded-md w-4 h-4"
                src="/images/cardInfo/infinity.svg"
                alt="image"
              />
              <p className="text-[#321463]">Full lifetime access</p>
            </div>
            <p className="text-[#4F547B]">{course.viewStatus}</p> */}
          </div>
          <div className="flex justify-center gap-2 items-center">
            <div className="p-4 rounded-full hover:bg-[#F9F9F9] text-[#4F547B] hover:bg-opacity-50 transition duration-500 ease-in-out cursor-pointer">
              <FaFacebookF />
            </div>
            <div className="p-4 rounded-full hover:bg-[#F9F9F9] text-[#4F547B] hover:bg-opacity-50 transition duration-500 ease-in-out cursor-pointer">
              <FaTwitter />
            </div>
            <div className="p-4 rounded-full hover:bg-[#F9F9F9] text-[#4F547B] hover:bg-opacity-50 transition duration-500 ease-in-out cursor-pointer">
              <FaInstagram />
            </div>
            <div className="p-4 rounded-full hover:bg-[#F9F9F9] text-[#4F547B] hover:bg-opacity-50 transition duration-500 ease-in-out cursor-pointer">
              <FaLinkedinIn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyDetails;
