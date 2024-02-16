"use client";
import React from "react";
import { IUsers, RootState } from "@/utils/type.dt";
import Image from "next/image";
import Link from "next/link";

interface UsersCardProps {
    user: any; // Adjust the type of `user` as needed
}

const UsersCard: React.FC<UsersCardProps> = ({ user }) => {

    return (
        <div className="bg-white rounded-lg p-4 border-[#EDEDED] border shadow-[#EDEDED] shadow-xl w-48 space-y-2">
            <div className="flex flex-col items-center gap-4">
                <Image
                    width={100}
                    height={100}
                    className="object-cover w-20 h-20 rounded-full"
                    src={user?.imgUrl || "/images/about/learning/1.svg"}
                    alt="User Image"
                />
                <div>
                    <h4 className="font-medium text-[#321463] text-center">
                        <Link href={`/instructors/${user._id}`}>
                            {`${user.firstName} ${user.lastName}`}
                        </Link>
                    </h4>
                    <p className="text-[#4F547B] text-center">{user.userType}</p>
                </div>
            </div>
            <div className="text-sm">
                    <p className="text-[#4F547B]">
                        {user.requests.length > 0
                            ? user.requests[0].requestType
                            : "No Request"}
                    </p>
                    <p className="text-[#4F547B]">
                        {user.requests.length ? user.requests[0].status : "N/A"}
                    </p>
                </div>
                
                <div className="flex justify-center gap-3">
                    <button
                        className="p-2 w-20 text-sm rounded-md text-red-500 bg-red-100 cursor-pointer"
                        disabled={
                            user.requests.length === 0 ||
                            user.requests[0].status !== "pending"
                        }
                    >
                        Reject
                    </button>
                    <button
                        className="p-2 w-20 text-sm rounded-md text-green-500 bg-green-100 cursor-pointer"
                        disabled={
                            user.requests.length === 0 ||
                            user.requests[0].status !== "pending"
                        }
                    >
                        Approve
                    </button>
                </div>
        </div>
    );
};

export default UsersCard;
