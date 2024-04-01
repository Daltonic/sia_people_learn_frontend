import { GrNotes } from "react-icons/gr";
import { FaRegBookmark, FaRegCompass, FaRegUser } from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";
import { IoCreateOutline, IoSettingsOutline } from "react-icons/io5";
import { FiPlayCircle, FiSettings } from "react-icons/fi";
import { BiSolidEdit } from "react-icons/bi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaRegMessage } from "react-icons/fa6";

export const sidebarItems = [
  {
    id: 1,
    href: "/(dashboard)/dashboard",
    iconClass: <FaRegCompass size={16} />,
    text: "Dashboard",
  },
  {
    id: 2,
    href: "/(dashboard)/purchases",
    iconClass: <FiPlayCircle size={18} />,
    text: "My Purchase",
  },
  {
    id: 3,
    href: "/(dashboard)/products/personal",
    iconClass: <LuShoppingBag size={16} />,
    text: "Personal",
  },

  {
    id: 4,
    href: "/(dashboard)/wishlist",
    iconClass: <FaRegBookmark size={16} />,
    text: "WishLists",
  },
  {
    id: 5,
    href: "/(dashboard)/createProduct",
    iconClass: <BiSolidEdit size={18} />,
    text: "Create Product",
  },
  {
    id: 6,
    href: "/(dashboard)/reviews",
    iconClass: <FaRegMessage size={16} />,
    text: "Reviews",
  },
  {
    id: 7,
    href: "/(dashboard)/users",
    iconClass: <FaRegUser size={16} />,
    text: "Users",
  },
  {
    id: 8,
    href: "/(dashboard)/products",
    iconClass: <LuShoppingBag size={16} />,
    text: "Products",
  },
  {
    id: 9,
    href: "/(dashboard)/settings",
    iconClass: <IoSettingsOutline size={18} />,
    text: "Settings",
  },
];

export const userSidebarItems = [
  {
    id: 1,
    href: "/(dashboard)/purchases",
    iconClass: <FiPlayCircle size={18} />,
    text: "My Purchase",
  },
  {
    id: 2,
    href: "/(dashboard)/wishlist",
    iconClass: <FaRegBookmark  size={16} />,
    text: "WishLists",
  },
  {
    id: 3,
    href: "/(dashboard)/blogs/personal",
    iconClass: <GrNotes size={16} />,
    text: "My Blogs",
  },
  {
    id: 4,
    href: "/(dashboard)/blogs/create",
    iconClass: <IoCreateOutline size={18} />,
    text: "Create Blog",
  },
  {
    id: 5,
    href: "/becomeinstructor",
    iconClass: <LiaChalkboardTeacherSolid size={18} />,
    text: "Start Teaching",
  },
  {
    id: 6,
    href: "/(dashboard)/settings",
    iconClass: <IoSettingsOutline size={18} />,
    text: "Settings",
  },
];

export const adminSidebarItems = [
  {
    id: 1,
    href: "/(dashboard)/dashboard",
    iconClass: <FaRegCompass size={16} />,
    text: "Dashboard",
  },
  {
    id: 2,
    href: "/(dashboard)/users",
    iconClass: <FaRegUser size={16} />,
    text: "Users",
  },
  {
    id: 3,
    href: "/(dashboard)/products",
    iconClass: <LuShoppingBag size={16} />,
    text: "Products",
  },
  {
    id: 4,
    href: "/(dashboard)/blogs",
    iconClass: <GrNotes size={16} />,
    text: "Blogs",
  },
  {
    id: 5,
    href: "/(dashboard)/site-settings",
    iconClass: <IoSettingsOutline size={18} />,
    text: "Settings",
  },
];

export const instructorSidebarItems = [
  {
    id: 1,
    href: "/(dashboard)/products/personal",
    iconClass: <LuShoppingBag size={16} />,
    text: "Personal",
  },
  {
    id: 2,
    href: "/(dashboard)/products/courses/create",
    iconClass: <BiSolidEdit size={18} />,
    text: "Create Course",
  },
  {
    id: 3,
    href: "/(dashboard)/products/academies/create",
    iconClass: <BiSolidEdit size={18} />,
    text: "Create Academy",
  },
  {
    id: 4,
    href: "/(dashboard)/purchases",
    iconClass: <FiPlayCircle size={18} />,
    text: "My Purchase",
  },

  {
    id: 5,
    href: "/(dashboard)/wishlist",
    iconClass: <FaRegBookmark size={16} />,
    text: "WishLists",
  },
  {
    id: 6,
    href: "/(dashboard)/blogs/personal",
    iconClass: <GrNotes size={16} />,
    text: "My Blogs",
  },
  {
    id: 7,
    href: "/(dashboard)/blogs/create",
    iconClass:  <BiSolidEdit size={18} />,
    text: "Create Blog",
  },
  {
    id: 8,
    href: "/(dashboard)/settings",
    iconClass: <FiSettings size={18} />,
    text: "Settings",
  },
];
