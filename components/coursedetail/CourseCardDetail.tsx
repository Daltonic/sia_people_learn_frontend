"use client";
import React, { useEffect, useState } from "react";
import {
  ICourse,
  IUserSubscriptions,
  IWishlist,
  RootState,
} from "@/utils/type.dt";
import Image from "next/image";
import Button from "../reusableComponents/Button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "@/store/slices/cartSlice";
import SocialMediaIcons from "../reusableComponents/SocialMediaIcons";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  createWishlist,
  deleteWishlist,
  fetchWishlists,
} from "@/services/backend.services";

interface ComponentProps {
  course: ICourse;
}

const CourseCardDetail: React.FC<ComponentProps> = ({ course }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCourseItems, cartAmount } = useSelector(
    (states: RootState) => states.cartStates
  );
  const { setCartCourseItems, setCartAmount } = cartActions;
  const { userData } = useSelector((states: RootState) => states.userStates);
  const dispatch = useDispatch();
  const [purchased, setPurchased] = useState<boolean>(false);
  const [canBookmarked, setCanBookmarked] = useState<boolean>(true);
  const [bookmarked, setBookmarked] = useState<IWishlist | null>(null);
  const [buttonText, setButtonText] = useState<string>(() => {
    const currentCourse = cartCourseItems.find(
      (item) => item._id === course._id
    );
    return currentCourse ? "Remove from Cart" : "Add to Cart";
  });

  // Fetch bookmarked courses when userData changes
  useEffect(() => {
    if (!userData) return;

    const isSubscribed = userData.subscribedCourses.includes(course?._id!);
    if (isSubscribed) {
      setPurchased(true);
      return;
    }
    // If bookmarked courses is returned, search through both bookmarked courses and subscribed courses to ensure that neither contains present course

    const fetchSavedCourses = async () => {
      const token = sessionStorage.getItem("accessToken") as string;

      try {
        const courses = (await fetchWishlists(
          { productType: "Course" },
          token
        )) as IWishlist[];

        if (courses) {
          const wishCourse = courses.find(
            (wish) => wish.productId._id === course._id
          );

          if (wishCourse) {
            setBookmarked(wishCourse);
          }
          if (wishCourse || isSubscribed) {
            setCanBookmarked(false);
          }
        } else {
          if (isSubscribed) {
            setCanBookmarked(false);
          }
        }
      } catch (e: any) {
        console.log(e.message);
      }
    };
    fetchSavedCourses();
  }, [course?._id, userData]);

  // Add or remove item from cart
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

  // Creating a bookmark
  const handleAddToWishlist = async () => {
    const token = sessionStorage.getItem("accessToken") as string;

    await toast.promise(
      new Promise<void>((resolve, reject) => {
        createWishlist(
          { productType: "Course", productId: course._id },
          token
        ).then((wishlist) => {
          if (wishlist) {
            setCanBookmarked(false);
            setBookmarked(wishlist);
            resolve(wishlist);
          } else {
            reject();
          }
        });
      }),
      {
        pending: "Adding to Wishlist",
        success: "Successfully saved 👌",
        error: "Encountered error 🤯",
      }
    );
  };

  // Remove from Bookmarks
  const handleRemoveFromWishlist = async (isSubscribed: boolean) => {
    if (!bookmarked) return; // Return if the course had not been bookmarked

    const token = sessionStorage.getItem("accessToken") as string;

    await toast.promise(
      new Promise<void>((resolve, reject) => {
        deleteWishlist(bookmarked._id, token).then((status) => {
          if (status === 200) {
            // Now that the bookmark has been deleted,  reset the bookmark to true if the user is not currently subscribed to the course
            if (!isSubscribed) {
              setCanBookmarked(true);
            }
            setBookmarked(null);
            resolve(status);
          } else {
            reject();
          }
        });
      }),
      {
        pending: "Removing from Wishlist",
        success: "Successfully saved 👌",
        error: "Encountered error 🤯",
      }
    );
  };

  const handleBookmarkAction = () => {
    if (!userData) {
      sessionStorage.setItem("prevPath", pathname);
      router.push("/login");
      return;
    }
    const isSubscribed = userData!.subscribedCourses.includes(course?._id!);
    if (isSubscribed) return;
    if (canBookmarked) {
      handleAddToWishlist();
    } else {
      handleRemoveFromWishlist(isSubscribed);
    }
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
            src={course.imageUrl || "/images/general/cardimg.svg"}
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
          <Button
            variant="pink"
            className="w-full mb-3"
            onClick={handleAddToCart}
          >
            {buttonText}
          </Button>

          <Button
            variant="pinkoutline"
            className="w-full mb-3"
            onClick={handleBookmarkAction}
          >
            {purchased
              ? "Already subscribed"
              : canBookmarked
              ? `Bookmark ${course.type}`
              : "Remove bookmark"}
          </Button>

          <Link href="/shopcart">
            <Button variant="pinkoutline" className="w-full">
              Proceed to Cart
            </Button>
          </Link>
        </div>

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
  );
};

export default CourseCardDetail;
