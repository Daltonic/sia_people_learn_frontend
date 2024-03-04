"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import Navbar from "@/components/layout/headers/Navbar";
import { FiShoppingCart } from "react-icons/fi";
import Button from "@/components/reusableComponents/Button";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/slices/userSlice";
import Modal from "@/components/reusableComponents/Modal";
import PowerSVG from "@/components/dashboard/dashboardSVGs/PowerSVG";
import { useRouter } from "next/navigation";
import { RootState } from "@/utils/type.dt";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { logout } from "@/services/backend.services";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { setUserData } = userActions;
  const { userData } = useSelector((states: RootState) => states.userStates);
  const { cartCourseItems, cartAcademyItems } = useSelector(
    (states: RootState) => states.cartStates
  );
  const cookies = new Cookies();

  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
      if (sessionUser) {
        dispatch(setUserData(sessionUser));
      }
    }
  }, [dispatch, setUserData, userData]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  const handleToggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const handleLogout = async () => {
    router.push("/");

    await toast.promise(
      new Promise<void>(async (resolve, reject) => {
        const status = await logout();

        if (status === 200) {
          resolve();
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("user");
          cookies.remove("accessToken");
          dispatch(setUserData(null));
        } else {
          reject();
        }
      }),
      {
        pending: "Logging out...",
        success: "Logged out successfully 👌",
        error: "Encountered error 🤯",
      }
    );
  };

  return (
    <header
      className={`px-5 py-3 sm:px-10 lg:px-20 sticky top-0 w-full z-50 ${
        isScrolled
          ? "bg-white shadow-md shadow-purple-900/10"
          : "bg-transparent"
      }`}
    >
      <div>
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                width={35}
                height={35}
                src="/images/general/logoImg.svg"
                alt="logo"
                className="object-cover w-8 h-8 rounded-full"
              />
              <p className="text-[#321463] text-lg md:text-sm font-medium">
                Dapp Mentors
              </p>
            </div>
          </Link>

          <div className="hidden md:flex">
            <form onSubmit={handleSubmit}>
              <div className="flex bg-[#F7F8FB] pl-5 py-2 pr-2 rounded-md w-80 lg:w-[10rem]">
                <input
                  required
                  type="text"
                  placeholder="Type a course name"
                  className="bg-transparent flex-1 placeholder:text-[#4F547B] placeholder:text-sm focus:outline-none"
                />
                <button type="submit">
                  <CiSearch className="text-[#1A064F] font-semiboldtext-xl" />
                </button>
              </div>
            </form>
          </div>

          <div className="text-white flex items-center gap-5 md:gap-8">
            <Navbar />
            <Link href="/shopcart" className="relative">
              <FiShoppingCart className="text-2xl text-black icon icon-basket" />
              {cartAcademyItems.length + cartCourseItems.length > 0 && (
                <div className="absolute w-3.5 h-3.5 text-white bg-red-500 text-[10px] flex justify-center items-center bottom-5 left-5 p-[2px] rounded-full">
                  {cartAcademyItems.length + cartCourseItems.length}
                </div>
              )}
            </Link>
            {userData ? (
              <>
                <div onClick={handleToggleModal} className="cursor-pointer ">
                  {userData.imgUrl ? (
                    <Image
                      width={28}
                      height={28}
                      src={userData.imgUrl}
                      alt="profile"
                      className="rounded-full "
                    />
                  ) : (
                    <div className="text-white bg-[#C5165D] text-[16px] flex items-center justify-center h-8 w-8 p-1 rounded-full">{`${userData?.firstName[0].toUpperCase()}${userData?.lastName[0].toUpperCase()}`}</div>
                  )}
                </div>
 
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                  <Link
                    href={`/(dashboard)/dashboard`}
                    className="font-medium text-center px-5 w-fit md:px-5 py-2 md:py-2 rounded-md ease-in-out delay-150 hover:-translate-y-0.5 hover:scale-105 duration-300 text-md border-2 border-[#C5165D] text-[#C5165D] hover:bg-[#C5165D] hover:text-white"
                  >
                    Dashboard
                  </Link>

                  <div className="bg-[#EDEDED] h-[1px] mt-4 w-full" />
                  <button
                    className="flex gap-2 items-center text-[#4F547B] py-2 pl-4 pr-5 font-medium"
                    onClick={handleLogout}
                  >
                    <PowerSVG /> Logout
                  </button>
                </Modal>
              </>
            ) : (
              <div className=" gap-2 hidden md:flex">
                <Link href="/login">
                  <Button variant="pinkoutline">Log in</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="pink" className="">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
