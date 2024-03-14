"use client";
import React, { useState, useEffect, useRef } from "react";
import Courses from "./Courses";
import Academy from "./Academy";
import Books from "./Books";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/slices/userSlice";
import {
  FetchProductsParams,
  IAcademies,
  ICourses,
  RootState,
} from "@/utils/type.dt";
import { CiSearch } from "react-icons/ci";
import LocalFilters from "@/components/reusableComponents/LocalFilter";
import { fetchAcademies, fetchCourses } from "@/services/backend.services";
import LocalPagination from "@/components/reusableComponents/LocalPagination";
import EmptyComponent from "@/components/reusableComponents/EmptyComponent";

const sortOptions = [
  { name: "Newest", value: "newest" },
  { name: "Oldest", value: "oldest" },
];

const booleanOptions = [
  { name: "Status", value: "Status" },
  { name: "All", value: "All" },
  { name: "True", value: "true" },
  { name: "False", value: "false" },
];

const filterOptions = [
  { name: "Difficulty", value: "Difficulty" },
  { name: "All", value: "All" },
  { name: "Beginner", value: "Beginner" },
  { name: "Intermediate", value: "Intermediate" },
  { name: "Advanced", value: "Advanced" },
];

interface Props {
  academiesData: IAcademies;
  coursesData: ICourses;
  booksData: ICourses;
}

const Tabs: React.FC<Props> = ({ academiesData, coursesData, booksData }) => {
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

  const [activeTab, setActiveTab] = useState<number>(1);
  const [coursesObj, setCoursesObj] = useState<ICourses>(coursesData);
  const [booksObj, setBooksObj] = useState<ICourses>(booksData);
  const [academiesObj, setAcademiesObj] = useState<IAcademies>(academiesData);
  const [type, setType] = useState<"Course" | "Book" | "Academy">("Course");

  const [search, setSearch] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("All");
  const [sort, setSort] = useState<string>("newest");
  const [deleted, setDeleted] = useState<string>("");
  const [approved, setApproved] = useState<string>("");
  const [searchPlaceholder, setSearchPlaceholder] = useState<string>(
    "Search Courses Here..."
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState(coursesObj.numOfPages);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
    if (tabNumber === 1) {
      setType("Course");
      setSearchPlaceholder("Search Courses Here...");
      setPageNumbers(coursesObj.numOfPages);
      setCurrentPage(1);
    }
    if (tabNumber === 2) {
      setType("Book");
      setSearchPlaceholder("Search Books Here...");
      setPageNumbers(booksObj.numOfPages);
      setCurrentPage(1);
    }
    if (tabNumber === 3) {
      setType("Academy");
      setSearchPlaceholder("Search Academies Here...");
      setPageNumbers(academiesObj.numOfPages);
      setCurrentPage(1);
    }
  };

  const updateSearch = async () => {
    const token = sessionStorage.getItem("accessToken") as string;
    try {
      if (activeTab === 1 || activeTab === 2) {
        const result = await fetchCourses(
          {
            type: type as FetchProductsParams["type"],
            searchQuery: search,
            filter: sort as FetchProductsParams["filter"],
            page: Number(currentPage) || 1,
            difficulty:
              difficulty === "All"
                ? null
                : (difficulty as FetchProductsParams["difficulty"]),
            deleted:
              deleted === "All"
                ? null
                : (deleted as FetchProductsParams["deleted"]),
            approved:
              approved === "All"
                ? null
                : (approved as FetchProductsParams["approved"]),
          },
          token
        );
        if (activeTab === 1) {
          setCoursesObj(result);
        } else {
          setBooksObj(result);
        }
      } else {
        const result = await fetchAcademies(
          {
            searchQuery: search,
            filter: sort as FetchProductsParams["filter"],
            page: Number(currentPage) || 1,
            difficulty:
              difficulty === "All"
                ? null
                : (difficulty as FetchProductsParams["difficulty"]),
            deleted:
              deleted === "All"
                ? null
                : (deleted as FetchProductsParams["deleted"]),
            approved:
              approved === "All"
                ? null
                : (approved as FetchProductsParams["approved"]),
          },
          token
        );
        setAcademiesObj(result);
      }
    } catch (e: any) {
      console.log(e);
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
  }, [search, currentPage, sort, difficulty, deleted, approved]);

  return (
    <div className="bg-white p-5 rounded-xl h-full w-screen sm:w-full ">
      <div className="mb-4">
        <div className="flex gap-5 items-center border border-[#E1DDDD] text-[#4F547B] rounded-md p-3 md:p-2 w-full md:w-80">
          <CiSearch className="text-[#4F547B] text-xl" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="focus:outline-none w-full text-sm bg-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-start gap-5 mt-3 overflow-x-auto w-full">
          <LocalFilters
            label="Filter"
            options={filterOptions}
            currFilter={difficulty}
            setCurrFilter={setDifficulty}
          />
          <LocalFilters
            label="Deleted"
            options={booleanOptions}
            currFilter={deleted}
            setCurrFilter={setDeleted}
          />
          <LocalFilters
            label="Filter"
            options={booleanOptions}
            currFilter={approved}
            setCurrFilter={setApproved}
          />
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
          className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${activeTab === 1
            ? "border-[#C5165D] text-[#C5165D]"
            : "border-transparent hover:border-gray-200"
            }`}
          type="button"
        >
          Courses
        </button>
        <button
          onClick={() => handleTabClick(2)}
          className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${activeTab === 2
            ? "border-[#C5165D] text-[#C5165D]"
            : "border-transparent hover:border-gray-200"
            }`}
          type="button"
        >
          Books
        </button>
        <button
          onClick={() => handleTabClick(3)}
          className={`py-2 border-b-4 transition-colors duration-300 text-[#4F547B] font-medium ${activeTab === 3
            ? "border-[#C5165D] text-[#C5165D]"
            : "border-transparent hover:border-gray-200"
            }`}
          type="button"
        >
          Academy
        </button>
      </div>

      <div className="py-4 text-[#4F547B] w-full">
        {activeTab === 1 && (
          <div className="flex-col sm:flex-row flex justify-between gap-5 w-full flex-wrap">
            {coursesObj &&
              coursesObj.courses &&
              coursesObj.courses.length > 0 ? (
              coursesObj.courses.map((elm, i: number) => (
                <Courses data={elm} index={i} key={i} />
              ))
            ) : (
              <EmptyComponent
                title="No Courses Available"
                buttonText="Create One Now"
              />
            )
            }
          </div>
        )}
        {activeTab === 2 && (
          <div className="flex gap-5 w-full flex-wrap">
            {booksObj.courses.length > 0 ? (
              booksObj.courses.map((elm, i: number) => (
                <Books data={elm} index={i} key={i} />
              ))
            ) : (
              <>
                <EmptyComponent
                  title="No Books Available"
                  buttonText="Create One Now"
                />
              </>
            )}
          </div>
        )}
        {activeTab === 3 && (
          <div className="flex gap-5 justify-between w-full flex-wrap">
            {academiesObj.academies.length > 0 ? (
              academiesObj.academies.map((elm, i: number) => (
                <Academy data={elm} index={i} key={i} />
              ))
            ) : (
              <>
                <EmptyComponent
                  title="No Academies Available"
                  buttonText="Create One Now"
                />
              </>
            )}
          </div>
        )}
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
