"use client";
import React, { useEffect, useState } from "react";
import MyCourseCard from "./MyCourseCard";
import { coursesData } from "@/data/courses";
import SearchAndFilterBar from "@/components/reusableComponents/SearchAndFilterBar";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/userSlice";
import { IUserSubscriptions, RootState } from "@/utils/type.dt";
import EmptyComponent from "@/components/reusableComponents/EmptyComponent";

const Tabs: React.FC = () => {
  const dispatch = useDispatch();
  const { setUserData } = userActions;
  const { userData } = useSelector((states: RootState) => states.userStates);
  const [coursesSubs, setCoursesSubs] = useState<IUserSubscriptions>({
    subscriptions: [],
    isNext: false,
    numOfPages: 0,
  });

  const [academiesSubs, setAcademiesSubs] = useState<IUserSubscriptions>({
    subscriptions: [],
    isNext: false,
    numOfPages: 0,
  });

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
      if (sessionUser) {
        dispatch(setUserData(sessionUser));
      }
    }
  }, [dispatch, setUserData, userData]);
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const requestDetails = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/subscriptions/user?productType=Course`,
          requestDetails
        );

        if (response.status === 400) {
          alert("Something went wrong");
        } else {
          const { subscriptions, numOfPages, isNext } =
            (await response.json()) as IUserSubscriptions;
          setCoursesSubs({
            subscriptions,
            isNext,
            numOfPages,
          });
        }
      } catch (e: any) {
        console.log(e.message);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchAcademies = async () => {
      const requestDetails = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/subscriptions/user?productType=Academy`,
          requestDetails
        );

        if (response.status === 400) {
          alert("Something went wrong");
        } else {
          const { subscriptions, numOfPages, isNext } =
            (await response.json()) as IUserSubscriptions;
          setAcademiesSubs({
            subscriptions,
            isNext,
            numOfPages,
          });
        }
      } catch (e: any) {
        console.log(e.message);
      }
    };
    fetchAcademies();
  }, []);
  console.log(coursesSubs);

  return (
    <div className="bg-white p-5 rounded-xl">
      <div className="">
        <SearchAndFilterBar />
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
                  <MyCourseCard product={sub} index={i} key={sub._id} />
                ))
              ) : (
                <EmptyComponent
                  title="No Courses Subscribed"
                  buttonText="Explore Courses"
                />
              )}
            </div>
          ) : (
            <div className="flex justify-between w-full flex-wrap gap-5">
              {academiesSubs.subscriptions &&
              academiesSubs.subscriptions.length > 0 ? (
                academiesSubs.subscriptions.map((sub, i: number) => (
                  <MyCourseCard product={sub} index={i} key={sub._id} />
                ))
              ) : (
                <EmptyComponent
                  title="No Academies Subscribed"
                  buttonText="Explore Academies"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
