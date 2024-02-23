"use client";
import React, { useEffect, useState } from "react";
import SearchAndFilterBar from "@/components/reusableComponents/SearchAndFilterBar";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/slices/userSlice";
import { RootState } from "@/utils/type.dt";
import EmptyComponent from "@/components/reusableComponents/EmptyComponent";
import ProductCard from "./ProductCard";

const Tabs: React.FC = () => {
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

  const [activeTab, setActiveTab] = useState<number>(1);
  const [courses, setCourses] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [academies, setAcademies] = useState<any[]>([]);
  const [tabData, setTabData] = useState<any[]>([]);
  const [type, setType] = useState<"Course" | "Book" | "Academy">("Course");

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
    if (tabNumber === 1) {
      setTabData(courses);
      setType("Course");
    }
    if (tabNumber === 2) {
      setTabData(books);
      setType("Book");
    }
    if (tabNumber === 3) {
      setTabData(academies);
      setType("Academy");
    }
  };

  useEffect(() => {
    const fetchAcademies = async () => {
      if (!userData) return;
      const requestDetails = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };

      const searchQuery = new URLSearchParams({
        instructor: userData?._id!,
      });

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/academies?${searchQuery}`,
          requestDetails
        );

        if (response.status === 400) {
          alert("Something went wrong");
        }

        const { academies, isNext, numOfPages } = await response.json();
        setAcademies(academies);
      } catch (e: any) {
        alert(e.message);
        console.log(e.message);
      }
    };
    fetchAcademies();
  }, [userData]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!userData) return;
      const requestDetails = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };

      const searchQuery = new URLSearchParams({
        instructor: userData?._id!,
        type: "Course",
      });

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/courses?${searchQuery}`,
          requestDetails
        );

        if (response.status === 400) {
          alert("Something went wrong");
        }

        const { courses, isNext, numOfPages } = await response.json();
        setCourses(courses);
        setTabData(courses);
      } catch (e: any) {
        alert(e.message);
        console.log(e.message);
      }
    };
    fetchCourses();
  }, [userData]);

  useEffect(() => {
    if (!userData) return;
    const fetchBooks = async () => {
      const requestDetails = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };

      const searchQuery = new URLSearchParams({
        instructor: userData?._id!,
        type: "Book",
      });

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/courses?${searchQuery}`,
          requestDetails
        );

        if (response.status === 400) {
          alert("Something went wrong");
        }

        const { courses, isNext, numOfPages } = await response.json();
        setBooks(courses);
      } catch (e: any) {
        alert(e.message);
        console.log(e.message);
      }
    };
    fetchBooks();
  }, [userData]);

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
            Courses
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
            Books
          </button>
          <button
            onClick={() => handleTabClick(3)}
            className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${
              activeTab === 3
                ? "border-[#C5165D] text-[#C5165D]"
                : "border-transparent hover:border-gray-200"
            }`}
            type="button"
          >
            Academy
          </button>
        </div>

        <div className="py-4 text-[#4F547B]">
          <div className="flex justify-between gap-5 w-full flex-wrap">
            {tabData && tabData.length > 0 ? (
              tabData.map((elm, i: number) => (
                <ProductCard data={elm} key={i} type={type} />
              ))
            ) : (
              <EmptyComponent
                title="No Products Available"
                buttonText="Create One Now"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Tabs;
