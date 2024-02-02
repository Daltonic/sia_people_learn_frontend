"use client";
import React, { ReactNode, useEffect } from "react";
import Footer from "./footers/Footer";
import Header from "./headers/Header";
import "aos/dist/aos.css";
import AOS from "aos";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/utils/type.dt";
import { userActions } from "@/store/userSlice";
import { cartActions } from "@/store/cartSlice";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    AOS.init();
  }, []);
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
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
