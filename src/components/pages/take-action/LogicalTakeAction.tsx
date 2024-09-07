"use client";
import Products from "@/components/products-and-pets/Products";
import { takeActionPageData } from "@/data/take-action";
import React from "react";

export default function LogicalTakeAction() {
  return (
    <>
      <Products
        id="best-sellers"
        data={takeActionPageData?.bestSellers?.data || []}
        title="BEST SELLERS"
      />
    </>
  );
}
