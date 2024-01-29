import BookmarkSVG from "@/components/dashboard/dashboardSVGs/BookmarkSVG";
import DiscoverySVG from "@/components/dashboard/dashboardSVGs/DiscoverySVG";
import ListSVG from "@/components/dashboard/dashboardSVGs/ListSVG";
import MessagesSVG from "@/components/dashboard/dashboardSVGs/MessagesSVG";
import PlayButtonSVG from "@/components/dashboard/dashboardSVGs/PlayButton";
import SettingsSVG from "@/components/dashboard/dashboardSVGs/SettingsSVG";
import { GrNotes } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";
import InstructorSVG from "@/components/dashboard/dashboardSVGs/InstructorSVG";
import { IoCreateOutline } from "react-icons/io5";

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
];

export const userSidebarItems = [
  {
    id: 1,
    href: "/(dashboard)/myCourses",
    iconClass: <PlayButtonSVG />,
    text: "My Courses",
  },
  {
    id: 2,
    href: "/(dashboard)/wishlist",
    iconClass: <BookmarkSVG />,
    text: "WishLists",
  },
  {
    id: 3,
    href: "/(dashboard)/myBlogs",
    iconClass: <GrNotes />,
    text: "My Blogs",
  },
  {
    id: 4,
    href: "/(dashboard)/createBlog",
    iconClass: <IoCreateOutline />,
    text: "Create Blog",
  },
  {
    id: 5,
    href: "/becomeinstructor",
    iconClass:  <InstructorSVG />,
    text: "Start Teaching",
  },
  {
    id: 6,
    href: "/(dashboard)/settings",
    iconClass: <SettingsSVG />,
    text: "Settings",
  },
];

export const adminSidebarItems = [
  {
    id: 1,
    href: "/(dashboard)/dashboard",
    iconClass: <DiscoverySVG />,
    text: "Dashboard",
  },
  {
    id: 2,
    href: "/(dashboard)/users",
    iconClass: <FaRegUser />,
    text: "Users",
  },
  {
    id: 3,
    href: "/(dashboard)/products",
    iconClass: <LuShoppingBag />,
    text: "Products",
  },
  {
    id: 4,
    href: "/(dashboard)/blogs",
    iconClass: <GrNotes />,
    text: "Blogs",
  },
  {
    id: 5,
    href: "/(dashboard)/settings",
    iconClass: <SettingsSVG />,
    text: "Settings",
  },
];

export const instructorSidebarItems = [
  {
    id: 1,
    href: "/(dashboard)/myProducts",
    iconClass: <LuShoppingBag />,
    text: "My Products",
  },
  {
    id: 2,
    href: "/(dashboard)/createProduct",
    iconClass: <ListSVG />,
    text: "Create Product",
  },
  {
    id: 3,
    href: "/(dashboard)/myCourses",
    iconClass: <PlayButtonSVG />,
    text: "My Courses",
  },
  {
    id: 4,
    href: "/(dashboard)/reviews",
    iconClass: <MessagesSVG />,
    text: "Reviews",
  },
  {
    id: 5,
    href: "/(dashboard)/wishlist",
    iconClass: <BookmarkSVG />,
    text: "WishLists",
  },
  {
    id: 6,
    href: "/(dashboard)/myBlogs",
    iconClass: <GrNotes />,
    text: "My Blogs",
  },
  {
    id: 7,
    href: "/(dashboard)/createBlog",
    iconClass: <BookmarkSVG />,
    text: "Create Blog",
  },
  {
    id: 8,
    href: "/(dashboard)/settings",
    iconClass: <SettingsSVG />,
    text: "Settings",
  },
];
