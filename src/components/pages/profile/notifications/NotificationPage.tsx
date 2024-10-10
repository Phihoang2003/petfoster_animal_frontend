"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import firebaseService from "@/services/firebaseService";
import { INotification } from "@/configs/interface";
import { useAppSelector } from "@/hooks/reduxHooks";
import { RootState } from "@/configs/types";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Checkbox, FormControlLabel } from "@mui/material";
import BaseProfilePage from "@/components/pages/common/BaseProfilePage";
import NotificationPageItem from "@/components/pages/profile/notifications/NotificationPageItem";

export interface INotificationPageProps {}

export default function NotificationPage(props: INotificationPageProps) {
  const { user } = useAppSelector((state: RootState) => state.userReducer);
  const [data, setData] = useState<INotification[]>([]);
  const [start, setStart] =
    useState<QueryDocumentSnapshot<DocumentData, DocumentData>>();
  const [notificationSnapshot, loading] = useCollection(
    firebaseService.queries.getNotifications(user, {
      start,
      limit: Number(process.env.NEXT_PUBLIC_LIMIT_NOTIFI),
    })
  );
  const dataNotifications = useMemo(() => {
    if (!notificationSnapshot) return [];

    return notificationSnapshot.docs.map((item) => {
      return {
        id: item.id,
        ...item.data(),
      } as INotification;
    });
  }, [notificationSnapshot]);

  const handleMarkAllAsRead = async () => {
    await firebaseService.handleMarkAllAsRead(dataNotifications, user);
  };

  const handleSeemore = () => {
    if (!notificationSnapshot?.docs) return;

    setStart(notificationSnapshot?.docs[notificationSnapshot.docs.length - 1]);
  };

  useEffect(() => {
    setData((prev) => [...prev, ...dataNotifications]);
  }, [dataNotifications]);

  return (
    <BaseProfilePage
      title="NOTIFICATIONS"
      action={
        <div className="flex items-center gap-5">
          {/* <FormControlLabel style={{ fontSize: '16px' }} control={<Checkbox size="small" />} label="Unread" /> */}
          <p
            onClick={handleMarkAllAsRead}
            className="text-fill-heart text-[16px] hover:underline cursor-pointer font-medium"
          >
            Mark all as read
          </p>
        </div>
      }
    >
      <div className="py-6 flex flex-col gap-2">
        {data.map((item) => {
          return <NotificationPageItem key={item.id} data={item} user={user} />;
        })}
      </div>
      {data.length === 0 && (
        <div className="flex items-center justify-center">
          <span className="font-semibold">
            There are no notifications at the moment.
          </span>
        </div>
      )}
      {dataNotifications.length >=
        Number(process.env.NEXT_PUBLIC_LIMIT_NOTIFI) && (
        <div className="flex items-center justify-center">
          <span
            onClick={handleSeemore}
            className="text-fill-heart hover:underline cursor-pointer"
          >
            See more
          </span>
        </div>
      )}
    </BaseProfilePage>
  );
}
