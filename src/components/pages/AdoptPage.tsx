"use client";
import { filterPets } from "@/apis/pets";
import ContainerContent from "@/components/common/common-components/ContainerContent";
import LoadingPrimary from "@/components/common/loadings/LoadingPrimary";
import Sort from "@/components/common/sorts/Sort";
import Pagination from "@/components/pages/pagination/Pagination";
import Pet from "@/components/products-and-pets/Pet";
import { IRequestFilterPet } from "@/configs/interface";
import { SortType } from "@/configs/types";
import { links } from "@/data/links";
import useGetPetAttributes from "@/hooks/useGetPetAttributes";
import { colors, Tooltip } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import MenuDropDown from "@/components/common/inputs/MenuDropDown";
import { dataTakeAction } from "@/data/adopt";
import MenuDropDownRatio from "@/components/common/inputs/MenuDropDownRatio";

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
  if (rawData.error || rawData.data?.errors) {
    notFound();
  }
  const ageMapping: { [key in "baby" | "medium" | "adult"]: string } = {
    baby: "1 years",
    medium: "3 years",
    adult: "5 years",
  };
  const petAttributes = useGetPetAttributes();
  useEffect(() => {
    setLoading(false);
  }, []);

  const conditionShowClearFiller = useCallback(() => {
    if (!filter) return false;

    if (
      filter.colors ||
      filter.gender ||
      filter.gender === false ||
      filter.age
    ) {
      return true;
    }
  }, [filter]);
  const handleClearAllFilter = () => {
    const persitKey = ["name", "typeName", "sort"];
    if (page) {
      router.push(baseUrl);
    }
    Object.keys(filter).forEach((key) => {
      if (!persitKey.includes(key)) {
        delete filter[key as keyof IRequestFilterPet];
      }
    });
    setFilter({ ...filter });
  };
  const data = rawData && rawData.data;
  return (
    <ContainerContent>
      <Sort
        categories={petAttributes?.data?.typies || []}
        onSearch={(value) => {
          setFilter((prev) => ({ ...prev, name: value }));
        }}
        onCategories={(value?: SortType) => {
          if (!value) {
            if (filter.typeName) {
              delete filter.typeName;
              setFilter({ ...filter });
            }

            return;
          }

          setFilter({
            ...filter,
            typeName: value.toLowerCase(),
          });
        }}
        onSorts={(value: SortType) => {
          setFilter({
            ...filter,
            sort: value === "low" ? "latest" : "oldest",
          });
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
          <div className="py-5 w-full border-b border-gray-primary flex items-center justify-between">
            <h6 className="font-medium text-xl">Filters</h6>

            {conditionShowClearFiller() && (
              <Tooltip title="Clear all filters" placement="top">
                <motion.div
                  onClick={handleClearAllFilter}
                  whileTap={{
                    scale: 0.9,
                  }}
                >
                  <FontAwesomeIcon
                    className="cursor-pointer"
                    icon={faRotateLeft}
                  />
                </motion.div>
              </Tooltip>
            )}
          </div>
          <MenuDropDown
            clearValue={{
              value: !conditionShowClearFiller(),
              option: {
                closeOnClear: true,
              },
            }}
            onValues={(colors: string[]) => {
              if (page) {
                router.push(baseUrl);
              }
              if (!colors.length && filter.colors) {
                delete filter.colors;
                setFilter({ ...filter });
                return;
              }
              setFilter({
                ...filter,
                colors: colors.join(","),
              });
            }}
            title={"Color"}
            data={petAttributes?.data?.colors.map((color) => color.name) || []}
          />
          <MenuDropDownRatio
            clearValue={{
              value: !conditionShowClearFiller(),
              option: {
                closeOnClear: true,
              },
            }}
            onValues={(age) => {
              if (age && typeof age === "string") {
                if (page) {
                  router.push(baseUrl);
                }
                const mappedAge =
                  ageMapping[age as keyof typeof ageMapping] || "5 years";
                setFilter({
                  ...filter,
                  age: mappedAge,
                });
              }
            }}
            title={"Size"}
            data={dataTakeAction.fillters.ages}
          />

          <MenuDropDownRatio
            clearValue={{
              value: !conditionShowClearFiller(),
              option: {
                closeOnClear: true,
              },
            }}
            onValues={(gender) => {
              if (gender && typeof gender === "string") {
                if (page) {
                  router.push(baseUrl);
                }
                setFilter({
                  ...filter,
                  gender: gender === "male",
                });
              }
            }}
            title={"Gender"}
            data={dataTakeAction.fillters.genthers}
          />
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
