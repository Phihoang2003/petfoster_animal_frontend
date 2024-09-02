import ButtonNavbar from "@/components/buttons/ButtonNavbar";
import { navbar } from "@/data/header";
import classNames from "classnames";
import React from "react";

export interface INavbarProps {
  isScroll: boolean;
}
function Navbar({ isScroll }: INavbarProps) {
  return (
    <ul
      className={classNames("h-navbar lg:flex hidden items-center gap-1", {
        "text-white": !isScroll,
        "text-[#111]": isScroll,
      })}
    >
      {navbar.map((nav) => {
        return (
          <li key={nav.title}>
            <ButtonNavbar
              isScroll={isScroll}
              contents={nav.title}
              href={nav.href}
              border={nav?.style?.border}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default Navbar;
