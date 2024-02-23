"use client";

import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/slices/userSlice";
import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FetchUsersParams, IUsers, RootState } from "@/utils/type.dt";
import { toast } from "react-toastify";
import { fetchUsers, upgradeUser } from "@/services/backend.services";
import UsersCard from "./UsersCard";
import LocalFilters from "@/components/reusableComponents/LocalFilter";
import LocalPagination from "@/components/reusableComponents/LocalPagination";

const sortOptions = [
  { name: "Newest", value: "newest" },
  { name: "Oldest", value: "oldest" },
];

const requestOptions = [
  { name: "Request status", value: "All" },
  { name: "All", value: "All" },
  { name: "Yes", value: "true" },
  { name: "No", value: "false" },
];

const userOptions = [
  { name: "User type", value: "All" },
  { name: "All", value: "All" },
  { name: "Admin", value: "admin" },
  { name: "Instructor", value: "instructor" },
  { name: "User", value: "user" },
];

interface Props {
  initialUserObj: IUsers;
}

const MyUsers: React.FC<Props> = ({ initialUserObj }) => {
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

  const firstRender = useRef(true);

  const [usersObj, setUsersObj] = useState<IUsers>(initialUserObj);

  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("newest");
  const [userType, setUserType] = useState<string>("All");
  const [requestStatus, setRequestStatus] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);

  const updateSearch = async () => {
    const token = sessionStorage.getItem("accessToken") as string;

    try {
      const result = await fetchUsers(
        {
          searchQuery: search,
          filter: sort as FetchUsersParams["filter"],
          userType:
            userType === "All"
              ? null
              : (userType as FetchUsersParams["userType"]),
          requestStatus:
            requestStatus === "All"
              ? null
              : (requestStatus as FetchUsersParams["requestStatus"]),
          page: Number(currentPage) || 1,
        },
        token
      );

      setUsersObj(result);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (search) {
      const delaydebounceFn = setTimeout(() => {
        updateSearch();
      }, 300);

      return () => clearTimeout(delaydebounceFn);
    } else {
      updateSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, currentPage, sort, userType, requestStatus]);

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
        <div className="p-5 border-b border-[#EDEDED] flex flex-wrap items-center md:justify-between mb-4 ">
          <div className="flex gap-5 items-center bg-white border border-[#E1DDDD] text-[#4F547B] rounded-md p-3 md:p-2 w-full mb-5 md:mb-0 md:w-96">
            <CiSearch className=" text-[#4F547B] text-xl" />
            <input
              type="text"
              placeholder="Search by name and username"
              className="focus:outline-none w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <LocalFilters
            label="Filter"
            options={userOptions}
            currFilter={userType}
            setCurrFilter={setUserType}
          />
          <LocalFilters
            label="Filter"
            options={requestOptions}
            currFilter={requestStatus}
            setCurrFilter={setRequestStatus}
          />
          <LocalFilters
            label="Order By"
            options={sortOptions}
            currFilter={sort}
            setCurrFilter={setSort}
          />
        </div>
        <div className="p-5">
          <div className="flex justify-between gap-5 w-full flex-wrap">
            {usersObj.users.map((user) => (
              <UsersCard key={user._id} user={user} />
            ))}
          </div>
        </div>
        {usersObj.numOfPages > 1 && (
          <LocalPagination
            totalPages={usersObj.numOfPages}
            activePage={currentPage}
            setActivePage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default MyUsers;
