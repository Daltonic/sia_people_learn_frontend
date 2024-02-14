"use client";

import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/userSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaCheck, FaTimes } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { IUsers, RootState } from "@/utils/type.dt";
import { toast } from "react-toastify";
import { upgradeUser } from "@/services/backend.services";

const MyUsers: React.FC<{ usersObj: IUsers }> = ({ usersObj }) => {
  const dispatch = useDispatch();
  const { setUserData } = userActions;
  const { userData } = useSelector((states: RootState) => states.userStates);

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
      if (sessionUser) {
        dispatch(setUserData(sessionUser));
      }
    }
  }, [dispatch, setUserData, userData]);

  const handleRequestAction = async (
    userId: string,
    requestId: string,
    action: "approved" | "rejected"
  ) => {
    try {
      await toast.promise(
        new Promise<void>(async (resolve, reject) => {
          const status = await upgradeUser({
            userId,
            requestId,
            status: action,
            upgradeUserTo: "instructor",
          });

          if (status === 200) {
            resolve();
          } else {
            reject();
          }
        }),
        {
          pending: `Upgrading...`,
          success: `Upgrade successful 👌`,
          error: "Encountered error 🤯",
        }
      );
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  function getRequestClass(request: string) {
    switch (request) {
      case "pending":
        return "text-yellow-300";
      case "approved":
        return "text-green-400";
      case "rejected":
        return "text-red-400";
      default:
        return "";
    }
  }

  return (
    <div className="">
      <div className="mb-10 md:mb-16  px-5 sm:px-0">
        <h1 className="font-bold text-[#321463] text-3xl">Users List</h1>
        <p className="text-[#4F547B] text-lg">
          Access and manage all users in one place.
        </p>
      </div>
      <div className="bg-white rounded-lg">
        <div className="p-5 border-b border-[#EDEDED]">
          <div className="flex gap-5 items-center bg-white border border-[#E1DDDD] text-[#4F547B] rounded-md p-3 md:p-2 w-full mb-5 md:mb-0 md:w-96">
            <CiSearch className=" text-[#4F547B] text-xl" />
            <input
              type="text"
              placeholder="Search..."
              className="focus:outline-none w-full"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="p-5">
          <table className="table-auto w-full">
            <thead>
              <tr className="font-medium text-[#321463]">
                <th className=" text-start">User</th>
                <th className="">User Type</th>
                <th className="">Requests</th>
                <th className="">Status</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody>
              {usersObj.users.map((user) => (
                <tr key={user._id}>
                  <td className="items-center flex gap-4 mt-2">
                    <Image
                      width={0}
                      height={0}
                      className="object-cover w-10 h-10 rounded-full"
                      src={user?.imgUrl || "/images/about/learning/1.svg"}
                      alt="image"
                    />
                    <h4 className="font-medium text-[#321463]">
                      <Link href={`/instructors/${user._id}`}>
                        {`${user.firstName} ${user.lastName}`}
                      </Link>
                    </h4>
                  </td>
                  <td className=" text-center">
                    <h4 className="font-medium text-[#4F547B]">
                      {user.userType}
                    </h4>
                  </td>
                  <td className="text-center ">
                    <h4
                      className={`font-medium text-[#4F547B ${getRequestClass(
                        user!.requests!.length > 0
                          ? user.requests![0].requestType
                          : ""
                      )}`}
                    >
                      {user?.requests!.length > 0
                        ? user.requests![0].requestType
                        : "No Request"}
                    </h4>
                  </td>
                  <td className=" text-center">
                    <h4 className="font-medium text-[#4F547B]">
                      {user!.requests!.length
                        ? user.requests![0].status
                        : "N/A"}
                    </h4>
                  </td>
                  <td className="">
                    <div className="flex gap-3 justify-center items-center">
                      <button
                        className="p-1 text-sm rounded-full text-red-500 bg-red-100 cursor-pointer"
                        onClick={() =>
                          handleRequestAction(
                            user._id!,
                            user.requests![0]._id,
                            "rejected"
                          )
                        }
                        disabled={
                          user.requests!.length === 0 ||
                          user.requests![0].status !== "pending"
                        }
                      >
                        <FaTimes />
                      </button>
                      <button
                        className="p-1 text-sm rounded-full text-green-500 bg-green-100 cursor-pointer"
                        onClick={() =>
                          handleRequestAction(
                            user._id!,
                            user.requests![0]._id,
                            "approved"
                          )
                        }
                        disabled={
                          user.requests!.length === 0 ||
                          user.requests![0].status !== "pending"
                        }
                      >
                        <FaCheck />
                      </button>
                    </div>
                  </td>
                  <td className="text-[#4F547B] text-xl">
                    <IoMdMore />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyUsers;
