import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaRegMoon } from "react-icons/fa";
import { CiMaximize2 } from "react-icons/ci";
import { HiOutlineBell, HiOutlineShoppingBag } from "react-icons/hi2";
import { HiOutlineMail } from "react-icons/hi";
import { FaBarsStaggered } from "react-icons/fa6";
import DashBoardSidebar from "./DashBoardSidebar";
import Modal from "@/components/reusableComponents/Modal";
import PowerSVG from "../dashboardSVGs/PowerSVG";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/utils/type.dt";
import { userActions } from "@/store/userSlice";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { logout } from "@/services/backend.services";

type SidebarProps = {};

const DashBoardHeader: React.FC<SidebarProps> = () => {
  const dispatch = useDispatch();
  const { setUserData } = userActions;
  const { userData } = useSelector((states: RootState) => states.userStates);

  const cookies = new Cookies();

  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
      if (sessionUser) {
        dispatch(setUserData(sessionUser));
      }
    }
  }, [dispatch, setUserData, userData]);

  const handleToggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const toggleSidebar = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
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
    <div
      className="flex justify-between items-center p-5 sm:px-10 sticky h-20 top-0 w-full z-50 bg-white"
      onClick={isOpen ? closeSidebar : undefined}
    >
      <div className="flex gap-4 items-center">
        <div
          className="block md:hidden text-[#321463] text-3xl"
          onClick={toggleSidebar}
        >
          <FaBarsStaggered />
        </div>
        <div>
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
                width={35}
                height={35}
                src="/images/logoImg.svg"
                alt="logo"
              />
              <p className="text-[#321463] text-lg md:text-md font-medium">
                Dapp Mentors
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="hidden md:flex items-center text-[#6A7A99] text-lg relative">
        <div className="hover:bg-[#F7F8FB] p-4 rounded-xl hover:text-[#C5165D]">
          <FaRegMoon />
        </div>
        <Link href="/blogs">
          <div className="hover:bg-[#F7F8FB] p-4 rounded-xl hover:text-[#C5165D]">
            <CiMaximize2 />
          </div>
        </Link>

        <div className="hover:bg-[#F7F8FB] p-4 rounded-xl hover:text-[#C5165D]">
          <HiOutlineShoppingBag />
        </div>
        <div className="hover:bg-[#F7F8FB] p-4 rounded-xl hover:text-[#C5165D]">
          <HiOutlineMail />
        </div>
        <div className="hover:bg-[#F7F8FB] p-4 rounded-xl hover:text-[#C5165D]">
          <HiOutlineBell />
        </div>
        <div className="">
          {userData && (
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
          )}

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
        </div>
      </div>
      <div className="md:hidden">
        <DashBoardSidebar isOpen={isOpen} />
      </div>
    </div>
  );
};

export default DashBoardHeader;
