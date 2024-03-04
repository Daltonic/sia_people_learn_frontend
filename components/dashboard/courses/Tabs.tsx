"use client";
import React, { useEffect, useRef, useState } from "react";
import MyCourseCard from "./MyCourseCard";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/slices/userSlice";
import {
  FetchUserSubscriptionsParams,
  IUserSubscriptions,
  RootState,
} from "@/utils/type.dt";
import EmptyComponent from "@/components/reusableComponents/EmptyComponent";
import LocalFilters from "@/components/reusableComponents/LocalFilter";
import LocalPagination from "@/components/reusableComponents/LocalPagination";
import { fetchUserSubscriptions } from "@/services/backend.services";

const sortOptions = [
  { name: "Newest", value: "newest" },
  { name: "Oldest", value: "oldest" },
];

interface Props {
  academiesSubObj: IUserSubscriptions;
  coursesSubObj: IUserSubscriptions;
}

const Tabs: React.FC<Props> = ({ academiesSubObj, coursesSubObj }) => {
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

  const [coursesSubs, setCoursesSubs] =
    useState<IUserSubscriptions>(coursesSubObj);
  const [academiesSubs, setAcademiesSubs] =
    useState<IUserSubscriptions>(academiesSubObj);
  const [sort, setSort] = useState<string>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState(coursesSubObj.numOfPages);
  const [type, setType] = useState<"Course" | "Book" | "Academy">("Course");

  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
    if (tabNumber === 1) {
      setType("Course");
      setPageNumbers(coursesSubs.numOfPages);
      setCurrentPage(1);
    } else {
      setType("Academy");
      setPageNumbers(academiesSubs.numOfPages);
      setCurrentPage(1);
    }
  };

  const updateSearch = async () => {
    const token = sessionStorage.getItem("accessToken") as string;
    try {
      const result = await fetchUserSubscriptions(
        {
          productType: type as FetchUserSubscriptionsParams["productType"],
          filter: sort as FetchUserSubscriptionsParams["filter"],
          page: Number(pageNumbers) | 1,
        },
        token
      );
      if (activeTab === 1) {
        setCoursesSubs(result);
      } else {
        setAcademiesSubs(result);
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      console.log("Initial");
      return;
    }
    updateSearch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, sort]);

  return (
    <div className="bg-white p-5 rounded-xl">
      <div className="">
        <div className="flex items-center justify-end">
          <div className="max-w-[400px]">
            <LocalFilters
              label="Order By"
              options={sortOptions}
              currFilter={sort}
              setCurrFilter={setSort}
            />
          </div>
        </div>
        <div className="flex space-x-5 border-b">
          <button
            onClick={() => handleTabClick(1)}
            className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${
              activeTab === 1
                ? "border-[#C5165D] text-[#C5165D]"
                : "border-transparent hover:border-gray-200"
            }`}
            type="button"
          >
            My Courses
          </button>
          <button
            onClick={() => handleTabClick(2)}
            className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${
              activeTab === 2
                ? "border-[#C5165D] text-[#C5165D]"
                : "border-transparent hover:border-gray-200"
            }`}
            type="button"
          >
            My Academies
          </button>
        </div>

        <div className="py-4 text-[#4F547B]">
          {activeTab === 1 ? (
            <div className="flex justify-between w-full flex-wrap gap-5">
              {coursesSubs.subscriptions &&
              coursesSubs.subscriptions.length > 0 ? (
                coursesSubs.subscriptions.map((sub, i: number) => (
                  <MyCourseCard
                    product={sub}
                    index={i}
                    key={sub._id}
                    productType={sub.productType}
                  />
                ))
              ) : (
                <EmptyComponent
                  title="No Courses Subscribed"
                  buttonText="Explore Courses"
                  link="/courses"
                />
              )}
            </div>
          ) : (
            <div className="flex justify-between w-full flex-wrap gap-5">
              {academiesSubs.subscriptions &&
              academiesSubs.subscriptions.length > 0 ? (
                academiesSubs.subscriptions.map((sub, i: number) => (
                  <MyCourseCard
                    product={sub}
                    index={i}
                    key={sub._id}
                    productType={sub.productType}
                  />
                ))
              ) : (
                <EmptyComponent
                  title="No Academies Subscribed"
                  buttonText="Explore Academies"
                  link="/academies"
                />
              )}
            </div>
          )}
        </div>
      </div>
      {pageNumbers > 1 && (
        <LocalPagination
          totalPages={pageNumbers}
          activePage={currentPage}
          setActivePage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Tabs;
