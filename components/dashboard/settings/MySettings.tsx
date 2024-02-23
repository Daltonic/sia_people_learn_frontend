import React, { useEffect } from "react";
import Tabs from "./Tabs";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "@/store/slices/userSlice";
import DashboardHeading from "../dashboardLayout/DashboardHeading";
import { RootState } from "@/utils/type.dt";

const MySettings: React.FC = () => {
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
    <div className="">
      <DashboardHeading
        title="Settings"
        description="Customize your account preferences and privacy settings."
      />
      <Tabs />
    </div>
  );
};

export default MySettings;
