"use client";
import { takeAction } from "@/apis/app";
import BannerTakeAction from "@/components/common/BannerTakeAction";
import ContainerContent from "@/components/common/common-components/ContainerContent";
import CategoriesOverview from "@/components/pages/take-action/CategoriesOverview";
import LogicalTakeAction from "@/components/pages/take-action/LogicalTakeAction";
import Overview from "@/components/pages/take-action/Overview";
import ProductRecents from "@/components/products-and-pets/ProductRecents";
import Products from "@/components/products-and-pets/Products";
import { takeActionData, takeActionPageData } from "@/data/take-action";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

export default function TakeActionPage() {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["product/TakeAtionPage"],
    queryFn: () => takeAction(),
  });

  if (error) {
    router.push("/");
    return <span></span>;
  }

  return (
    <>
      <ContainerContent>
        <Overview />
        <CategoriesOverview />
      </ContainerContent>
      <Products data={data?.data.newArrivals || []} title="NEW ARRIVALS" />
      <BannerTakeAction />
      <LogicalTakeAction />
      <ProductRecents title={"YOUR RECENT VIEW"} />
    </>
  );
}
