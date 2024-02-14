"use client";
import React, { useState, useEffect } from "react";
import SearchAndFilterBar from "@/components/reusableComponents/SearchAndFilterBar";
import Courses from "./Courses";
import Academy from "./Academy";
import Books from "./Books";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/userSlice";
import { IAcademies, ICourses, RootState } from "@/utils/type.dt";

interface Props {
  academiesObj: IAcademies;
  coursesObj: ICourses;
  booksObj: ICourses;
}

const Tabs: React.FC<Props> = ({ academiesObj, coursesObj, booksObj }) => {
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
  const [courses, setCourses] = useState<ICourses>(coursesObj);
  const [books, setBooks] = useState<ICourses>(booksObj);
  const [academies, setAcademies] = useState<IAcademies>(academiesObj);
  const [tabData, setTabData] = useState<any[]>([]);
  const [type, setType] = useState<"Course" | "Book" | "Academy">("Course");

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
    if (tabNumber === 1) {
      setTabData(courses.courses);
      setType("Course");
    }
    if (tabNumber === 2) {
      setTabData(books.courses);
      setType("Book");
    }
    if (tabNumber === 3) {
      setTabData(academies.academies);
      setType("Academy");
    }
  };

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
              {courses.courses.map((elm, i: number) => (
                <Courses data={elm} index={i} key={i} />
              ))}
            </div>
          )}
          {activeTab === 2 && (
            <div className="flex p-5 gap-5 border w-full flex-wrap">
              {books.courses.map((elm, i: number) => (
                <Books data={elm} index={i} key={i} />
              ))}
            </div>
          )}
          {activeTab === 3 && (
            <div className="flex p-5 gap-8 border w-full flex-wrap">
              {academies.academies.map((elm, i: number) => (
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
