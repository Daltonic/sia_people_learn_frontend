"use client";
import React, { useState, useEffect } from "react";
import SearchAndFilterBar from "@/components/reusableComponents/SearchAndFilterBar";
import Courses from "./Courses";
import Academy from "./Academy";
import Books from "./Books";
import { _useContext } from "@/context/Context";

const Tabs: React.FC = () => {
  const { user } = _useContext();

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
      const requestDetails = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/academies`,
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
  }, [user?._id]);

  useEffect(() => {
    const fetchCourses = async () => {
      const requestDetails = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };

      const searchQuery = new URLSearchParams({
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
  }, [user?._id]);

  useEffect(() => {
    const fetchBooks = async () => {
      const requestDetails = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };

      const searchQuery = new URLSearchParams({
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
  }, [user?._id]);

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
          {activeTab === 1 && (
            <div className="flex p-5 gap-8 border w-full flex-wrap">
              {courses.map((elm, i: number) => (
                <Courses data={elm} index={i} key={i} />
              ))}
            </div>
          )}
          {activeTab === 2 && (
            <div className="flex p-5 gap-5 border w-full flex-wrap">
              {books.map((elm, i: number) => (
                <Books data={elm} index={i} key={i} />
              ))}
            </div>
          )}
          {activeTab === 3 && (
            <div className="flex p-5 gap-8 border w-full flex-wrap">
              {academies.map((elm, i: number) => (
                <Academy data={elm} index={i} key={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
