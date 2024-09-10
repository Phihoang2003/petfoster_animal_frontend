"use client";
import { filterPets } from "@/apis/pets";
import ContainerContent from "@/components/common/common-components/ContainerContent";
import LoadingPrimary from "@/components/common/loadings/LoadingPrimary";
import Sort from "@/components/common/sorts/Sort";
import Pagination from "@/components/pages/pagination/Pagination";
import Pet from "@/components/products-and-pets/Pet";
import { IRequestFilterPet } from "@/configs/interface";
import { links } from "@/data/links";
import useGetPetAttributes from "@/hooks/useGetPetAttributes";
import { useQuery } from "@tanstack/react-query";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function AdoptPage() {
  const baseUrl = links.pets.adoptPage;
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page");
  const [filter, setFilter] = useState<IRequestFilterPet>({});
  const [loading, setLoading] = useState(false);
  const rawData = useQuery({
    queryKey: ["petFilterPage/filterPets", filter, page],
    queryFn: () =>
      filterPets({
        ...filter,
        page: typeof page === "string" ? parseInt(page) - 1 + "" : "0",
      }),
  });
  const petAttributes = useGetPetAttributes();
  useEffect(() => {
    setLoading(false);
  }, []);
  if (rawData.error || rawData.data?.errors) {
    notFound();
  }
  const data = rawData && rawData.data;

  return (
    <ContainerContent>
      <Sort
        categories={petAttributes?.data?.typies || []}
        onSearch={(value) => {
          setFilter((prev) => ({ ...prev, name: value }));
        }}
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
      <div className="flex md:flex-row flex-col justify-between min-h-[1000px] mt-9 gap-[38px]">
        <div className="w-full md:w-[24%] lg:w-[20%] h-full text-black-main select-none">
          Filter Sort
        </div>
        {((page && data?.data && parseInt(page) - 1 > data?.data.pages) ||
          !data?.data.data.length) &&
          !loading && (
            <div className="flex-1 flex flex-col items-center text-black-main">
              <b>No data available</b>
            </div>
          )}
        {data?.data && data.data.data.length > 0 && !loading && (
          <div className="flex-1 flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] gap-y-9">
              {data?.data.data.map((pet) => {
                return <Pet key={pet.id} data={pet} />;
              })}
            </div>
            <Pagination
              baseHref={baseUrl + "?page="}
              pages={data?.data.pages || 1}
            />
          </div>
        )}
        {(rawData.isLoading || loading) && <LoadingPrimary />}
      </div>
    </ContainerContent>
  );
}
