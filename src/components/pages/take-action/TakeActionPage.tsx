import ContainerContent from "@/components/common/common-components/ContainerContent";
import CategoriesOverview from "@/components/pages/take-action/CategoriesOverview";
import Overview from "@/components/pages/take-action/Overview";
import React from "react";

export default function TakeActionPage() {
  return (
    <>
      <ContainerContent>
        <Overview />
        <CategoriesOverview />
      </ContainerContent>
    </>
  );
}
