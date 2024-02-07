import React, { useEffect } from "react";
import ReviewSection from "./ReviewSection";
import SearchAndFilterBar from "@/components/reusableComponents/SearchAndFilterBar";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/userSlice";
import DashboardHeading from "../dashboardLayout/DashboardHeading";
import { RootState } from "@/utils/type.dt";
import Tabs from "./Tabs";

const AllReviews: React.FC = () => {
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

  return (
    <div>
      <DashboardHeading
        title="Reviews"
        description=" Read and respond to reviews about your courses."
      />
      <Tabs />
      {/* <div className="bg-white rounded-lg ">
        <h1 className="p-5 text-[#321463] font-medium border-b border-[#EDEDED] text-xl md:text-base">
          All Reviews
        </h1>

        <div className="p-5">
          <SearchAndFilterBar />
          {[...Array(5)].map((_, i) => (
            <ReviewSection key={i} />
          ))}
        </div>
        <div className="text-center pb-5">
          <p className="underline text-[#C5165D] text-sm">View All Reviews</p>
        </div>
      </div> */}
    </div>
  );
};

export default AllReviews;
