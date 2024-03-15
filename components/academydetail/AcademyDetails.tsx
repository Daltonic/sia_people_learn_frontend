"use client";
import React, { useEffect, useState } from "react";
import { IAcademy, IWishlist, RootState } from "@/utils/type.dt";
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
import { cartActions } from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import {
  createWishlist,
  deleteWishlist,
  fetchWishlists,
  stripeSubscription,
} from "@/services/backend.services";

interface ComponentProps {
  academy: IAcademy;
}

const AcademyDetails: React.FC<ComponentProps> = ({ academy }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { userData } = useSelector((states: RootState) => states.userStates);
  const { cartAcademyItems, cartAmount } = useSelector(
    (states: RootState) => states.cartStates
  );
  const { setCartAcademyItems, setCartAmount } = cartActions;
  const dispatch = useDispatch();
  const [purchased, setPurchased] = useState<boolean>(false);
  const [canBookmarked, setCanBookmarked] = useState<boolean>(true);
  const [bookmarked, setBookmarked] = useState<IWishlist | null>(null);
  const [buttonText, setButtonText] = useState<string>(() => {
    const currentAcademy = cartAcademyItems.find(
      (item) => item._id === academy._id
    );
    return currentAcademy ? "Remove from Cart" : "Add to Cart";
  });

  useEffect(() => {
    const currentAcademy = cartAcademyItems.find(
      (item) => item._id === academy._id
    );
    setButtonText(currentAcademy ? "Remove from Cart" : "Add to Cart");
  }, [academy._id, cartAcademyItems]);

  // Fetch bookmarked academiess when userData changes
  useEffect(() => {
    if (!userData) return;
    const isSubscribed = userData.subscribedAcademies.includes(academy?._id!);
    if (isSubscribed) {
      setPurchased(true);
      return;
    }
    const fetchSavedCourses = async () => {
      const token = sessionStorage.getItem("accessToken") as string;

      try {
        const academies = (await fetchWishlists(
          { productType: "Academy" },
          token
        )) as IWishlist[];

        // If bookmarked courses is returned, search through both bookmarked courses and subscribed courses to ensure that neither contains present course

        if (academies) {
          const wishAcademy = academies.find(
            (wish) => wish.productId._id === academy._id
          );

          if (wishAcademy) {
            setBookmarked(wishAcademy);
          }
          if (wishAcademy || isSubscribed) {
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
  }, [academy?._id, userData]);

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
      sessionStorage.setItem(
        "sessionAcademies",
        JSON.stringify(updatedAcademies)
      );
      const newCartAmount = cartAmount - academy.price;
      sessionStorage.setItem("cartAmount", JSON.stringify(newCartAmount));
      dispatch(setCartAmount(newCartAmount));
    } else {
      const updatedAcademies = [...cartAcademyItems, academy];
      dispatch(setCartAcademyItems(updatedAcademies));
      setButtonText("Remove from Cart");
      sessionStorage.setItem(
        "sessionAcademies",
        JSON.stringify(updatedAcademies)
      );
      const newCartAmount = cartAmount + academy.price;
      sessionStorage.setItem("cartAmount", JSON.stringify(newCartAmount));
      dispatch(setCartAmount(newCartAmount));
    }
  };

  const handleSubscribe = async () => {
    if (!userData) {
      sessionStorage.setItem("prevPath", pathname);
      router.push("/login");
    }

    try {
      const token = sessionStorage.getItem("accessToken") as string;
      await toast.promise(
        new Promise<void>((resolve, reject) => {
          stripeSubscription(academy._id, token)
            .then((result) => {
              router.push(result.url);
              resolve(result);
            })
            .catch((error) => {
              reject(error);
            });
        }),
        {
          pending: "Subscribing...",
          success: "Subscribed successfully 👌",
          error: "Encountered error 🤯",
        }
      );
    } catch (e: any) {
      console.log(e.message);
    }
  };

  // Create a bookmark
  const handleAddToWishlist = async () => {
    const token = sessionStorage.getItem("accessToken") as string;

    await toast.promise(
      new Promise<void>((resolve, reject) => {
        createWishlist(
          { productType: "Academy", productId: academy._id },
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
    const isSubscribed = userData!.subscribedAcademies.includes(academy?._id!);
    if (isSubscribed) return;
    if (canBookmarked) {
      handleAddToWishlist();
    } else {
      handleRemoveFromWishlist(isSubscribed);
    }
  };

  return (
    <div className="bg-white w-full sm:w-3/5 mx-auto md:mx-0 md:w-[25%] md:right-10 md:top-0 md:absolute md:border border-[#EDEDED] p-2 space-y-2 mt-10 rounded-md z-10">
      <div className="relative flex justify-center items-center">
        <div className="w-full">
          <Image
            width={250}
            height={250}
            style={{ height: "30%", width: "100%" }}
            className="rounded-md w-full"
            src={academy.imageUrl || "/images/general/shape.svg"}
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
          {academy.validity === 0 ? (
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

          <Button
            variant="pinkoutline"
            className="w-full mb-3"
            onClick={handleBookmarkAction}
          >
            {canBookmarked ? `Bookmark Academy` : "Remove bookmark"}
          </Button>

          {academy.validity === 0 && (
            <Link href="/shopcart">
              <Button variant="pinkoutline" className="w-full">
                Proceed to Cart
              </Button>
            </Link>
          )}
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
            <p className="text-[#4F547B]">{academy.courses.length}</p>
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
