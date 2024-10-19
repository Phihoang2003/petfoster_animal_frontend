"use client";
import RatingDialog from "@/components/dialogs/RatingDialog";
/* eslint-disable @next/next/no-img-element */
import { IProductDetailOrders } from "@/configs/interface";
import { StateType } from "@/configs/types";
import firebaseService from "@/services/firebaseService";
import { toCurrency, toGam } from "@/utils/format";
import { Grid2 } from "@mui/material";
import classNames from "classnames";
import Image from "next/image";

import React, { useState } from "react";

export interface IDetailOrderhistoryItemProps {
  data: IProductDetailOrders & { status: StateType };
}

export default function DetailOrderhistoryItem({
  data,
}: IDetailOrderhistoryItemProps) {
  const [togleDialog, setTogleDialog] = useState(false);

  const handleTogleDialog = () => {
    setTogleDialog(!togleDialog);
  };

  return (
    <>
      <Grid2
        container
        key={4}
        spacing={1}
        py={"38px"}
        sx={{
          borderBottom: "1px solid #DBDBDB",
          overflowX: "auto",
        }}
      >
        <Grid2 size={{ lg: 6 }}>
          <Grid2 container spacing={2} key={5}>
            <Grid2 size={{ lg: 2 }}>
              <div className="flex flex-col item-center justify-center h-full">
                <img
                  className="w-20 h-20 object-contain"
                  src={data.image}
                  alt={data.image}
                />
              </div>
              {/* <Image
                src={data.image}
                alt={data.image}
                width={50}
                height={50}
                objectFit="contain"
              /> */}
            </Grid2>
            <Grid2 size={{ lg: 10 }}>
              <div className="flex flex-col justify-between h-full gap-2">
                <h3 className="font-medium mb-2">{data.name}</h3>
                <div className="flex items-center text-sm">
                  <span className="">{"Zenit"}</span>
                  <span className="h-5 bg-[#666666] w-[1px] mx-3"></span>
                  <span>{toGam(data.size as number)}</span>
                </div>

                <span
                  onClick={
                    !data.isRate && data.status === "delivered"
                      ? handleTogleDialog
                      : undefined
                  }
                  className={classNames("", {
                    ["text-gray-300 cursor-default"]:
                      data.status !== "delivered",
                    ["text-fill-heart  cursor-pointer hover:underline"]:
                      data.status === "delivered",
                  })}
                >
                  {!data.isRate && "Rate"}
                </span>
              </div>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 size={{ lg: 2 }}>
          <div className="flex items-center justify-center h-full">
            <span className="text-center text-[#303B4E]">
              {toCurrency(data.price)}
            </span>
          </div>
        </Grid2>
        <Grid2 size={{ lg: 2 }}>
          <div className="flex items-center justify-center h-full">
            <span className="text-center text-[#303B4E]">x{data.quantity}</span>
          </div>
        </Grid2>
        <Grid2 size={{ lg: 2 }}>
          <div className="flex items-center justify-center h-full">
            <span className="text-[#303B4E]">
              {toCurrency(data.price * data.quantity)}
            </span>
          </div>
        </Grid2>
      </Grid2>

      <RatingDialog data={data} open={togleDialog} setOpen={setTogleDialog} />
    </>
  );
}
