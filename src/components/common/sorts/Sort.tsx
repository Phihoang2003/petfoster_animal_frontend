"use client";
import WrapperTippy from "@/components/boxs/WrapperTippy";
import SearchItem from "@/components/common/sorts/SearchItem";
import { IFilter } from "@/configs/interface";
import { SortType } from "@/configs/types";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField } from "@mui/material";
import React, { useState } from "react";

export interface ISortProps {
  initDataCategory?: string;
  categories: IFilter[];
  sorts?: { title: string; value: string }[];
  onCategories?: (value?: SortType, id?: string) => void;
  onSorts?: (value: SortType) => void;
  onSearch?: (value: string) => void;
  options?: {
    search?: {
      placeholder?: string;
    };
    sort?: {
      title: string;
    };
    categorie?: {
      title: string;
      useId?: boolean;
    };
  };
}
export default function Sort({
  categories,
  sorts,
  initDataCategory,
  options = {
    search: { placeholder: "Search for product..." },
    sort: { title: "Sort" },
    categorie: { title: "Categories:", useId: false },
  },
  onCategories,
  onSorts,
  onSearch,
}: ISortProps) {
  const [category, setCategory] = useState(initDataCategory || "");
  const [sort, setSort] = useState<"high" | "low">("low");
  const [search, setSearch] = useState("");
  const [toggleHistory, setToggleHistory] = useState(false);
  const searchHistoriesData = [
    {
      id: 1,
      title: "hello",
    },
    {
      id: 2,
      title: "hello2",
    },
  ];
  const handleDeleteSearchItem = () => {};
  const handlePushSearchHistory = () => {};
  const handleOpenHistory = () => {
    setToggleHistory(true);
  };

  return (
    <div className="flex md:flex-row flex-col justify-between gap-[38px] border-b border-[#DBDBDB] mt-24 pb-[22px]">
      <div className="w-full md:w-[24%] lg:w-[20%] h-full text-black-main select-none">
        <WrapperTippy
          interactive
          visible={toggleHistory && searchHistoriesData.length > 0}
          onClickOutside={() => setToggleHistory(false)}
          renderEl={
            <>
              <div className="scroll w-full max-h-[200px] overflow-y-auto bg-[#F2F2F2] rounded py-2 flex flex-col">
                {searchHistoriesData.map((item) => {
                  return (
                    <SearchItem
                      handleDelete={handleDeleteSearchItem}
                      onClickItem={handlePushSearchHistory}
                      key={item.id}
                      data={item}
                    />
                  );
                })}
              </div>
            </>
          }
        >
          <div className="w-full relative">
            <TextField
              onClick={handleOpenHistory}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              id="search-pet-1"
              name="pet"
              fullWidth
              size="small"
              placeholder={options.search?.placeholder}
              autoComplete="off"
            />

            {search.length > 0 && (
              <span
                onClick={() => setSearch("")}
                className="absolute top-[50%] translate-y-[-50%] right-3 cursor-pointer"
              >
                <FontAwesomeIcon icon={faXmark} />
              </span>
            )}
          </div>
        </WrapperTippy>
      </div>
    </div>
  );
}
