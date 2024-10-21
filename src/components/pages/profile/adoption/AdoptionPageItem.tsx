"use client";
import { cancelAdoptionPet } from "@/apis/pets";
import CustomReasonDialog from "@/components/dialogs/CustomReasonDialog";
import { IAdoption } from "@/configs/interface";
import { LabelAdopt } from "@/configs/types";
import { adoptionReasons, adoptionReasonsForUser } from "@/data/reason";
import firebaseService from "@/services/firebaseService";
import { contants } from "@/utils/constant";
import {
  faCat,
  faHeart,
  faMars,
  faMaximize,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import moment from "moment";
import { Nunito_Sans } from "next/font/google";
import React, { useState } from "react";
import { toast } from "react-toastify";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["500", "600"],
});

const Label = ({
  type,
  showDetailType = false,
}: {
  type: LabelAdopt;
  showDetailType?: boolean;
}) => {
  const cancelArr = ["cancelled by admin", "cancelled by customer"];

  return (
    <div
      className={classNames(
        "capitalize py-1 px-3 text-xs md:py-2 md:px-5 rounded-full  md:text-sm text-black-main font-medium",
        {
          ["bg-adopted"]: type.toLocaleLowerCase() === "adopted",
          ["bg-register"]: type.toLocaleLowerCase() === "waiting",
          ["bg-[#D3D7FF]"]: type.toLocaleLowerCase() === "registered",
          ["bg-cancelled"]: cancelArr.includes(type.toLocaleLowerCase()),
        }
      )}
    >
      {!showDetailType &&
        (cancelArr.includes(type.toLocaleLowerCase()) ? "Cancel" : type)}
      {showDetailType && type}
    </div>
  );
};

export interface IAdoptionPageItemProps {
  data: IAdoption;
  styles?: {
    image?: string;
  };
  showHeart?: boolean;
  showDetailType?: boolean;
  advanced?: boolean;
  onBeforeCancel?: () => void;
  onBeforeAccept?: () => void;
  onBeforeComfirm?: () => void;
}

export default function AdoptionPageItem({
  data,
  styles,
  showHeart = true,
  showDetailType = false,
  advanced,
  onBeforeCancel,
  onBeforeAccept,
  onBeforeComfirm,
}: IAdoptionPageItemProps) {
  const [types, setTypes] = useState<LabelAdopt>(
    data.state.toLowerCase() as LabelAdopt
  );
  const [openReason, setOpenReason] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmitCancel = async (reason: string) => {
    if (advanced) {
      // await handleCancelByAdmin(reason);
    } else {
      await handleCancel(reason);
    }

    // if (!advanced || !onBeforeCancel) return;
    // setOpenAdvanced(false);
    // onBeforeCancel();
  };

  const handleCancel = async (reason: string) => {
    try {
      setLoading(true);
      const response = await cancelAdoptionPet({ id: String(data.id), reason });

      if (!response || response.errors) {
        return toast.warn(response.message);
      }

      toast.success("Cancellation successful");
      requestIdleCallback(handleClearWhenSuccess);
    } catch (error) {
      return toast.error(contants.messages.errors.server);
    } finally {
      setLoading(false);
      await firebaseService.publistCancelAdoptPetNotification(data, reason);
    }
  };

  const handleClearWhenSuccess = () => {
    if (advanced) {
      setTypes("cancelled by admin");
      return;
    }
    setTypes("cancelled by customer");
  };
  return (
    <div className="relative overflow-hidden rounded-lg p-4 select-none shadow-primary flex gap-7 min-h-[100px] border border-gray-primary transition-all ease-linear w-full items-center">
      <div
        className={classNames(
          "h-full aspect-square rounded-xl overflow-hidden hidden md:block hover:shadow-primary transition-all ease-linear ",
          {
            ["w-1/3"]: !styles?.image,
            [styles?.image || ""]: styles?.image,
          }
        )}
      >
        <img
          className="w-full h-full object-cover hover:scale-110 transition-all ease-linear"
          src={data.pet.image}
          alt={data.pet.image}
        />
      </div>
      {/* data */}
      <div className="flex-1 flex flex-col justify-between py-4 w-full h-full gap-3 relative select-none">
        <div className="flex items-center justify-between">
          <h4
            className={classNames("text-lg font-bold capitalize", {
              [nunito.className]: true,
            })}
          >
            {data.pet.name}
          </h4>

          {!(
            [
              "adopted",
              "cancelled",
              "cancelled by admin",
              "cancelled by customer",
            ] as LabelAdopt[]
          ).includes(types) &&
            !advanced && (
              <span
                onClick={() => setOpenReason(true)}
                className="w-1/4 text-center text-[15px] text-[#505DE8] hover:underline cursor-pointer"
              >
                Cancel
              </span>
            )}
        </div>
        <ul className="flex items-center gap-7 text-black-main">
          <li className="flex items-center gap-1 text-[#727272]">
            <span className="flex items-center justify-center ">
              <FontAwesomeIcon className="" icon={faCat} />
            </span>
            <span className="hidden md:inline-block capitalize">
              {data.pet.type}
            </span>
          </li>
          <li className="flex items-center gap-1 text-[#727272]">
            <span className="flex items-center justify-center ">
              <FontAwesomeIcon
                className=""
                icon={data.pet.sex === "male" ? faMars : faVenus}
              />
            </span>
            <span className="hidden md:inline-block capitalize">
              {data.pet.sex}
            </span>
          </li>
          <li className="flex items-center gap-1 text-[#727272]">
            <span className="flex items-center justify-center ">
              <FontAwesomeIcon className="" icon={faMaximize} />
            </span>
            <span className="hidden md:inline-block capitalize">
              {data.pet.size}
            </span>
          </li>
        </ul>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Label showDetailType={showDetailType} type={types} />
            {!["adopted", "registered"].includes(types) && (
              <span className="text-sm text-[#727272]">
                {moment(data.registerAt).format("MMM Do YY")}
              </span>
            )}
            {types === "registered" && (
              <span className="text-sm text-[#727272]">
                {moment(data.pickUpDate).format("MMM Do YY")}{" "}
                <small className="text-xs italic mr-1">
                  Please arrive during this time to pick up
                </small>
              </span>
            )}
            {types === "adopted" && (
              <span className="text-sm text-[#727272]">
                {moment(data.adoptAt).format("MMM Do YY")}
              </span>
            )}
          </div>

          {showHeart && (
            <div className="w-1/4 flex items-center justify-center">
              <FontAwesomeIcon
                className={classNames("", {
                  ["text-fill-heart"]: data.pet.like,
                  ["text-inherit"]: !data.pet.like,
                })}
                icon={faHeart}
              />
            </div>
          )}
        </div>

        {/* phone and address */}
        <div className="text-sm text-black-main flex items-start gap-5">
          <div className="flex flex-col gap-1">
            <span>Phone: {data.phone}</span>
            <span>Address: {data.address}</span>
          </div>
        </div>
      </div>
      {openReason && (
        <CustomReasonDialog
          handleAfterClickSend={handleSubmitCancel}
          onClose={() => setOpenReason(false)}
          reasons={advanced ? adoptionReasons : adoptionReasonsForUser}
        />
      )}
    </div>
  );
}
