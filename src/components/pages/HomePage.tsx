import React from "react";
import { homePageData } from "@/data/home-page";
import ImpactOfYear from "@/components/impacts/ImpactOfYear";
import AboutCom from "@/components/common/common-components/AboutCom";
import Pets from "@/components/products-and-pets/Pets";
import { links } from "@/data/links";
import { dataTakeAction } from "@/data/adopt";
import Feedback from "@/components/common/common-components/Feedback";
export default function HomePage() {
  return (
    <>
      <ImpactOfYear data={(homePageData && homePageData.impactOfYear) || []} />
      <AboutCom />
      <Pets
        options={{
          buttonTitle: "See all",
          href: links.pets.adoptPage,
        }}
        data={(dataTakeAction && dataTakeAction.pets) || []}
      />
      <Feedback />
    </>
  );
}
