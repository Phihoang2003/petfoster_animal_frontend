"use client";
import { IPet } from "@/configs/interface";
import { links } from "@/data/links";
import { capitalize, stringToUrl } from "@/utils/format";
import Link from "next/link";
import { motion } from "framer-motion";
import React, { MouseEvent, useState } from "react";
import Image from "next/image";
import WrapperAnimation from "@/components/animations/WrapperAnimation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartBorder } from "@fortawesome/free-regular-svg-icons";
import classNames from "classnames";
import { useAppSelector } from "@/hooks/reduxHooks";
import { RootState } from "@/configs/types";
import { toast } from "react-toastify";
import { favorite } from "@/apis/pets";
import { contants } from "@/utils/constant";
import { delay } from "@/utils/functionals";
import firebaseService from "@/services/firebaseService";
import WrapperDialog from "@/components/dialogs/WrapperDialog";
import { appService } from "@/services/appService";
import { usePathname, useRouter } from "next/navigation";

export interface IPetProps {
  data: IPet;
}
export default function Pet({ data }: IPetProps) {
  const [isLike, setIsLike] = useState(data.like);

  const { user } = useAppSelector((state: RootState) => state.userReducer);
  const pathName = usePathname();
  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);

  const handleLike = async (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      toast.info("Please login to use");

      return appService.handleNonLogin(pathName, router);
    }

    if (isLike) {
      setOpenModal(true);
    } else {
      await handleFavorite();
    }
  };

  const handleFavorite = async (like = true) => {
    try {
      const response = await favorite(data.id as string);

      if (!response || response.errors) {
        toast.warn(contants.messages.errors.handle);
        return;
      }

      setIsLike(like);

      if (like) {
        await handlePublishNotification();
      }
    } catch (error) {
      toast.error(contants.messages.errors.server);
    }
  };

  const handlePublishNotification = async () => {
    if (!user) return;

    await delay(1000);
    await firebaseService.publistFavoriteNotification(data, user);
  };

  const handleUnfavorite = async () => {
    await handleFavorite(false);
    toast.success(`Unfavorited ${data.name}`);
    setOpenModal(false);
  };

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
              unoptimized={true}
            />

            <WrapperAnimation
              onClick={handleLike}
              className="absolute top-5 right-5 cursor-pointer"
            >
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

      {openModal && (
        <WrapperDialog open={openModal} setOpen={setOpenModal}>
          <div className="p-6 flex flex-col gap-4 items-center text-black-main">
            Do you want to unfavorite <b className="capitalize">{data.name}</b>
            <div className="flex items-center justify-between text-sm">
              <WrapperAnimation
                onClick={() => setOpenModal(false)}
                hover={{}}
                className="py-2 px-6 rounded-full hover:bg-[rgba(0,0,0,.2)] transition-all ease-linear cursor-pointer hover:text-white"
              >
                Cancel
              </WrapperAnimation>
              <WrapperAnimation
                onClick={handleUnfavorite}
                hover={{}}
                className="py-2 px-6 rounded-full hover:bg-[rgba(0,0,0,.2)] transition-all ease-linear cursor-pointer hover:text-white text-red-primary"
              >
                Unfavorite
              </WrapperAnimation>
            </div>
          </div>
        </WrapperDialog>
      )}
    </>
  );
}
