"use client";
import ContainerContent from "@/components/common/common-components/ContainerContent";
import Notifycation from "@/components/common/common-components/notification/Notification";
import ChatBox from "@/components/pages/chats/ChatBox";
import { RootState } from "@/configs/types";
import { dataFooter } from "@/data/footer";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { closeNoty } from "@/redux/slice/appSlice";
import { contants } from "@/utils/constant";
import { delay } from "@/utils/functionals";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Footer() {
  const { notifycation } = useAppSelector(
    (state: RootState) => state.appReducer
  );
  const { user } = useAppSelector((state: RootState) => state.userReducer);

  const [showChatbox, setShowChatbox] = useState(false);

  useEffect(() => {
    (async () => {
      if (
        user &&
        user.role &&
        !contants.roles.manageRoles.includes(user?.role)
      ) {
        await delay(2000);
        setShowChatbox(true);
      } else {
        setShowChatbox(false);
      }
    })();
  }, [user]);

  const dispatch = useAppDispatch();
  return (
    <footer className="bg-[#2F2E2E] pt-12 pb-14 max-w-[100%] overflow-hidden mt-[10%]">
      <ContainerContent className="text-white">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-[74px] ">
          <div className=" lg:col-span-2 flex flex-col gap-[30px] ">
            <div className="w-fit">
              <Image
                src={"/images/logo-large-dark.svg"}
                alt="logo"
                width={136}
                height={42}
              />
              <div className="w-3/4 h-[3px] bg-white"></div>
            </div>
            <p>{dataFooter.petfoster}</p>
          </div>
          <div className="flex flex-col gap-[30px]">
            <div className="w-fit">
              <h4 className="text-[25px] text-green-5FA503 font-bold leading-[42px]">
                ABOUT US
              </h4>
              <div className="w-3/4 h-[3px] bg-white"></div>
            </div>
            <ul className="flex flex-col gap-5">
              {dataFooter.aboutUs.map((item) => {
                return (
                  <li
                    key={item.title}
                    className="flex items-center gap-1 hover:underline"
                  >
                    <FontAwesomeIcon className="text-xs" icon={faAngleRight} />
                    <Link className="text-1xl" href={item.link}>
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col gap-[30px]">
            <div className="w-fit">
              <h4 className="text-[25px] text-green-5FA503 font-bold leading-[42px] uppercase">
                Contact us
              </h4>
              <div className="w-3/4 h-[3px] bg-white"></div>
            </div>
            <ul className="flex flex-col gap-5">
              {dataFooter.contacts.map((item) => {
                return (
                  <li
                    key={item.title}
                    className="flex items-center gap-2 hover:underline cursor-pointer"
                  >
                    <FontAwesomeIcon
                      className="text-xl h-5 w-5"
                      icon={item.icon}
                    />
                    <span className="text-1xl">{item.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="bg-white h-[1px] w-full mt-16"></div>

        {showChatbox && (
          <div className="fixed bottom-[2%] right-[2%] flex flex-col gap-4">
            <ChatBox />
          </div>
        )}
        <div className="flex items-center justify-center py-14">
          <p>{dataFooter.coppyRight}</p>
        </div>

        <Notifycation
          onClose={() => {
            dispatch(closeNoty());
          }}
          {...notifycation}
        />
      </ContainerContent>
    </footer>
  );
}
