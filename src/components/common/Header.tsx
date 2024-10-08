"use client";
import MenuUser from "@/components/common/common-headers/MenuUser";
import Navbar from "@/components/common/common-headers/Navbar";
import { RootState } from "@/configs/types";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { getCart } from "@/redux/slice/cartsSlice";
import { fetchUserByToken } from "@/redux/slice/userSlice";
import { addPreviousUrl } from "@/utils/session";
import { unwrapResult } from "@reduxjs/toolkit";
import classNames from "classnames";
import { useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export interface IHeaderProps {
  dynamic?: boolean;
}
export default function Header({ dynamic = true }: IHeaderProps) {
  const [isChangeBg, setIsChangeBg] = useState(false);
  const { scrollY } = useScroll();
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const { user, token } = useAppSelector(
    (state: RootState) => state.userReducer
  );

  const handleClickLogin = () => {
    addPreviousUrl(pathname);
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsChangeBg(latest > 0);
  });
  useEffect(() => {
    (async () => {
      const actionResult = dispatch(fetchUserByToken());
      unwrapResult(await actionResult);

      const action = dispatch(getCart());
      unwrapResult(await action);

      // dispatch(getPayment());
    })();
  }, [token, dispatch]);
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
            <MenuUser isChangeBg={isChangeBg} />
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
