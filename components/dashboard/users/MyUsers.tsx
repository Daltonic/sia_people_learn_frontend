"use client";

import { _useContext } from "@/context/Context";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaCheck, FaTimes } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";

interface IDbUser {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  userType: "admin" | "instructor" | "user";
  imgUrl?: string;
  requests: {
    _id: string;
    requestType: "UserUpgradeRequent" | "UserDowngradeRequest";
    status: "pending" | "approved" | "rejected";
  }[];
}

const MyUsers: React.FC = () => {
  const router = useRouter();
  const { user, setUser } = _useContext();

  useEffect(() => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
    if (!user) {
      setUser(sessionUser);
    }
  }, [setUser, user]);

  const [dbUsers, setDbUsers] = useState<IDbUser[]>([]);

  useEffect(() => {
    if (!user || user.userType !== "admin") {
      router.push("/login");
    }
  }, [router, user]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const requestDetails = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        };

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/users`,
          requestDetails
        );

        if (response.status === 400) {
          alert("Something went wrong");
        }

        const { users, isNext, numOfPages } = await response.json();
        setDbUsers(users);
      } catch (e: any) {
        console.log(e.message);
      }
    };
    getUsers();
  }, []);

  const handleRequestAction = async (
    userId: string,
    requestId: string,
    action: "approved" | "rejected"
  ) => {
    try {
      const requestObject = {
        userId,
        requestId,
        status: action,
        upgradeUserTo: "instructor",
      };
      const requestDetails = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(requestObject),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/users/upgrade`,
        requestDetails
      );

      if (response.status === 400) {
        alert("Something went wrong");
      }

      const message = await response.text();
      alert(message);
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
              {dbUsers.map((user) => (
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
                        user.requests[0]?.requestType
                      )}`}
                    >
                      {user.requests[0]?.requestType || "No Request"}
                    </h4>
                  </td>
                  <td className=" text-center">
                    <h4 className="font-medium text-[#4F547B]">
                      {user.requests[0]?.status || "N/A"}
                    </h4>
                  </td>
                  <td className="">
                    <div className="flex gap-3 justify-center items-center">
                      <button
                        className="p-1 text-sm rounded-full text-red-500 bg-red-100 cursor-pointer"
                        onClick={() =>
                          handleRequestAction(
                            user._id,
                            user.requests[0]._id,
                            "rejected"
                          )
                        }
                        disabled={
                          user.requests.length === 0 ||
                          user.requests[0].status !== "pending"
                        }
                      >
                        <FaTimes />
                      </button>
                      <button
                        className="p-1 text-sm rounded-full text-green-500 bg-green-100 cursor-pointer"
                        onClick={() =>
                          handleRequestAction(
                            user._id,
                            user.requests[0]._id,
                            "approved"
                          )
                        }
                        disabled={
                          user.requests.length === 0 ||
                          user.requests[0].status !== "pending"
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
