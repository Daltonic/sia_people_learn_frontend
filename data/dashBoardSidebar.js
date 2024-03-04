import { GrNotes } from "react-icons/gr";
import { FaRegBookmark, FaRegCompass, FaRegUser } from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";
import { IoCreateOutline, IoSettingsOutline } from "react-icons/io5";
import { FiPlayCircle, FiSettings } from "react-icons/fi";
import { CiViewList } from "react-icons/ci";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaRegMessage } from "react-icons/fa6";

export const sidebarItems = [
  {
    id: 1,
    href: "/(dashboard)/dashboard",
    iconClass: <FaRegCompass />,
    text: "Dashboard",
  },
  {
    id: 2,
    href: "/(dashboard)/myCourses",
    iconClass: <FiPlayCircle />,
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
    iconClass: <FaRegBookmark />,
    text: "WishLists",
  },
  {
    id: 5,
    href: "/(dashboard)/createProduct",
    iconClass: <CiViewList />,
    text: "Create Product",
  },
  {
    id: 6,
    href: "/(dashboard)/reviews",
    iconClass: <FaRegMessage />,
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
    iconClass: <IoSettingsOutline />,
    text: "Settings",
  },
];

export const userSidebarItems = [
  {
    id: 1,
    href: "/(dashboard)/myCourses",
    iconClass: <FiPlayCircle />,
    text: "My Courses",
  },
  {
    id: 2,
    href: "/(dashboard)/wishlist",
    iconClass: <FaRegBookmark  />,
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
    iconClass: <LiaChalkboardTeacherSolid />,
    text: "Start Teaching",
  },
  {
    id: 6,
    href: "/(dashboard)/settings",
    iconClass: <IoSettingsOutline />,
    text: "Settings",
  },
];

export const adminSidebarItems = [
  {
    id: 1,
    href: "/(dashboard)/dashboard",
    iconClass: <FaRegCompass />,
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
    href: "/(dashboard)/site-settings",
    iconClass: <IoSettingsOutline />,
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
    href: "/(dashboard)/createCourse",
    iconClass: <CiViewList />,
    text: "Create Course",
  },
  {
    id: 3,
    href: "/(dashboard)/createAcademy",
    iconClass: <CiViewList />,
    text: "Create Academy",
  },
  {
    id: 4,
    href: "/(dashboard)/myCourses",
    iconClass: <FiPlayCircle />,
    text: "My Courses",
  },

  {
    id: 5,
    href: "/(dashboard)/wishlist",
    iconClass: <FaRegBookmark />,
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
    iconClass: <FaRegBookmark />,
    text: "Create Blog",
  },
  {
    id: 8,
    href: "/(dashboard)/settings",
    iconClass: <FiSettings />,
    text: "Settings",
  },
];
