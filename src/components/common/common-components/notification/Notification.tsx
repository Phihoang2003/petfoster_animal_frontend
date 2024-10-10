"use client";
import { Badge } from "@mui/material";
import Tippy from "@tippyjs/react/headless";
import classNames from "classnames";
import { motion } from "framer-motion";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import { useAppSelector } from "@/hooks/reduxHooks";
import { RootState } from "@/configs/types";
import { useCollection } from "react-firebase-hooks/firestore";
import firebaseService from "@/services/firebaseService";
import { INotification } from "@/configs/interface";
import NotifycationItem from "@/components/common/common-components/notification/NotificationItem";
import WrapperAnimation from "@/components/animations/WrapperAnimation";
import { contants } from "@/utils/constant";
import { links } from "@/data/links";
import CustomBadge from "@/components/badges/CustomBadge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBellSlash } from "@fortawesome/free-solid-svg-icons";

export interface INotifycationProps {
  icon: ReactNode;
}

export default function Notifycation({ icon }: INotifycationProps) {
  const [open, setOpen] = useState(false);

  const { user } = useAppSelector((state: RootState) => state.userReducer);

  const [notificationSnapshot, loading, error] = useCollection(
    firebaseService.queries.getNotifications(user)
  );
  if (error) {
    console.log("error", error);
  }
  const dataNotifications = useMemo(() => {
    if (!notificationSnapshot) return [];

    return notificationSnapshot.docs.map((item) => {
      return {
        id: item.id,
        ...item.data(),
      } as INotification;
    });
  }, [notificationSnapshot]);

  const handleShowDot = useCallback(() => {
    if (!user) return false;

    return dataNotifications.every((item) => {
      return item.read.includes(user.username);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataNotifications]);

  const handleMarkAllAsRead = async () => {
    await firebaseService.handleMarkAllAsRead(dataNotifications, user);
  };

  return (
    <div>
      <Tippy
        onClickOutside={() => setOpen(false)}
        interactive={true}
        visible={open}
        placement="bottom-end"
        offset={[20, 0]}
        render={(attr) => {
          return (
            <div
              {...attr}
              tabIndex={-1}
              className="w-[80%] md:w-[560px] 
                            bg-white rounded-2xl min-h-[560px] max-h-[740px] shadow-primary text-black-main flex flex-col justify-between"
            >
              <div className="flex items-center justify-between px-8 py-6">
                <span className="text-lg font-semibold tracking-wide">
                  Notifications
                </span>
                <p
                  onClick={handleMarkAllAsRead}
                  className="text-fill-heart text-[16px] hover:underline cursor-pointer font-medium"
                >
                  Mark all as read
                </p>
              </div>
              {dataNotifications.length === 0 && (
                <div className="flex flex-col items-center justify-center h-[17.25rem]">
                  <span>
                    <FontAwesomeIcon icon={faBellSlash} size="3x" />
                  </span>
                  <span className="font-semibold ">No notifications yet</span>
                  <span className="text-slate-400">
                    When you get notifications, they’ll show up here.
                  </span>
                </div>
              )}

              <div className="flex flex-col items-start flex-1 scroll  overflow-y-auto">
                {dataNotifications.map((item) => {
                  return (
                    <NotifycationItem key={item.id} data={item} user={user} />
                  );
                })}
              </div>

              <div className="mx-8 font-medium text-fill-heart flex items-center justify-center h-full border-t border-gray-primary bg-white text-[16px]">
                <WrapperAnimation hover={{}} className="py-4">
                  <Link
                    href={
                      contants.roles.manageRoles.includes(user?.role || "")
                        ? links.adminFuntionsLink.notifycation.system
                        : links.profile.notification
                    }
                  >
                    See all
                  </Link>
                </WrapperAnimation>
              </div>
            </div>
          );
        }}
      >
        <CustomBadge badgeContent={""} dot invisible={handleShowDot()}>
          <WrapperAnimation
            onClick={() => setOpen((prev) => !prev)}
            hover={{ rotate: 10 }}
          >
            {icon}
          </WrapperAnimation>
        </CustomBadge>
      </Tippy>
    </div>
  );
}
