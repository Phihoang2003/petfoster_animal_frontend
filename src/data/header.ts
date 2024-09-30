import { MenuHeaderType } from "@/configs/types";
import {
  faHeart,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export const navbar = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Take Action", href: "/take-action" },
  { title: "Adopt", href: "/adopt" },
  { title: "ADORABLE SNAPSHOTS", href: "/adorable-snapshots" },
  { title: "Donation", href: "/donation", style: { border: true } },
];
export const listProfile = [
  {
    title: "Profile",
    href: "/profile",
    icon: faUser,
  },
  {
    title: "Favorite",
    href: "/favorite",
    icon: faHeart,
  },
  {
    title: "Log out",
    href: "/log-out",
    icon: faRightFromBracket,
  },
] as MenuHeaderType[];

export const listTabsPostProfile = [
  {
    title: "Posts",
  },
  {
    title: "Likes",
  },
];
