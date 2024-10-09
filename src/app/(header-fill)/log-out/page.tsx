"use client";
import LoadingPrimary from "@/components/common/loadings/LoadingPrimary";
import { RootState } from "@/configs/types";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { logout } from "@/redux/slice/userSlice";
import { handleSetLastSeenInfoFirebase } from "@/utils/firebaseUtils";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export interface ILogoutProps {}

export default function Logout(props: ILogoutProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.userReducer);

  const router = useRouter();

  const handleLogout = () => {
    try {
      if (user) {
        handleSetLastSeenInfoFirebase(user);
      }

      dispatch(logout());

      router.prefetch("/");
      router.push("/");
    } catch (error) {
      handleLogout();
    }
  };

  useEffect(() => {
    handleLogout();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <LoadingPrimary />;
}
