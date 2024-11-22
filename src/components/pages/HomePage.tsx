"use client";
import React from "react";
import { homePageData } from "@/data/home-page";
import ImpactOfYear from "@/components/impacts/ImpactOfYear";
import AboutCom from "@/components/common/common-components/AboutCom";
import Pets from "@/components/products-and-pets/Pets";
import { links } from "@/data/links";
import Feedback from "@/components/common/common-components/Feedback";
import { useQuery } from "@tanstack/react-query";
import { homepage } from "@/apis/app";
import { notFound } from "next/navigation";
export default function HomePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["homepage"],
    queryFn: () => homepage(),
  });

  if (error || data?.errors) {
    notFound();
  }
  return (
    <>
      <ImpactOfYear data={(homePageData && homePageData.impactOfYear) || []} />
      <AboutCom />
      <Pets
        options={{
          buttonTitle: "See all",
          href: links.pets.adoptPage,
        }}
        data={(data && data.data.pets) || []}
      />
      <Feedback />
    </>
  );
}
