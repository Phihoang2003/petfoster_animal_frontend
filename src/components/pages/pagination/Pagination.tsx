import HandCatButton from "@/components/buttons/HandCatButton";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { MouseEvent, useEffect, useState } from "react";

export interface IPaginationProps {
  pages: number;
  pageLimit?: number;
  maxPageLimit?: number;
  minPageLimit?: number;
  onPage?: (page: number) => void;
  py?: string;
  baseHref?: string;
}
export default function Pagination({
  pages,
  pageLimit = 4,
  maxPageLimit = 4,
  minPageLimit = 0,
  py = "py-[70px]",
  baseHref,
  onPage,
}: IPaginationProps) {
  const _height = "48px";
  const param = useSearchParams();
  const page = param.get("page");
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(page || "1") || 1
  );
  const [pageNumberLimit, setpageNumberLimit] = useState(pageLimit);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(maxPageLimit);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(minPageLimit);
  const handleClick = (e: MouseEvent, currentPage: number) => {
    setCurrentPage(currentPage);
  };
  const pagesArr: number[] = [];
  for (let i = 1; i <= pages; i++) {
    pagesArr.push(i);
  }
  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
    if (baseHref) {
      router.push(baseHref + (currentPage + 1));
    }
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
    if (baseHref) {
      router.push(baseHref + (currentPage - 1));
    }
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  let pageIncrementBtn = null;
  if (pagesArr.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <HandCatButton size={_height} onClick={handleNextBtn} title={"..."} />
    );
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <HandCatButton size={_height} onClick={handlePrevBtn} title={"..."} />
    );
  }
  const getActive = (num: number) => {
    if (baseHref) {
      if (!page && num === 1) return true;

      return page ? parseInt(page as string) === num : false;
    }
    return currentPage === num;
  };
  const renderPageNumbers = pagesArr.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <Link href={baseHref ? baseHref + number : ""} key={number}>
          <HandCatButton
            size={_height}
            onClick={(e) => handleClick(e, number)}
            active={getActive(number)}
            title={number}
          />
        </Link>
      );
    }
  });
  useEffect(() => {
    if (!onPage) return;
    onPage(currentPage);
  }, [currentPage, onPage]);

  useEffect(() => {
    if (currentPage > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      return;
    }
  }, [currentPage, maxPageNumberLimit, minPageNumberLimit, pageNumberLimit]);

  return (
    <div
      className={classNames(
        " flex items-center justify-center gap-1 md:gap-4 lg:gap-8 w-full select-none",
        {
          [py]: true,
        }
      )}
    >
      <HandCatButton
        size={_height}
        onClick={handlePrevBtn}
        disable={currentPage == pagesArr[0] ? true : false}
        title={<FontAwesomeIcon icon={faChevronLeft} />}
      />

      {pageDecrementBtn}
      {renderPageNumbers}
      {pageIncrementBtn}

      <HandCatButton
        onClick={handleNextBtn}
        disable={currentPage == pagesArr[pagesArr.length - 1] ? true : false}
        size={_height}
        title={<FontAwesomeIcon icon={faChevronRight} />}
      />
    </div>
  );
}
