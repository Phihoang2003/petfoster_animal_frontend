"use client";
import { adoptionPet } from "@/apis/pets";
import { getAddresses } from "@/apis/user";
import WrapperAnimation from "@/components/animations/WrapperAnimation";
import BoxTitle from "@/components/boxs/BoxTitle";
import MainButton from "@/components/buttons/MainButton";
import WrapperDialog from "@/components/dialogs/WrapperDialog";
import { IInfoAddress } from "@/configs/interface";
import { RootState } from "@/configs/types";
import { links } from "@/data/links";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { clear, clearAsked, setAsked } from "@/redux/slice/adoptSlice";
import firebaseService from "@/services/firebaseService";
import { contants } from "@/utils/constant";
import { addressToString } from "@/utils/format";
import { delay } from "@/utils/functionals";
import Validate from "@/utils/validate";
import { Box, Checkbox, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const _Item = ({
  title,
  initData,
  onChecked,
}: {
  title: string;
  initData?: string[] | null;
  onChecked?: (v: string, check?: boolean) => void;
}) => {
  const [check, setCheck] = useState(
    (initData && initData.includes(title)) || false
  );

  useEffect(() => {
    if (initData && onChecked && initData.includes(title)) {
      onChecked(title, check);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      onClick={() => {
        setCheck((prev) => !prev);
        if (onChecked) {
          onChecked(title, check);
        }
      }}
      component={"div"}
      className="py-2 px-3 rounded-lg bg-[#F2F2F2] text-black-main text-1xl flex items-center justify-between gap-2"
    >
      <p className="flex-1">{title}</p>
      <Checkbox checked={check} />
    </Box>
  );
};

export default function AskConditionPage() {
  const [conditions, setConditions] = useState(() => new Set<string>());
  const { petAdopt, asked } = useAppSelector(
    (state: RootState) => state.adoptReducer
  );
  const { user } = useAppSelector((state: RootState) => state.userReducer);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState<IInfoAddress | null>(null);
  const dataAddress = useQuery({
    queryKey: ["getAddresses"],
    queryFn: () => getAddresses(),
  });

  const validate = useCallback(() => {
    return conditions.size <= 0;
  }, [conditions]);

  const handleClickContactIntoview = () => {
    if (!user) {
      return toast.warn("Plese login to use !");
    }

    if (!petAdopt) {
      return toast.warn("You haven't chosen a pet yet !");
    }

    if (validate()) {
      return toast.warn("You must meet at least one requirement !");
    }

    setOpen(true);

    if (conditions.size <= 0) return;

    dispatch(setAsked(Array.from(conditions)));
  };

  const handleContactToView = async () => {
    if (!user) {
      return toast.warn("Plese login to use !");
    }

    if (!petAdopt) {
      return toast.warn("You haven't chosen a pet yet !");
    }

    if (!phone) {
      return toast.warn("Please select contact information !");
    }

    if (validate()) {
      return toast.warn("You must meet at least one requirement !");
    }
    try {
      setLoading(true);
      const res = await adoptionPet({
        userId: user.id,
        petId: petAdopt.id as string,
        addressId: phone?.id,
      });

      if (!res || res.errors) {
        return toast.warn(res.message);
      }

      toast.success(
        "Your request has been sent. We will contact as soon as possible !"
      );
      setOpen(false);
      // router.push(links.users.profiles.adoption);
      await delay(1000);
      await firebaseService.publistAdoptPetNotification(
        petAdopt,
        user.username,
        phone.phone,
        user.displayName
      );
      dispatch(clear());
    } catch (error) {}
  };

  const dataPhone = useMemo(() => {
    if (dataAddress.data?.errors || dataAddress.isError) return [];

    if (!dataAddress.data || !dataAddress.data.data) return [];

    return dataAddress.data.data;
  }, [dataAddress]);

  return (
    <BoxTitle title="WE ASK? YOU ANSWER" locationTitle="center">
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#fff",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          p: "40px",
          borderRadius: "8px",
        }}
      >
        <Typography className="text-green-5FA503 text-justify">
          We only allow direct adoption, not adoption for others, so please
          discuss all of the following questions{" "}
        </Typography>
        <Stack sx={{ mt: "36px", mb: "40px" }} spacing={"16px"}>
          {contants.askConditions.map((item, index) => {
            return (
              <_Item
                key={item}
                initData={asked}
                title={index + 1 + `. ${item}`}
                onChecked={(value, check) => {
                  if (conditions.has(value) && !check) {
                    setConditions((prev) => {
                      const temp = new Set(prev);
                      temp.delete(value);
                      return temp;
                    });
                    return;
                  }
                  setConditions((prev) => new Set(prev).add(value));
                }}
              />
            );
          })}
        </Stack>
        {/* button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MainButton
            onClick={handleClickContactIntoview}
            width={"fit-content"}
            title="CONTACT TO INTERVIEW"
          />
        </Box>
      </Box>
      {/* dialog confirm */}
      <WrapperDialog
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "18px",
          },
        }}
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        setOpen={setOpen}
      >
        <div className="p-5 text-black-main">
          <h4 className="text-2xl font-bold mb-5"> Confirm</h4>
          <div className="flex items-start justify-between flex-col md:flex-row gap-5">
            <div className="w-full md:w-1/2 flex justify-start flex-col gap-3">
              <span className="flex items-center gap-3 capitalize">
                <span className="font-medium">subscriber: </span>
                <p>{user?.fullName || user?.displayName}</p>
              </span>
              <span className="font-medium">Contact phone number: </span>
              <div className="flex items-center flex-wrap gap-2">
                <small className="text-xs italic ">
                  Select a phone number from the list or{" "}
                  <Link
                    href={links.users.profiles.address}
                    className="text-blue-primary hover:underline cursor-pointer"
                  >
                    another phone number
                  </Link>{" "}
                  to contact
                </small>
                {dataPhone.length >= 0 &&
                  dataPhone.map((item) => {
                    return (
                      <WrapperAnimation
                        key={item.id}
                        onClick={() => setPhone(item)}
                        hover={{}}
                        className={classNames(
                          "rounded-md shadow-primary px-5 py-2 w-full border capitalize text-sm cursor-pointer select-none flex gap-2 flex-col",
                          {
                            ["border-blue-primary"]:
                              phone && phone.id === item.id,
                            ["border-gray-primary"]:
                              !phone || phone.id !== item.id,
                          }
                        )}
                      >
                        <span>{item.phone}</span>
                        <p>{addressToString(item.address)}</p>
                      </WrapperAnimation>
                    );
                  })}
              </div>
            </div>
            <div className="capitalize flex-1 flex flex-col gap-5">
              <ul className=" flex flex-col gap-3">
                {petAdopt && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <li className="flex items-center gap-3 justify-center">
                        <span className="font-medium">Id: </span>{" "}
                        <p>{petAdopt.id}</p>
                      </li>
                      <li className="flex items-center gap-3 justify-center">
                        <span className="font-medium">Name: </span>{" "}
                        <p>{petAdopt.name}</p>
                      </li>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <li className="flex items-center gap-3 justify-center">
                        <span className="font-medium">Size: </span>{" "}
                        <p>{petAdopt.size}</p>
                      </li>
                      <li className="flex items-center gap-3 justify-center">
                        <span className="font-medium">Type: </span>{" "}
                        <p>{petAdopt.type}</p>
                      </li>
                    </div>
                  </>
                )}
              </ul>
              <div className="flex items-center justify-center">
                <div className="w-full aspect-square md:w-[200px] overflow-hidden rounded">
                  <img
                    className="w-full h-full object-cover"
                    src={petAdopt?.image}
                    alt={petAdopt?.image}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end text-sm gap-5 mt-5">
            <WrapperAnimation
              onClick={() => {
                setOpen(false);
                dispatch(clearAsked());
              }}
              hover={{}}
              className="py-2 px-6 rounded-full hover:bg-[rgba(0,0,0,.2)] transition-all ease-linear cursor-pointer hover:text-white"
            >
              Cancel
            </WrapperAnimation>
            <WrapperAnimation
              onClick={handleContactToView}
              hover={{}}
              className="py-2 px-6 rounded-full transition-all ease-linear cursor-pointer text-blue-primary border-blue-primary border"
            >
              Ok
            </WrapperAnimation>
          </div>
        </div>
      </WrapperDialog>
    </BoxTitle>
  );
}
