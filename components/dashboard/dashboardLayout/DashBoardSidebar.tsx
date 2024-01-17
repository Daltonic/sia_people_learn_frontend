import React from "react";
import Link from "next/link";
import { sidebarItems } from "@/data/dashBoardSidebar";
import { useRouter } from "next/router";
import { useRouter as useNavigationRouter } from "next/navigation";
import Button from "@/components/reusableComponents/Button";

interface DashboardSidebarProps {
  isOpen: boolean;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen }) => {
  const router = useRouter();
  const navigationRouter = useNavigationRouter();

  const handleLogout = () => {
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
          alert("Something went wrong");
        }

        const message = await response.text();
        console.log(message);
        navigationRouter.push("/");
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
        {sidebarItems.map((elm, i) => (
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
        <Button variant="pink" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
