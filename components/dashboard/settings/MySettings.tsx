import React, { useEffect } from "react";
import Tabs from "./Tabs";
import { _useContext } from "@/context/Context";

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
      <div className="mb-10 md:mb-16 px-5 sm:px-0">
        <h1 className="font-bold text-[#321463] text-3xl">Settings</h1>
        <p className="text-[#4F547B] text-lg">
          Customize your account preferences and privacy settings.
        </p>
      </div>
      <Tabs />
    </div>
  );
};

export default MySettings;
