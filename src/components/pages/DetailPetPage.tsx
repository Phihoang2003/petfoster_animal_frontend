"use client";
import React, { MouseEvent, useState } from "react";
import {
  IconDefinition,
  faBomb,
  faCat,
  faPalette,
  faPaw,
  faSitemap,
  faSyringe,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { capitalize } from "@/utils/format";
import ContainerContent from "@/components/common/common-components/ContainerContent";
import { useQuery } from "@tanstack/react-query";
import { petDetail } from "@/apis/pets";
import MainButton from "@/components/buttons/MainButton";
import PreviewImage from "@/components/products-and-pets/components/PreviewImage";
import Pets from "@/components/products-and-pets/Pets";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { RootState } from "@/configs/types";
import { toast } from "react-toastify";
export interface IDetailPetProps {
  params: [string, string];
}

const Li = ({
  icon,
  title,
  content,
}: {
  icon: IconDefinition;
  title: string;
  content?: string;
}) => {
  return (
    <li className="flex items-center gap-4 w-full">
      <div className="text-lg flex items-center gap-2 ">
        <FontAwesomeIcon className="" icon={icon} />
        <span>{title}:</span>
      </div>
      <p className="truncate capitalize">{content && capitalize(content)}</p>
    </li>
  );
};
export default function DetailPetPage({ params }: IDetailPetProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["petDetail", params[0]],
    queryFn: () => petDetail(params[0]),
  });

  const router = useRouter();
  const { user } = useAppSelector((state: RootState) => state.userReducer);

  const dispath = useAppDispatch();

  const [openModal, setOpenModal] = useState(false);

  const detailData = data && data.data;

  const handleLike = async (e: MouseEvent<HTMLDivElement>) => {
    if (!data?.data.pet) return;
    e.stopPropagation();
    e.preventDefault();
    if (!user) {
      toast.info("Please login to use");
      return;
    }
    if (data.data.pet.like) {
      setOpenModal(true);
    } else {
      await handleFavorite();
    }
  };
  const handleFavorite = async () => {
    if (!data?.data.pet) return;
    try {
    } catch (error) {}
  };
  const handleAdopt = () => {};

  return (
    <>
      <ContainerContent className="pt-24 pb-8">
        <div className="text-black-main">
          <h2 className="uppercase font-bold text-4xl mb-11 pl-4 md:pl-14">
            pet details
          </h2>
          <div className=" py-[30px] pr-4 pl-4 md:pl-14 rounded-[18px] shadow-primary">
            <div className="w-full flex flex-col md:flex-row gap-10">
              <PreviewImage images={detailData?.pet.images || []} />
              <div className="w-full md:w-[40%] ">
                <div className="text-[25px] font-bold text-green-dark-md uppercase pb-1 border-b border-gray-[#DBDBDB]">
                  <h2>{detailData?.pet.name}</h2>
                </div>
                <ul className="mt-[22px] mb-10 flex flex-col gap-4">
                  <Li
                    icon={faCat}
                    title="Type"
                    content={detailData?.pet.type}
                  />
                  <Li
                    icon={faPalette}
                    title="Colors"
                    content={detailData?.pet.color}
                  />
                  <Li
                    icon={faVenus}
                    title="Genther"
                    content={detailData?.pet.sex}
                  />
                  <Li
                    icon={faSitemap}
                    title="Size"
                    content={detailData?.pet.size}
                  />
                  <Li
                    icon={faBomb}
                    title="Sterilization"
                    content={detailData?.pet.sterilization}
                  />
                  {/* <Li icon={faSyringe} title="Vaccination" content={detailData?.pet.vaccination} /> */}
                  <li className="text-lg flex items-center gap-2 ">
                    <FontAwesomeIcon className="" icon={faPaw} />
                    <p className="truncate text-fill-heart">
                      Mom and Dad, {"I've"} been waiting{" "}
                      <b>{detailData?.pet.fosterDate}</b> days
                    </p>
                  </li>
                </ul>
                <div className="mt-10 flex items-center justify-center md:justify-start flex-col lg:flex-row gap-3">
                  <MainButton
                    onClick={handleLike}
                    width={207}
                    background="bg-orange-primary"
                    title={data?.data.pet.like ? "Unfavorite" : "Favorite"}
                  />
                  {data?.data.pet.canAdopt && (
                    <MainButton
                      onClick={handleAdopt}
                      width={207}
                      title="adopt"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* description */}
            <div className="flex flex-col pr-[58px] pt-8 gap-5">
              <h6 className="text-2xl font-medium">Description</h6>
              <p
                className="text-1xl"
                dangerouslySetInnerHTML={{
                  __html: detailData?.pet.description.replace(
                    /\\n/g,
                    "<br/> <br/>"
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </ContainerContent>
      <Pets
        bottom="none"
        heading={
          <h2 className="text-black-main text-left pb-[35px] text-4xl font-bold uppercase">
            Other Pet
          </h2>
        }
        background="bg-white"
        data={detailData?.others || []}
      />
    </>
  );
}
