import React from "react";
import { homePageData } from "@/data/home-page";
import ImpactOfYear from "@/components/impacts/ImpactOfYear";
import AboutCom from "@/components/common/common-components/AboutCom";
export default function HomePage() {
  return (
    <>
      <ImpactOfYear data={(homePageData && homePageData.impactOfYear) || []} />
      <AboutCom />
    </>
  );
}
