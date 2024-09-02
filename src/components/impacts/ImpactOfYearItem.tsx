import { IImpact } from "@/configs/interface";
import { Source_Serif_4 } from "next/font/google";
import Image from "next/image";
import React from "react";

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500"],
});
export interface IImpactOfYearItemProps {
  data: IImpact;
}
export default function ImpactOfYearItem({ data }: IImpactOfYearItemProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-[100px] h-[100px]">
        <Image src={`/icons/${data.image}`} fill alt="image-icon" />
      </div>
      <h4 className="font-bold text-green-main-dark text-2xl lg:text-[48px] py-2 tracking-wider">
        {data.prefix && data.prefix}
        {data.prefix
          ? (
              Number(data.quantity) / Number(process.env.NEXT_PUBLIC_USD)
            ).toFixed(1)
          : data.quantity}
      </h4>
      <span className="text-lg lg:text-xl font-semibold text-black-main tracking-wider">{`${data.title}`}</span>
    </div>
  );
}
