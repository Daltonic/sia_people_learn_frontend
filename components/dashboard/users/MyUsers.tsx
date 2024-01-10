import { teamMembers } from "@/data/instructors";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdMore } from "react-icons/io";

const MyUsers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  function getRequestClass(request: string) {
    switch (request) {
      case 'Requested':
        return 'text-yellow-300';
      case 'Accepted':
        return 'text-green-400';
      case 'Declined':
        return 'text-red-400';
      default:
        return '';
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
              className="focus:outline-none"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="p-5">
          <table className="table-auto w-full">
            <thead>
              <tr className="font-medium text-[#321463]">
                <th className="w-1/3 text-start">User</th>
                <th className="w-1/3">User Type</th>
                <th className="w-1/3">Instructor Request</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member, index) => (
                <tr key={index}>
                  <td className="items-center py-2 flex gap-4">
                    <Image
                      width={0}
                      height={0}
                      className="object-cover w-10 h-10 rounded-full"
                      src={member.image}
                      alt="image"
                    />
                    <h4 className="font-medium text-[#321463]">
                      <Link href={`/instructors/${member.id}`}>
                        {member.name}
                      </Link>
                    </h4>
                  </td>
                  <td className="w-1/3 text-center">
                    <h4 className="font-medium text-[#4F547B]">{member.type}</h4>
                  </td>
                  <td className="text-center w-1/3  ">
                  <h4 className={`font-medium ${getRequestClass(member.request)}`}>{member.request}</h4>

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
