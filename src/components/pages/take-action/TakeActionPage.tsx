import ContainerContent from "@/components/common/common-components/ContainerContent";
import CategoriesOverview from "@/components/pages/take-action/CategoriesOverview";
import Overview from "@/components/pages/take-action/Overview";
import Products from "@/components/products-and-pets/Products";
import { takeActionData, takeActionPageData } from "@/data/take-action";
import React from "react";

export default function TakeActionPage() {
  return (
    <>
      <ContainerContent>
        <Overview />
        <CategoriesOverview />
      </ContainerContent>
      <Products
        data={takeActionPageData.newArrivals || []}
        title="NEW ARRIVALS"
      />
    </>
  );
}
