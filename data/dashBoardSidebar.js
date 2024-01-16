import BookmarkSVG from "@/components/dashboard/dashboardSVGs/BookmarkSVG";
import DiscoverySVG from "@/components/dashboard/dashboardSVGs/DiscoverySVG";
import ListSVG from "@/components/dashboard/dashboardSVGs/ListSVG";
import MessagesSVG from "@/components/dashboard/dashboardSVGs/MessagesSVG";
import PlayButtonSVG from "@/components/dashboard/dashboardSVGs/PlayButton";
import PowerSVG from "@/components/dashboard/dashboardSVGs/PowerSVG";
import SettingsSVG from "@/components/dashboard/dashboardSVGs/SettingsSVG";
import { FaRegUser } from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";
import { FiEdit3 } from "react-icons/fi";

export const sidebarItems = [
  {
    id: 1,
    href: "/(dashboard)/dashboard",
    iconClass: <DiscoverySVG />,
    text: "Dashboard",
  },
  {
    id: 2,
    href: "/(dashboard)/myCourses",
    iconClass: <PlayButtonSVG />,
    text: "My Courses",
  },
  {
    id: 3,
    href: "/(dashboard)/myProducts",
    iconClass: <LuShoppingBag />,
    text: "My Products",
  },

  {
    id: 4,
    href: "/(dashboard)/wishlist",
    iconClass: <BookmarkSVG />,
    text: "WishLists",
  },
  {
    id: 5,
    href: "/(dashboard)/createProduct",
    iconClass: <ListSVG />,
    text: "Create Product",
  },
  {
    id: 6,
    href: "/(dashboard)/reviews",
    iconClass: <MessagesSVG />,
    text: "Reviews",
  },
  {
    id: 7,
    href: "/(dashboard)/users",
    iconClass: <FaRegUser />,
    text: "Users",
  },
  {
    id: 8,
    href: "/(dashboard)/products",
    iconClass: <LuShoppingBag />,
    text: "Products",
  },
  {
    id: 9,
    href: "/(dashboard)/settings",
    iconClass: <SettingsSVG />,
    text: "Settings",
  },
  {
    id: 10,
    href: "/(dashboard)/logout",
    iconClass: <PowerSVG />,
    text: "Logout",
  },
];
