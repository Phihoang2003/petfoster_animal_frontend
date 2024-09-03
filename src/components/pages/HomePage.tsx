import React from "react";
import { homePageData } from "@/data/home-page";
import ImpactOfYear from "@/components/impacts/ImpactOfYear";
export default function HomePage() {
  return (
    <>
      <ImpactOfYear data={(homePageData && homePageData.impactOfYear) || []} />
    </>
  );
}
