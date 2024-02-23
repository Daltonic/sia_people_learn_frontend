import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/slices/userSlice";
import DashboardHeading from "../dashboardLayout/DashboardHeading";
import { IWishlist, RootState } from "@/utils/type.dt";
import Tabs from "./Tabs";

interface Props {
  academiesData: IWishlist[];
  coursesData: IWishlist[];
}

const Bookmarks: React.FC<Props> = ({ academiesData, coursesData }) => {
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
        title="Bookmarks"
        description=" Save your favorite courses and academies for quick access later."
      />
      <Tabs academiesData={academiesData} coursesData={coursesData} />
    </div>
  );
};

export default Bookmarks;
