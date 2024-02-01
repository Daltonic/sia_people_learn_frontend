import React, { useEffect, useState } from "react";
import DashBoardHeader from "@/components/dashboard/dashboardLayout/DashBoardHeader";
import DashBoardSidebar from "@/components/dashboard/dashboardLayout/DashBoardSidebar";
import DashBoardFooter from "./DashBoardFooter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/utils/type.dt";
import { userActions } from "@/store/userSlice";
import { cartActions } from "@/store/cartSlice";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  ...props
}) => {
  const [sidebarOpen] = useState(false);

  const dispatch = useDispatch();
  const { setUserData } = userActions;
  const { userData } = useSelector((states: RootState) => states.userStates);
  const { setCartAcademyItems, setCartCourseItems, setCartAmount } =
    cartActions;
  const { cartAcademyItems, cartCourseItems, cartAmount } = useSelector(
    (states: RootState) => states.cartStates
  );

  useEffect(() => {
    if (!userData) {
      const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
      if (sessionUser) {
        dispatch(setUserData(sessionUser));
      }
    }
  }, [dispatch, setUserData, userData]);

  useEffect(() => {
    if (cartAmount === 0) {
      const sessionCartAmount = JSON.parse(
        sessionStorage.getItem("cartAmount")!
      );
      if (sessionCartAmount) {
        dispatch(setCartAmount(sessionCartAmount));
      }
    }
  }, [cartAmount, dispatch, setCartAmount]);

  useEffect(() => {
    if (cartCourseItems.length === 0) {
      const sessionCourses = JSON.parse(
        sessionStorage.getItem("sessionCourses")!
      );
      if (sessionCourses) {
        dispatch(setCartCourseItems(sessionCourses));
      }
    }
  }, [cartCourseItems.length, dispatch, setCartCourseItems]);

  useEffect(() => {
    if (cartAcademyItems.length === 0) {
      const sessionAcademies = JSON.parse(
        sessionStorage.getItem("sessionAcademies")!
      );
      if (sessionAcademies) {
        dispatch(setCartAcademyItems(sessionAcademies));
      }
    }
  }, [cartAcademyItems.length, dispatch, setCartAcademyItems]);

  return (
    <div className="bg-white">
      <DashBoardHeader />
      <div className="flex justify-between md:pr-5">
        <div className=" md:sticky md:top-6 md:h-full">
          <DashBoardSidebar isOpen={sidebarOpen} />
        </div>
        <main className="flex-1 bg-[#F7F8FB] px-0 py-5 sm:px-10 md:py-12 md:rounded-xl">
          {children}
        </main>
      </div>
      <DashBoardFooter />
    </div>
  );
};

export default DashboardLayout;
