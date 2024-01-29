import React, { useEffect } from "react";
import ReviewSection from "./ReviewSection";
import SearchAndFilterBar from "@/components/reusableComponents/SearchAndFilterBar";
import { _useContext } from "@/context/Context";
import DashboardHeading from "../dashboardLayout/DashboardHeading";

const AllReviews: React.FC = () => {
  const { user, setUser } = _useContext();

  useEffect(() => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
    if (!user) {
      setUser(sessionUser);
    }
  }, [setUser, user]);
  return (
    <div> 
      <DashboardHeading title="Reviews" description=" Read and respond to reviews about your courses." />
      <div className="bg-white rounded-lg ">
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
      </div>
    </div>
  );
};

export default AllReviews;
