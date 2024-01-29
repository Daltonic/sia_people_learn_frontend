import React, { useEffect } from "react";
import Tabs from "./Tabs";
import { _useContext } from "@/context/Context";
import DashboardHeading from "../dashboardLayout/DashboardHeading";

const MySettings: React.FC = () => {
  const { user, setUser } = _useContext();
  useEffect(() => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user")!);
    if (!user) {
      setUser(sessionUser);
    }
  }, [setUser, user]);
  return (
    <div className="">
      <DashboardHeading title="Settings" description="Customize your account preferences and privacy settings." />
      <Tabs />
    </div>
  );
};

export default MySettings;
