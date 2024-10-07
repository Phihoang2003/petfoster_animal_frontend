"use client";
import { detailProduct } from "@/apis/product";
import MainButton from "@/components/buttons/MainButton";
import ContainerContent from "@/components/common/common-components/ContainerContent";
import LoadingPrimary from "@/components/common/loadings/LoadingPrimary";
import DesAndReview from "@/components/pages/detail-product/DesAndReview";
import Quantity from "@/components/pages/detail-product/Quantity";
import Sizes from "@/components/pages/detail-product/Sizes";
import PreviewImageProduct from "@/components/products-and-pets/components/PreviewImageProduct";
import ProductSuggestion from "@/components/products-and-pets/ProductSuggestion";
import { RootState } from "@/configs/types";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import firebaseService from "@/services/firebaseService";
import { toCurrency } from "@/utils/format";
import { Grid2 } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import dynamic from "next/dynamic";
import { Nunito_Sans, Roboto_Flex } from "next/font/google";
import { notFound } from "next/navigation";
import React, { useState } from "react";

const Rating = dynamic(() => import("@mui/material/Rating"), { ssr: false });

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
export interface IDetailProductProps {
  params: {
    id: string;
    name: string;
  };
}

export default function DetailProductPage({ params }: IDetailProductProps) {
  const { user } = useAppSelector((state: RootState) => state.userReducer);
  const [indexSizeAndPrice, setIndexSizeAndPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const { data, isLoading, error } = useQuery({
    queryKey: ["product-detail", params.id],
    queryFn: () => detailProduct(params.id),
  });
  if (error) {
    notFound();
  }
  const dataDetailProductPage = data?.data;

  const handleAddToCart = () => {};
  const handleBuyNow = () => {};

  return (
    <>
      <ContainerContent>
        <Grid2 container spacing={8} className="py-16">
          <Grid2 size={{ xs: 12, md: 5, lg: 5 }}>
            <div className=" w-full h-full rounded flex items-center justify-center">
              <PreviewImageProduct
                images={dataDetailProductPage?.images || []}
              />
            </div>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 7, lg: 7 }}>
            <div className="w-full h-full text-black-main max-w-full">
              <h2
                className={classNames("text-[28px] font-bold line-clamp-2", {
                  [nunitoSans.className]: true,
                })}
              >
                {dataDetailProductPage?.name}
              </h2>

              <div className="flex md:flex-row flex-col md:items-center gap-3 md:gap-0 mt-5 text-lg">
                <div
                  className={classNames(
                    "flex items-center gap-[10px] border-r border-gray-primary md:pr-4 md:mr-4",
                    {
                      [robotoFlex.className]: true,
                    }
                  )}
                >
                  <span
                    className={classNames(
                      "text-[28px] text-red-primary font-bold"
                    )}
                  >
                    {toCurrency(
                      dataDetailProductPage?.sizeAndPrice[indexSizeAndPrice]
                        .price
                    )}
                  </span>
                  <del className="">
                    {toCurrency(
                      dataDetailProductPage?.sizeAndPrice[indexSizeAndPrice]
                        .oldPrice
                    )}
                  </del>
                </div>

                <Rating
                  sx={{
                    "& .MuiSvgIcon-root": {
                      fontSize: "16px",
                    },
                  }}
                  name="read-only"
                  value={dataDetailProductPage?.rating || 0}
                  readOnly
                />
                <p className=" md:ml-3">
                  {dataDetailProductPage?.reviews} reviews
                </p>
              </div>

              {/* manufacture */}
              <span className="mt-[22px] inline-block">
                Manufacturer: <b>{dataDetailProductPage?.brand}</b>
              </span>
              <p
                dangerouslySetInnerHTML={{
                  __html: dataDetailProductPage?.description || "",
                }}
                className="line-clamp-6 mt-5 mb-7 text-1xl leading-8 text-[#374151] text-justify"
              ></p>

              <Sizes
                onSize={(size, index?: number) =>
                  setIndexSizeAndPrice(index ?? 0)
                }
                data={
                  dataDetailProductPage?.sizeAndPrice
                    ? dataDetailProductPage?.sizeAndPrice.map((item) => {
                        return item.size;
                      })
                    : []
                }
              />
              <Quantity
                onQuantity={(quantity: number) => {
                  setQuantity(quantity);
                }}
                maxValue={
                  dataDetailProductPage?.sizeAndPrice[indexSizeAndPrice].repo
                }
              />
              <div className="mt-[50px] flex items-center gap-5">
                <MainButton title="add to cart" onClick={handleAddToCart} />
                <MainButton
                  onClick={handleBuyNow}
                  background="bg-orange-primary"
                  title="buy now"
                />
              </div>
            </div>
          </Grid2>
        </Grid2>
        <DesAndReview
          description={dataDetailProductPage?.description || ""}
          reviews={dataDetailProductPage?.reviewItems || []}
        />
      </ContainerContent>
      <ProductSuggestion
        title="Suggestions just for you"
        fontSizeTitle="text-[24px]"
        data={dataDetailProductPage?.suggestions || []}
      />

      {isLoading && <LoadingPrimary />}
    </>
  );
}
