"use client";
import React, { useEffect, useState } from "react";
import { ICourse, IUserSubscriptions, RootState } from "@/utils/type.dt";
import Image from "next/image";
import Button from "../reusableComponents/Button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/store/cartSlice";
import SocialMediaIcons from "../reusableComponents/SocialMediaIcons";

interface ComponentProps {
  course: ICourse;
}

const CourseCardDetail: React.FC<ComponentProps> = ({ course }) => {
  const { cartCourseItems, cartAmount } = useSelector(
    (states: RootState) => states.cartStates
  );
  const { setCartCourseItems, setCartAmount } = cartActions;
  const dispatch = useDispatch();
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>(() => {
    const currentCourse = cartCourseItems.find(
      (item) => item._id === course._id
    );
    return currentCourse ? "Remove from Cart" : "Add to Cart";
  });

  useEffect(() => {
    const currentCourse = cartCourseItems.find(
      (item) => item._id === course._id
    );
    setButtonText(currentCourse ? "Remove from Cart" : "Add to Cart");
  }, [cartCourseItems, course._id]);

  const handleAddToCart = () => {
    const cartCourse = cartCourseItems.find((item) => item._id === course._id);
    if (cartCourse) {
      const updatedCourses = cartCourseItems.filter(
        (item) => item._id !== course._id
      );
      dispatch(setCartCourseItems(updatedCourses));
      sessionStorage.setItem("sessionCourses", JSON.stringify(updatedCourses));
      setButtonText("Add To Cart");
      const newCartAmount = cartAmount - course.price;
      sessionStorage.setItem("cartAmount", JSON.stringify(newCartAmount));
      dispatch(setCartAmount(newCartAmount));
    } else {
      const updatedCourses = [...cartCourseItems, course];
      dispatch(setCartCourseItems(updatedCourses));
      sessionStorage.setItem("sessionCourses", JSON.stringify(updatedCourses));
      setButtonText("Remove from Cart");
      const newCartAmount = cartAmount + course.price;
      sessionStorage.setItem("cartAmount", JSON.stringify(newCartAmount));
      dispatch(setCartAmount(newCartAmount));
    }
  };

  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     const requestDetails = {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
  //       },
  //     };

  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/subscriptions/user?productType=Course&pageSize=1000`,
  //         requestDetails
  //       );

  //       if (response.status === 400) {
  //         alert("Something went wrong");
  //       } else {
  //         const { subscriptions } =
  //           (await response.json()) as IUserSubscriptions;
  //         const isAcademyFound = subscriptions.find(
  //           (sub) => sub.productId._id === course._id
  //         );
  //         setIsSubscribed(isAcademyFound ? true : false);
  //       }
  //     } catch (e: any) {
  //       console.log(e.message);
  //     }
  //   };
  //   fetchCourses();
  // }, [course._id]);

  return (
    <div className="bg-white w-full md:w-[25%] md:right-10 md:top-0 md:absolute md:border border-[#EDEDED] p-2 space-y-2 mt-10 md:mt-0 rounded-md z-10">
      <div className="relative flex justify-center items-center">
        <div className="w-full">
          <Image
            width={250}
            height={250}
            style={{ height: "30%", width: "100%" }}
            className="rounded-md w-full"
            src={course.imageUrl || "/images/cardimg.svg"}
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
          <p className="text-2xl text-[#321463]">${course.price}</p>
          <p className="text-sm text-[#4F547B] line-through">${course.price}</p>
        </div>

        <div className="block ">
          {isSubscribed ? (
            <Button variant="pink" className="w-full mb-3" disabled>
              Already Purchased
            </Button>
          ) : (
            <>
              <Button
                variant="pink"
                className="w-full mb-3"
                onClick={handleAddToCart}
              >
                {buttonText}
              </Button>

              <Link href="/shopcart">
                <Button variant="pinkoutline" className="w-full">
                  Proceed to Cart
                </Button>
              </Link>
            </>
          )}
        </div>

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
              <p className="text-[#321463]">Lessons</p>
            </div>
            <p className="text-[#4F547B]">{course.lessons?.length}</p>
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
            <p className="text-[#4F547B]">{course.duration}</p>
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
            <p className="text-[#4F547B]">{course.difficulty}</p>
          </div>
          <div className="flex justify-center py-2">
            <SocialMediaIcons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardDetail;
