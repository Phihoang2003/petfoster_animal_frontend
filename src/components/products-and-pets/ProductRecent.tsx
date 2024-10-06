import WrapperAnimation from "@/components/animations/WrapperAnimation";
import { IProduct } from "@/configs/interface";
import { links } from "@/data/links";
import { stringToUrl, toCurrency } from "@/utils/format";
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface IProductRecentProps {
  data: IProduct;
}
export default function ProductRecent({ data }: IProductRecentProps) {
  return (
    <Link href={links.product + `${data.id}/${stringToUrl(data.name)}`}>
      <WrapperAnimation hover={{}}>
        <div className="flex items-center border border-gray-primary rounded w-full gap-2 hover:border-[#ee4d2d]">
          <div className="w-2/5 h-[98px] max-w-[98px] relative">
            <Image
              className="w-full h-full object-contain"
              src={data.image}
              alt={data.image}
              fill
            />
          </div>
          <div className="w-3/5 flex flex-col justify-between h-full pr-[18px] py-5">
            <Rating
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: "16px",
                },
              }}
              name="read-only"
              value={data.rating}
              readOnly
            />
            <h4 className="line-clamp-1 text-[#374151] text-sm my-2">
              {data.name}
            </h4>

            <div className="flex flex-col sm:flex-row">
              <span className="text-[#EF4444] text-lg font-medium">
                {toCurrency(data.price)}
              </span>
              <del className="text-black-main text-sm ml-[10px] max-w-full ">
                {toCurrency(data.oldPrice)}
              </del>
            </div>
          </div>
        </div>
      </WrapperAnimation>
    </Link>
  );
}
