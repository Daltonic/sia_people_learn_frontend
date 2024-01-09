import BookmarkSVG from "@/components/dashboard/dashboardSVGs/BookmarkSVG";
import DiscoverySVG from "@/components/dashboard/dashboardSVGs/DiscoverySVG";
import ListSVG from "@/components/dashboard/dashboardSVGs/ListSVG";
import MessagesSVG from "@/components/dashboard/dashboardSVGs/MessagesSVG";
import PlayButtonSVG from "@/components/dashboard/dashboardSVGs/PlayButton";
import PowerSVG from "@/components/dashboard/dashboardSVGs/PowerSVG";
import SettingsSVG from "@/components/dashboard/dashboardSVGs/SettingsSVG";

export const sidebarItems = [
  {
    id: 1,
    href: "/(dashboard)/dashboard",
    iconClass: <DiscoverySVG />,
    text: "Dashboard",
  },
  {
    id: 2,
    href: "/(dashboard)/courses",
    iconClass: <PlayButtonSVG/>,
    text: "My Courses",
  },

  {
    id: 3,
    href: "/(dashboard)/wishlist",
    iconClass: <BookmarkSVG/>,
    text: "WishLists",
  },
  {
    id: 4,
    href: "/(dashboard)/createProduct",
    iconClass: <ListSVG/>,
    text: "Create Product",
  },
  {
    id: 5,
    href: "/(dashboard)/reviews",
    iconClass:  <MessagesSVG/>,
    text: "Reviews",
  },
  {
    id: 6,
    href: "/(dashboard)/settings",
    iconClass: <SettingsSVG/>,
    text: "Settings",
  },
  {
    id: 7,
    href: "/(dashboard)/Logout",
    iconClass: <PowerSVG/>,
    text: "Logout",
  },
];
