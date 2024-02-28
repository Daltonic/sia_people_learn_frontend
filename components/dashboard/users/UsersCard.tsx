import React from "react";
import Image from "next/image";
import Link from "next/link";
import Dropdown from "@/components/reusableComponents/Dropdown";
import { IoMdMore } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

interface UsersCardProps {
    user: any; // Adjust the type of `user` as needed
}

const UsersCard: React.FC<UsersCardProps> = ({ user }) => {
    return (
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
    );
};

export default UsersCard;
