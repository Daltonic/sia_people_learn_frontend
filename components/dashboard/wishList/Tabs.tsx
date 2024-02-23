"use client";

import { userActions } from "@/store/actions/userActions";
import { IWishlist, RootState } from "@/utils/type.dt";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookmarkCard from "./BookmarkCard";
import EmptyComponent from "@/components/reusableComponents/EmptyComponent";

interface Props {
  academiesData: IWishlist[];
  coursesData: IWishlist[];
}

const Tabs: React.FC<Props> = ({ academiesData, coursesData }) => {
  const dispatch = useDispatch();
  const { setUserData } = userActions;
  const { userData } = useSelector((states: RootState) => states.userStates);

  const [activeTab, setActiveTab] = useState<number>(1);
  const [subbedCourses, setSubedCourses] = useState<IWishlist[]>(coursesData);
  const [subbedAcademies, setSubbedAcademies] =
    useState<IWishlist[]>(academiesData);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="bg-white p-5 rounded-xl">
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
          Academies
        </button>
      </div>

      <div className="py-4 text-[#4F547B]">
        {activeTab === 1 && (
          <div className="flex justify-between gap-5 w-full flex-wrap">
            {subbedCourses && subbedCourses.length > 0 ? (
              subbedCourses.map((elm) => (
                <BookmarkCard data={elm} key={elm._id} type={"Course"} />
              ))
            ) : (
              <EmptyComponent
                title="No Bookmarked Course"
                buttonText="Create One Now"
              />
            )}
          </div>
        )}

        {activeTab === 2 && (
          <div className="flex justify-between gap-5 w-full flex-wrap">
            {subbedAcademies && subbedAcademies.length > 0 ? (
              subbedAcademies.map((elm) => (
                <BookmarkCard data={elm} key={elm._id} type={"Academy"} />
              ))
            ) : (
              <EmptyComponent
                title="No Bookmarked Academy"
                buttonText="Create One Now"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
