"use client";
import Navbar from "@/components/common/common-headers/Navbar";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export interface IHeaderProps {
  dynamic?: boolean;
}
export default function Header({ dynamic = true }: IHeaderProps) {
  const [isChangeBg, setIsChangeBg] = useState(false);
  const user = null;

  const handleClickLogin = () => {};
  return (
    <>
      <header
        className={classNames(
          `h-[40px] lg:h-header w-full fixed inset-0 z-50 transition-colors ease-linear px-10`,
          {
            "bg-white": isChangeBg,
            "shadow-xl": isChangeBg,
            "bg-[rgba(0,0,0,.4)]": !isChangeBg,
          }
        )}
      >
        <div className=" w-main m-auto h-full lg:flex  xl:w-main items-center justify-between max-w-[100%] hidden">
          <Link href={"/"} className="w-[136px] h-[42px] cursor-pointer ">
            <Image
              src={`/images/${
                !isChangeBg ? "large-logo.svg" : "logo-large-dark.svg"
              }`}
              alt="logo"
              width={0}
              height={0}
              className="w-full h-full object-contain"
            />
          </Link>

          <Navbar isScroll={isChangeBg} />

          {!user ? (
            <div
              className={classNames(
                "flex items-center justify-center gap-1 font-medium",
                {
                  ["text-white"]: !isChangeBg,
                }
              )}
            >
              <Link
                onClick={handleClickLogin}
                className="hover:underline text-1xl"
                href={"/login"}
              >
                Login
              </Link>
              /
              <Link className="hover:underline text-1xl" href={"/register"}>
                Register
              </Link>
            </div>
          ) : (
            // <MenuUser isChangeBg={isChangeBg} />
            <h1>Menu</h1>
          )}
        </div>
        {/* responcesive */}
        <div className=" m-auto h-full text-white flex items-center justify-between select-none lg:hidden">
          {/* <MenuBars isScroll={isChangeBg} /> */}
        </div>
      </header>
    </>
  );
}
