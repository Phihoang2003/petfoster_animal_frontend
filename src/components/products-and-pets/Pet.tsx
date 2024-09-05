"use client";
import { IPet } from "@/configs/interface";
import { links } from "@/data/links";
import { capitalize, stringToUrl } from "@/utils/format";
import Link from "next/link";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import WrapperAnimation from "@/components/animations/WrapperAnimation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartBorder } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames";

export interface IPetProps {
  data: IPet;
}
export default function Pet({ data }: IPetProps) {
  const [isLike, setIsLike] = useState(data.like);
  return (
    <>
      <Link href={links.pet + `${data.id}/${stringToUrl(data.name)}`}>
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-2xl overflow-hidden shadow-lg w-ful h-[450px] flex flex-col gap-4 select-none"
        >
          <div className="w-full h-[56%] overflow-hidden relative">
            <Image
              className="w-full h-full object-cover"
              src={data.image}
              alt={data.image}
              width={300}
              height={300}
            />

            <WrapperAnimation className="absolute top-5 right-5 cursor-pointer">
              <FontAwesomeIcon
                className={classNames(" w-5 h-5", {
                  "text-fill-heart": isLike,
                  "text-white": !isLike,
                })}
                icon={isLike ? faHeart : faHeartBorder}
              />
            </WrapperAnimation>
          </div>

          <div className="px-4 flex-1">
            <div className="flex items-center justify-between text-green-dark-md">
              <h2 className="text-1xl font-semibold">
                {data.name.toUpperCase()}
              </h2>
              <span className="font-medium text-sm">
                {capitalize(data.breed)}
              </span>
            </div>
            <ul className="flex flex-col gap-2 mt-2 text-black-main text-[13px]">
              <li className="flex items-center gap-1">
                <FontAwesomeIcon
                  className="h-[8px] w-[8px] text-fill-heart"
                  icon={faHeart}
                />
                <p className="capitalize">{`${data.size} ${data.sex} ${data.type}`}</p>
              </li>
              <li className="flex items-center gap-1">
                <FontAwesomeIcon
                  className="h-[8px] w-[8px] text-fill-heart"
                  icon={faHeart}
                />
                <p className="">Fostered on: {data.fostered}</p>
              </li>
              <li className="flex items-center gap-1  ">
                <FontAwesomeIcon
                  className="h-[8px] w-[8px] text-fill-heart"
                  icon={faHeart}
                />
                <p className=" line-clamp-2 text-[#888282]">
                  {data.description + "..."}
                </p>
              </li>
            </ul>
            <div className="w-full h-[1px] bg-[#DDDDDD] my-[14px]"></div>
            <div className="flex items-center justify-between text-xs">
              <span className="w-[80%] line-clamp-1">
                {!data.adoptAt && (
                  <>
                    I have waited for{" "}
                    <strong className="text-fill-heart font-bold">
                      {data.fosterDate}
                    </strong>{" "}
                    days
                  </>
                )}
                {data.adoptAt && (
                  <>
                    Adopt at{" "}
                    <strong className="text-fill-heart font-bold">
                      {data.adoptAt}
                    </strong>
                  </>
                )}
              </span>

              <div className="flex items-center text cursor-pointer gap-1">
                <span className="hover:underline text-green-main-dark">
                  Details
                </span>
                <Image
                  src={"/icons/hand-cat-small.svg"}
                  alt="hand-cat"
                  width={15}
                  height={15}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </>
  );
}
