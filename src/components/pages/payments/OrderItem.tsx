import { ICart } from "@/configs/interface";
import { links } from "@/data/links";
import { toCurrency, toGam } from "@/utils/format";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid2 } from "@mui/material";
import Link from "next/link";
import React, { MouseEventHandler } from "react";

export interface IOrderItemProps {
  data: ICart;
  onDeleteItem?: MouseEventHandler<SVGSVGElement>;
}
export default function OrderItem({ data, onDeleteItem }: IOrderItemProps) {
  return (
    <div className="border-b border-gray-primary select-none pr-2">
      <Grid2 container spacing={"10px"} sx={{ pb: "20px" }}>
        <Grid2 size={{ xs: 3, md: 2, lg: 2 }}>
          <img
            className="w-full h-[80px] object-contain"
            src={data.image}
            alt={data.image}
          />
        </Grid2>
        <Grid2 size={{ xs: 9, lg: 10, md: 10 }}>
          <div className="flex items-center justify-between gap-4">
            <Link
              href={links.product + data.productId + "/" + data.name}
              className="hover:underline text-sm md:text-1xl"
            >
              {data.name}
            </Link>
            <FontAwesomeIcon
              onClick={onDeleteItem}
              className="text-[#999999] cursor-pointer hover:text-red-primary transition-all ease-linear"
              icon={faTrash}
            />
          </div>
          <div className="flex items-center gap-4 mt-2 text-xs md:text-sm">
            <span>{data.brand}</span>
            <span className="h-[18px] w-[1px] bg-[#999999]"></span>
            <span>{toGam(data.size as number)}</span>
          </div>
          <div className="flex items-center justify-between gap-4 mt-2 text-xs md:text-sm">
            <p>{toCurrency(data.price)}</p>

            <span className="text-xs md:text-sm">
              Quantity: {data.quantity}
            </span>
          </div>
        </Grid2>
      </Grid2>
    </div>
  );
}
