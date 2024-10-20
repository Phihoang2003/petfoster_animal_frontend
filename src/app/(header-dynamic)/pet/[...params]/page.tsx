"use client";
import DetailPetPage from "@/components/pages/DetailPetPage";
import React from "react";

export interface IDetailPetProps {
  params: { params: [string, string] };
}
export default function DetailPet({ params }: IDetailPetProps) {
  const [id, name] = params.params;
  return <DetailPetPage params={params.params} />;
}
