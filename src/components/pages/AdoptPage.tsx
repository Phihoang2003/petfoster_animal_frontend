"use client";
import ContainerContent from "@/components/common/common-components/ContainerContent";
import Sort from "@/components/common/sorts/Sort";
import { IRequestFilterPet } from "@/configs/interface";
import { links } from "@/data/links";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function AdoptPage() {
  const baseUrl = links.pets.adoptPage;
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page");
  const [filter, setFilter] = useState<IRequestFilterPet>({});
  const [loading, setLoading] = useState(false);

  return (
    <ContainerContent>
      <Sort
        categories={[]}
        options={{
          search: {
            placeholder: "Search for name pet...",
          },
          sort: {
            title: "Foster at",
          },
          categorie: {
            title: "Type",
          },
        }}
      />
    </ContainerContent>
  );
}
