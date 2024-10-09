"use client";
import Cart from "@/components/pages/cart/Cart";
import { ICart } from "@/configs/interface";
import { RootState } from "@/configs/types";
import { useAppSelector } from "@/hooks/reduxHooks";
import { Checkbox } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

export interface ICartsProps {
  onTotal?: (value: number) => void;
}
export default function Carts({ onTotal }: ICartsProps) {
  const { cartUser, checkAll } = useAppSelector(
    (state: RootState) => state.cartReducer
  );
  const [checked, setChecked] = useState(checkAll);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {};
  return (
    <>
      <div className="flex items-center py-4 text-sm md:text-1xl border-b border-gray-primary font-semibold text-black-main">
        <div className="w-[8%] flex items-center">
          <Checkbox onChange={handleChange} checked={checked} />
        </div>
        <div className="flex-1 ml-8 flex flex-col items-center justify-center gap-5">
          <span>Product</span>
        </div>
        <div className="w-[40%] lg:w-[10%] flex flex-col items-center justify-center">
          <span>Quantity</span>
        </div>
        <div className="ml-2 md:w-[16%] flex items-center justify-center">
          <span>Price</span>
        </div>

        <div className="ml-2 md:w-[16%] flex items-center justify-center">
          <span>Total</span>
        </div>
      </div>
      {cartUser.map((cart, index) => {
        return (
          <Cart
            index={index}
            key={cart.productId + cart.size.toString() + cart.brand}
            data={cart}
          />
        );
      })}
    </>
  );
}
