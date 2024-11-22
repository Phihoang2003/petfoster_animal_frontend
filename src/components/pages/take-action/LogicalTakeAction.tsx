"use client";
import { bestSellers } from "@/apis/app";
import Products from "@/components/products-and-pets/Products";
import { takeActionPageData } from "@/data/take-action";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function LogicalTakeAction() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product/logicalTakeAction"],
    queryFn: () => bestSellers(0),
  });
  return (
    <>
      <Products
        id="best-sellers"
        loading={isLoading}
        data={
          error ? takeActionPageData.bestSellers.data : data?.data?.data || []
        }
        title="BEST SELLERS"
      />
    </>
  );
}
