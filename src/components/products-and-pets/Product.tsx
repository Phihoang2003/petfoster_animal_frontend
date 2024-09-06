"use client";
import { IProduct } from "@/configs/interface";
import { links } from "@/data/links";
import { capitalize, stringToUrl, toCurrency, toGam } from "@/utils/format";
import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export interface IProductProps {
  data: IProduct;
}
export default function Product({ data }: IProductProps) {
  const handleClickProduct = () => {
    console.log("Product: ", data.name);
  };
  return (
    <div className="flex flex-col items-center hover:shadow-primary pb-[21px] transition-all ease-linear max-h-[468px] rounded">
      <div className="w-full h-3/5 min-h-[305px] relative">
        <Image
          className="w-full h-full object-contain"
          src={data.image}
          alt={data.image}
          fill
          sizes="(max-width: 768px) 100vw, 
          (max-width: 1200px) 50vw, 
          33vw"
        />
        <div className="absolute top-4 right-3 bg-[#EF4444] px-[14px] py-1 text-white font-medium rounded-full text-sm ">
          <span>-{data.discount}%</span>
        </div>
      </div>

      <div className="px-[20px] w-full">
        <div className="flex items-center justify-between w-full text-gray-primary text-sm">
          <span className="w-full max-w-[80%] line-clamp-1">
            {capitalize(data.brand)}
          </span>
          <p>{toGam(data.size[0] as number)}</p>
        </div>

        <Link
          onClick={handleClickProduct}
          href={links.product + `${data.id}/${stringToUrl(data.name)}`}
          className="text-[18px] line-clamp-1 hover:underline cursor-pointer my-2"
        >
          {data.name}
        </Link>
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
        <div className="flex item-center gap-[10px] mt-3">
          <span className="text-xl text-[#EF4444] font-medium tracking-wide">
            {toCurrency(data.price)}
          </span>
          <del className="text-sm text-black-main">
            {toCurrency(data.oldPrice)}
          </del>
        </div>
      </div>
    </div>
  );
}
