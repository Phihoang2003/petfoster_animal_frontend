"use client";
import { getAdoptions } from "@/apis/pets";
import TippyChooser from "@/components/common/inputs/tippys/TippyChooser";
import LoadingSecondary from "@/components/common/loadings/LoadingSecondary";
import BaseProfilePage from "@/components/pages/common/BaseProfilePage";
import AdoptionPageItem from "@/components/pages/profile/adoption/AdoptionPageItem";
import { IAdoption } from "@/configs/interface";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useCallback, useRef, useState } from "react";

const dataFilter = [
  {
    title: "All",
    id: "all",
  },
  {
    title: "Adopted",
    id: "Adopted",
  },

  {
    title: "Waiting",
    id: "Waiting",
  },
  {
    title: "Registered",
    id: "Registered",
  },
  {
    title: "Cancelled",
    id: "Cancelled",
  },
];
export default function AdoptionPage() {
  const intObserver: any = useRef();
  const [filter, setFilter] = useState({ status: dataFilter[0].id });

  const rawAdoptions = useInfiniteQuery({
    queryKey: ["adoptions/infinity", filter],
    queryFn: ({ pageParam = 1 }) => {
      return getAdoptions(filter.status, pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, allPages) => {
      return lastPage?.data?.data.length ? allPages.length + 1 : undefined;
    },
  });

  const lastPostRef = useCallback(
    (post: any) => {
      if (rawAdoptions.isFetchingNextPage) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && rawAdoptions.hasNextPage) {
          rawAdoptions.fetchNextPage();
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [rawAdoptions]
  );

  return (
    <BaseProfilePage
      title="MY PETS"
      action={
        <div className="flex items-center">
          <TippyChooser
            styles={{
              minWidth: "min-w-[120px]",
              className: "bg-[#f2f2f2] rounded px-5 py-2 text-sm",
              classNamePopup: "bg-[#f2f2f2] rounded text-sm",
            }}
            title={dataFilter[0].title}
            data={dataFilter}
            onValue={(v) => {
              setFilter({
                ...filter,
                status: v.id,
              });
            }}
          />
        </div>
      }
    >
      <div className="py-5 flex items-center flex-col gap-3">
        {rawAdoptions.data &&
          rawAdoptions.data.pages[0].data.data.length > 0 &&
          !rawAdoptions.isLoading &&
          rawAdoptions.data.pages.map((item, pageIndex) => {
            return item.data.data.map((i: IAdoption, index: number) => {
              //change
              const isLastItem =
                pageIndex === rawAdoptions.data.pages.length - 1 &&
                index === item.data.data.length - 1;
              return (
                <div
                  className="w-full"
                  key={i.id}
                  ref={isLastItem ? lastPostRef : null}
                >
                  <AdoptionPageItem data={i} />
                </div>
              );
            });
          })}

        {(!rawAdoptions.data ||
          (rawAdoptions.data &&
            rawAdoptions.data.pages[0].data.data.length <= 0)) && (
          <div className="w-full flex items-center justify-center py-8">
            <span className="text-center text-black-main">
              {"You don't have any adoptions yet"}
            </span>
          </div>
        )}
        <div className="flex items-center justify-center mt-8">
          {rawAdoptions.isLoading ||
            (rawAdoptions.isFetching && <LoadingSecondary />)}
        </div>
      </div>
    </BaseProfilePage>
  );
}
