import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  instructorSidebarItems,
  adminSidebarItems,
  userSidebarItems,
} from "@/data/dashBoardSidebar";
import { useRouter } from "next/router";
import { useRouter as useNavigationRouter } from "next/navigation";
import PowerSVG from "../dashboardSVGs/PowerSVG";
import { _useContext } from "@/context/Context";

interface DashboardSidebarProps {
  isOpen: boolean;
}

interface ISidebarItem {
  id: number;
  href: string;
  iconClass: JSX.Element;
  text: string;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen }) => {
  const router = useRouter();
  const navigationRouter = useNavigationRouter();
  const { setUser, user } = _useContext();
  const [sidebarItems, setSidebarItems] = useState<ISidebarItem[]>();

  useEffect(() => {
    if (user?.userType === "admin") {
      setSidebarItems(adminSidebarItems);
    } else if (user?.userType === "instructor") {
      setSidebarItems(instructorSidebarItems);
    } else {
      setSidebarItems(userSidebarItems);
    }
  }, [user?.userType]);

  const handleLogout = () => {
    navigationRouter.push("/");
    const logout = async () => {
      const requestDetails = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/v1/sessions/logout`,
          requestDetails
        );

        if (response.status === 400) {
          const message = response.text();
        }

        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        sessionStorage.removeItem("user");
        setUser(null);
      } catch (e: any) {
        console.log(e.message);
        alert(e.message);
      }
    };
    logout();
  };

  return (
    <div
      className={`px-6 pt-14 space-y-3 fixed top-0 left-0 h-full overflow-auto transform ease-in-out transition-all duration-300 bg-white ${
        isOpen ? "translate-x-0" : "-translate-x-full "
      } md:translate-x-0 md:static md:block z-10 w-4/5 sm:w-1/2 md:w-fit`}
    >
      <div className="">
        {sidebarItems &&
          sidebarItems.map((elm, i) => (
            <div
              key={i}
              className={`py-2 pl-4 w-56 md:w-48 pr-5 font-medium rounded-xl ${
                router.pathname === elm.href
                  ? "text-white bg-[#C5165D]"
                  : "text-[#4F547B]"
              }`}
            >
              <Link href={elm.href}>
                <div className="flex items-center gap-2 text-xl md:text-base ">
                  <div>
                    {elm.iconClass &&
                      React.cloneElement(elm.iconClass, {
                        color:
                          router.pathname === elm.href ? "#FFFFFF" : "#6A7A99",
                      })}
                  </div>
                  <div>{elm.text}</div>
                </div>
              </Link>
            </div>
          ))}
        <button
          className="flex gap-2 items-center text-[#4F547B] py-2 pl-4 pr-5 font-medium"
          onClick={handleLogout}
        >
          <PowerSVG /> Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
