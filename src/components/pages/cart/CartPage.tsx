"use client";
import BoxTitle from "@/components/boxs/BoxTitle";
import MainButton from "@/components/buttons/MainButton";
import ContainerContent from "@/components/common/common-components/ContainerContent";
import Carts from "@/components/pages/cart/Carts";
import { RootState } from "@/configs/types";
import { useAppSelector } from "@/hooks/reduxHooks";
import { contants } from "@/utils/constant";
import { toCurrency } from "@/utils/format";
import { Breadcrumbs } from "@mui/material";
import classNames from "classnames";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./styles/cart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { updateCartUser } from "@/apis/user";
import { toast } from "react-toastify";

export default function CartPage() {
  const { cartUser } = useAppSelector((state: RootState) => state.cartReducer);

  const [total, setTotal] = useState(0);
  const handleCheckout = () => {};

  useEffect(() => {
    return () => {
      (async () => {
        try {
          const response = await updateCartUser(cartUser);

          if (!response) {
            toast.warn(contants.messages.errors.handle);
            return;
          }
        } catch (error) {
          toast.error(
            contants.messages.errors.handle + `. Can't save your cart !`
          );
        }
      })();
    };
  }, [cartUser]);
  return (
    <>
      <ContainerContent className="pt-12">
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Link className="hover:underline" href="/">
              Home
            </Link>
            <Link className="text-black-main hover:underline " href="/cart">
              Cart
            </Link>
          </Breadcrumbs>
        </div>
      </ContainerContent>
      {
        <BoxTitle
          mt="mt-[46px]"
          mbUnderline="pb-0"
          title="my cart"
          fontWeigth="font-semibold"
          underlineTitle
          locationTitle="left"
          fontSizeTitle="text-[32px]"
        >
          {cartUser.length <= 0 ? (
            <div className="flex items-center justify-center py-20">
              <span>{contants.messages.cart.empty}</span>
            </div>
          ) : (
            <Carts onTotal={(t) => setTotal(t)} />
          )}

          {cartUser.length > 0 && (
            <div className="flex items-center justify-between mt-10 text-lg md:text-xl text-black-main">
              <div className="flex items-center justify-start w-[10%]">
                <span className="">Total</span>
              </div>

              <div className="flex items-center justify-center w-[20%] ">
                <p className="">{toCurrency(total)}</p>
              </div>
            </div>
          )}

          <div className="flex flex-col items-center justify-center mt-20 mb-[60px] lg:mb-[-100px] gap-6">
            {cartUser.length > 0 &&
              cartUser.filter((i) => i.checked && i.repo > 0).length > 0 && (
                <MainButton
                  onClick={handleCheckout}
                  title="Checkout"
                  background="bg-violet-primary"
                />
              )}
            <Link
              href={"/take-action"}
              className={classNames(
                " hover:underline text-violet-primary flex items-center gap-[10px] text-1xl",
                {
                  [styles["cart-page"]]: true,
                }
              )}
            >
              <span>Continue to buying</span>
              <FontAwesomeIcon
                className={classNames(" transition-all ease-linear", {
                  [styles["link"]]: true,
                })}
                icon={faArrowRight}
              />
            </Link>
          </div>
        </BoxTitle>
      }
    </>
  );
}
