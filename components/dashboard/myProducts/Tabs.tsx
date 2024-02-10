"use client";
import React, { useEffect, useState } from "react";
import MyCourseCard from "./MyCourseCard";
import SearchAndFilterBar from "@/components/reusableComponents/SearchAndFilterBar";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/userSlice";
import { RootState } from "@/utils/type.dt";
import EmptyComponent from "@/components/reusableComponents/EmptyComponent";
import { usePathname, useSearchParams } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import SearchInput from "@/components/reusableComponents/SearchInput";
import { URLSearchParams } from "url";
import Pagination from "@/components/reusableComponents/Pagination";

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

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const page = searchParams.get("page");

  const [search, setSearch] = useState<string>(query || "");

  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [courses, setCourses] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [academies, setAcademies] = useState<any[]>([]);
  const [academiesPages, setAcademiesPages] = useState<number>(0);
  const [coursesPages, setCoursesPages] = useState<number>(0);
  const [booksPages, setBooksPages] = useState<number>(0);
  const [pageNumbers, setPageNumbers] = useState(coursesPages);
  const [type, setType] = useState<"Course" | "Book" | "Academy">("Course");
  const [searchPlaceholder, setSearchPlaceholder] = useState<string>(
    "Search Courses Here..."
  );

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
    if (tabNumber === 1) {
      setType("Course");
      setSearchPlaceholder("Search Courses Here...");
      setPageNumbers(coursesPages);
    }
    if (tabNumber === 2) {
      setType("Book");
      setSearchPlaceholder("Search Books Here...");
      setPageNumbers(booksPages);
    }
    if (tabNumber === 3) {
      setType("Academy");
      setSearchPlaceholder("Search Academies Here...");
      setPageNumbers(academiesPages);
    }
  };

  useEffect(() => {
    const requestDetails = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    };

    if (search) {
      const delaydebounceFn = setTimeout(() => {
        const updateSearch = async () => {
          let url: string;
          if (activeTab === 1) {
            url = `${
              process.env.NEXT_PUBLIC_BACKEND_URI
            }/api/v1/courses?instructor=${userData?._id!}&type=Course&searchQuery=${search}&page=${Number(
              page || 1
            )}`;
          } else if (activeTab === 2) {
            url = `${
              process.env.NEXT_PUBLIC_BACKEND_URI
            }/api/v1/courses?instructor=${userData?._id!}&type=Book&searchQuery=${search}&page=${Number(
              page || 1
            )}`;
          } else {
            url = `${
              process.env.NEXT_PUBLIC_BACKEND_URI
            }/api/v1/academies?instructor=${userData?._id!}&searchQuery=${search}&page=${Number(
              page || 1
            )}`;
          }

          try {
            const response = await fetch(url, requestDetails);

            if (response.status === 400) {
              alert("Something went wrong");
            }

            if (activeTab === 1) {
              const { courses, numOfPages } = await response.json();
              setCourses(courses);
              setCoursesPages(numOfPages);
            } else if (activeTab === 2) {
              const { courses, numOfPages } = await response.json();
              setBooks(courses);
              setBooksPages(numOfPages);
            } else {
              const { academies, numOfPages } = await response.json();
              setAcademies(academies);
              setAcademiesPages(numOfPages);
            }
          } catch (e: any) {
            console.log(e.message);
          }
        };

        updateSearch();
      }, 300);

      return () => clearTimeout(delaydebounceFn);
    } else {
      const getProducts = async () => {
        if (initialLoading) {
          // Fetch Academies at initial state
          const academiesResponse = await fetch(
            `${
              process.env.NEXT_PUBLIC_BACKEND_URI
            }/api/v1/academies?instructor=${userData?._id!}`,
            requestDetails
          );

          if (academiesResponse.status === 400) {
            alert("Something went wrong");
          }

          const { academies, numOfPages: academiesPages } =
            await academiesResponse.json();
          setAcademies(academies);
          setAcademiesPages(academiesPages);

          //Fetch Courses
          const coursesResponse = await fetch(
            `${
              process.env.NEXT_PUBLIC_BACKEND_URI
            }/api/v1/courses?instructor=${userData?._id!}&type=Course`,
            requestDetails
          );

          if (coursesResponse.status === 400) {
            alert("Something went wrong");
          }

          const { courses, numOfPages: coursesPages } =
            await coursesResponse.json();
          setCourses(courses);
          setCoursesPages(coursesPages);

          // Fetch Books
          const booksResponse = await fetch(
            `${
              process.env.NEXT_PUBLIC_BACKEND_URI
            }/api/v1/courses?instructor=${userData?._id!}&type=Book`,
            requestDetails
          );

          if (booksResponse.status === 400) {
            alert("Something went wrong");
          }

          const { courses: books, numOfPages: booksPages } =
            await booksResponse.json();
          setBooks(books);
          setBooksPages(booksPages);

          setInitialLoading(false);
        } else {
          let url: string;
          if (activeTab === 1) {
            url = `${
              process.env.NEXT_PUBLIC_BACKEND_URI
            }/api/v1/courses?instructor=${userData?._id!}&type=Course&page=${Number(
              page || 1
            )}`;
          } else if (activeTab === 2) {
            url = `${
              process.env.NEXT_PUBLIC_BACKEND_URI
            }/api/v1/courses?instructor=${userData?._id!}&type=Book&page=${Number(
              page || 1
            )}`;
          } else {
            url = `${
              process.env.NEXT_PUBLIC_BACKEND_URI
            }/api/v1/academies?instructor=${userData?._id!}&page=${Number(
              page || 1
            )}`;
          }

          try {
            const response = await fetch(url, requestDetails);

            if (response.status === 400) {
              alert("Something went wrong");
            }

            if (activeTab === 1) {
              const { courses, numOfPages } = await response.json();
              setCourses(courses);
              setCoursesPages(numOfPages);
            } else if (activeTab === 2) {
              const { courses, numOfPages } = await response.json();
              setBooks(courses);
              setBooksPages(numOfPages);
            } else {
              const { academies, numOfPages } = await response.json();
              setAcademies(academies);
              setAcademiesPages(numOfPages);
            }
          } catch (e: any) {
            console.log(e.message);
          }
        }
      };
      getProducts();
    }
  }, [activeTab, search, userData?._id, pathname, query, page, initialLoading]);

  return (
    <div className="bg-white p-5 rounded-xl">
      <div className="">
        <div className="flex gap-5 items-center border border-[#E1DDDD] text-[#4F547B] rounded-md p-3 md:p-2 w-full mb-5 md:mb-0 md:w-96">
          <CiSearch className="text-[#4F547B] text-xl" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
            <div className="flex justify-between gap-5 w-full flex-wrap">
              {courses && courses.length > 0 ? (
                courses.map((elm, i: number) => (
                  <MyCourseCard data={elm} key={i} type={type} />
                ))
              ) : (
                <EmptyComponent
                  title="No Products Available"
                  buttonText="Create One Now"
                />
              )}
            </div>
          )}

          {activeTab === 2 && (
            <div className="flex justify-between gap-5 w-full flex-wrap">
              {books && books.length > 0 ? (
                books.map((elm, i: number) => (
                  <MyCourseCard data={elm} key={i} type={type} />
                ))
              ) : (
                <EmptyComponent
                  title="No Products Available"
                  buttonText="Create One Now"
                />
              )}
            </div>
          )}
          {activeTab === 3 && (
            <div className="flex justify-between gap-5 w-full flex-wrap">
              {academies && academies.length > 0 ? (
                academies.map((elm, i: number) => (
                  <MyCourseCard data={elm} key={i} type={type} />
                ))
              ) : (
                <EmptyComponent
                  title="No Products Available"
                  buttonText="Create One Now"
                />
              )}
            </div>
          )}
        </div>
      </div>
      {pageNumbers > 1 && <Pagination totalPages={pageNumbers} />}
    </div>
  );
};
export default Tabs;
