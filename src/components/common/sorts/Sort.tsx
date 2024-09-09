"use client";
import WrapperTippy from "@/components/boxs/WrapperTippy";
import Select from "@/components/common/inputs/Select";
import SearchItem from "@/components/common/sorts/SearchItem";
import { IFilter } from "@/configs/interface";
import { SortType } from "@/configs/types";
import { capitalize } from "@/utils/format";
import {
  faChevronDown,
  faChevronUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControl, MenuItem, TextField } from "@mui/material";
import React, { useRef, useState } from "react";

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
  const ref = useRef<HTMLDivElement>(null);
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
  const handleChangeCategory = () => {};
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
      <div className="flex-1">
        <div className="flex md:items-center flex-row w-full gap-3 justify-between">
          <div className="flex items-center gap-[10px] flex-1">
            <h4 className="text-lg">{options.categorie?.title}</h4>
            <div ref={ref} className="w-full md:max-w-[210px]">
              <FormControl fullWidth size="small">
                <Select
                  name="category"
                  displayEmpty
                  id="category"
                  value={category}
                  onChange={handleChangeCategory}
                >
                  <MenuItem value={""}>{capitalize("all")}</MenuItem>
                  {categories.map((category) => {
                    return (
                      <MenuItem
                        key={category.name}
                        value={
                          (options.categorie?.useId
                            ? String(category.id)
                            : category.name) || category.name
                        }
                      >
                        {capitalize(category.name)}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="w-[28%] lg:w-[14%] flex items-center justify-end select-none">
            <div
              onClick={() => setSort(sort === "high" ? "low" : "high")}
              className="cursor-pointer flex items-center gap-2 justify-end h-full hover:underline"
            >
              <span className="text-lg">{options.sort?.title}</span>
              <FontAwesomeIcon
                className="text-sm"
                icon={sort === "high" ? faChevronUp : faChevronDown}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
