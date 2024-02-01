"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import Navbar from "@/components/layout/headers/Navbar";
import { FiShoppingCart } from "react-icons/fi";
import Button from "@/components/reusableComponents/Button";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/userSlice";
import Modal from "@/components/reusableComponents/Modal";
import PowerSVG from "@/components/dashboard/dashboardSVGs/PowerSVG";
import { useRouter } from "next/navigation";
import { RootState } from "@/utils/type.dt";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const { setUserData } = userActions;
  const { userData } = useSelector((states: RootState) => states.userStates);
  const { cartCourseItems, cartAcademyItems } = useSelector(
    (states: RootState) => states.cartStates
  );

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

  const handleLogout = () => {
    router.push("/");
    const logout = async () => {
      const requestDetails = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/sessions/logout`,
          requestDetails
        );

        if (response.status === 400) {
          const message = response.text();
        }

        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("user");
        dispatch(setUserData(null));
      } catch (e: any) {
        console.log(e.message);
        alert(e.message);
      }
    };
    logout();
  };

  return (
    <header
      className={`px-5 sm:px-10 lg:px-20 py-5 sticky h-20 top-0 w-full z-50 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div>
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                width={35}
                height={35}
                src="/images/logoImg.svg"
                alt="logo"
                className="object-cover w-10 h-10 rounded-full"
              />
              <p className="text-[#321463] text-lg md:text-md font-medium">
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

          <div className="text-white flex items-center gap-5 md:gap-10">
            <Navbar />
            <Link href="/shopcart" className="relative">
              {cartAcademyItems.length + cartCourseItems.length > 0 && (
                <div className="fixed w-6 h-6 text-white bg-[#C5165D] text-[14px] flex justify-center items-center top-[8px] p-[2px] rounded-full">
                  {cartAcademyItems.length + cartCourseItems.length}
                </div>
              )}

              <FiShoppingCart className="text-2xl text-black icon icon-basket" />
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
