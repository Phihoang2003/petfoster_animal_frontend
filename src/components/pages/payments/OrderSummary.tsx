"use client";
import OrderItem from "@/components/pages/payments/OrderItem";
import PaymentItem from "@/components/pages/payments/PaymentItem";
import { RootState } from "@/configs/types";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import styles from "./styles/paymentCart.module.css";
import React, { useMemo } from "react";
import { toCurrency } from "@/utils/format";
import { deletePayment } from "@/redux/slice/cartsSlice";

export interface IOrderSummaryProps {
  dataDelivery: { title: string; business: string; price: number };
}
export default function OrderSummary({ dataDelivery }: IOrderSummaryProps) {
  const dispatch = useAppDispatch();
  const { payment } = useAppSelector((state: RootState) => state.cartReducer);
  const handleDelete = (index: number) => {
    dispatch(deletePayment(index));
  };
  const total = useMemo(() => {
    if (payment.length <= 0) return 0;

    const results = payment.reduce((result, item) => {
      return (result += item.price * item.quantity);
    }, 0);
    return results;
  }, [payment]);
  return (
    <PaymentItem title="Order Summary">
      <div className="border border-gray-primary rounded-xl px-[32px] py-[25px]">
        <div
          id={styles["payment-cart"]}
          className="flex flex-col gap-5 max-h-[550px] overflow-y-auto"
        >
          {payment.map((item, index) => {
            return (
              <OrderItem
                onDeleteItem={() => handleDelete(index)}
                key={item.productId + (item.size + "")}
                data={item}
              />
            );
          })}
        </div>

        <div className="mt-7 flex flex-col gap-3">
          <div className="flex items-center justify-between text-sm">
            <span>Subtotal</span>
            <p>{toCurrency(total)}</p>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Shipping</span>
            <p>{toCurrency(dataDelivery.price)}</p>
          </div>
          <div className="w-full h-[1px] bg-[#DBDBDB]"></div>
          <div className="flex items-center justify-between text-sm font-semibold">
            <span>Total</span>
            <p>{toCurrency(total + dataDelivery.price)}</p>
          </div>
        </div>
      </div>
    </PaymentItem>
  );
}
