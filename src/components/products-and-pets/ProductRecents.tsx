"use client";
import { getRecentViews } from "@/apis/user";
import BoxTitle from "@/components/boxs/BoxTitle";
import ProductRecent from "@/components/products-and-pets/ProductRecent";
import { RootState } from "@/configs/types";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";

export interface IProductRencentProps {
  title: string;
  fontSizeTitle?: string;
}
export default function ProductRecents({
  title,
  fontSizeTitle,
}: IProductRencentProps) {
  const [isHideScroll, setIsHideScroll] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const { user } = useAppSelector((state: RootState) => state.userReducer);

  const recentViews = useQuery({
    queryKey: ["getRecentViews"],
    queryFn: () => {
      if (!user) return;
      return getRecentViews();
    },
  });
  console.log("recentViews", recentViews);

  const recentViewData = useMemo(() => {
    if (!recentViews.data?.data) return [];

    return recentViews.data.data;
  }, [recentViews.data]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (recentViews.error || !user) {
    return;
  }
  return (
    isClient && (
      <BoxTitle
        title={title}
        locationTitle="left"
        underlineTitle
        fontSizeTitle={fontSizeTitle}
      >
        <div
          style={{
            overscrollBehaviorInline: "contain",
          }}
          onMouseEnter={() => setIsHideScroll(false)}
          onMouseLeave={() => setIsHideScroll(true)}
          className={classNames(
            "scroll grid grid-flow-col auto-cols-[60%] md:auto-cols-[40%] lg:auto-cols-[30%] gap-[10px] pb-4 select-none transition-all ease-linear",
            {
              "hide-scroll ": isHideScroll,
            }
          )}
        >
          {recentViewData.map((product) => {
            return <ProductRecent key={product.id} data={product} />;
          })}
        </div>

        {recentViewData.length <= 0 && (
          <div className="text-black-main text-lg font-medium flex items-center gap-2 justify-center">
            <p>You have not viewed any products yet</p>
          </div>
        )}
      </BoxTitle>
    )
  );
}
