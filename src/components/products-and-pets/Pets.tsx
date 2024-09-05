"use client";
import MainButton from "@/components/buttons/MainButton";
import ContainerContent from "@/components/common/common-components/ContainerContent";
import Pet from "@/components/products-and-pets/Pet";
import { IPet } from "@/configs/interface";
import classNames from "classnames";
import React, { ReactNode, useMemo } from "react";

type bottomStyle = "load-more" | "pagination" | "none";
export interface IPetsProps {
  data: IPet[];
  bottom?: bottomStyle;
  heading?: ReactNode;
  background?: string;

  options?: {
    buttonTitle?: string;
    href?: string;
    baseHref?: string;
    pages?: number;
  };
}
export default function Pets({
  data,
  heading,
  bottom = "load-more",
  background = "bg-[#F5FAFF]",
  options,
}: IPetsProps) {
  const memoData = useMemo(() => {
    return data;
  }, [data]);
  return (
    <ContainerContent
      classNameContainer={classNames("pt-14", {
        [background]: true,
      })}
    >
      {heading ? (
        heading
      ) : (
        <h2 className="text-black-main text-center pb-[48px] text-4xl font-semibold">
          RECENTLY FOSTER
        </h2>
      )}
      <div className="w-full grid md:grid-cols-3 lg:grid-cols-4 gap-[20px] gap-y-4">
        {memoData.map((pet) => {
          return <Pet key={pet.id} data={pet} />;
        })}
      </div>
      {bottom === "load-more" && (
        <div className="flex items-center justify-center w-full">
          <MainButton
            href={options?.href}
            title={options?.buttonTitle || "load more"}
            className="my-11"
          />
        </div>
      )}

      {/* {bottom === "pagination" && options?.pages && options.pages > 1 && (
        <Pagination baseHref={options?.baseHref} pages={options?.pages || 1} />
      )} */}
    </ContainerContent>
  );
}
