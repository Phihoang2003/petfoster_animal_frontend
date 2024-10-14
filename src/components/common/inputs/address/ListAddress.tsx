"use client";
import { deleteAddress, getAddresses } from "@/apis/user";
import WrapperAnimation from "@/components/animations/WrapperAnimation";
import { AddressInfoPaymentContext } from "@/components/common/inputs/address/AddressInfoPayment";
import AddressItem from "@/components/common/inputs/address/AddressItem";
import Confirm from "@/components/common/inputs/Confirm";
import LoadingSecondary from "@/components/common/loadings/LoadingSecondary";
import { IInfoAddress } from "@/configs/interface";
import useGetDefaultAddress from "@/hooks/useGetDefaultAddress";
import { contants } from "@/utils/constant";
import { addressToString } from "@/utils/format";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import React, { MouseEvent, useContext, useState } from "react";
import { toast } from "react-toastify";

export interface IListAddressProps {
  handleAddForm?: () => void;
  onUpdateData?: (data?: IInfoAddress) => void;
  onClickData?: (data?: IInfoAddress) => void;
}
export default function ListAddress({
  handleAddForm,
  onUpdateData,
  onClickData,
}: IListAddressProps) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAddresses"],
    queryFn: () => getAddresses(),
  });
  const parentContext = useContext(AddressInfoPaymentContext);
  const defaultAddress = useGetDefaultAddress();
  const [openConfirm, setOpenConfirm] = useState({
    open: false,
    confirm: "cancel",
  });
  const [deleteData, setDeleteData] = useState<IInfoAddress | null>(null);
  const handleUpdate = (
    e?: MouseEvent<HTMLSpanElement>,
    data?: IInfoAddress
  ) => {
    if (!onUpdateData) return;
    onUpdateData(data);
  };
  const handleClickData = (
    e?: MouseEvent<HTMLSpanElement>,
    data?: IInfoAddress
  ) => {
    if (!onClickData) return;
    onClickData(data);
  };
  const handleDelete = async () => {
    try {
      if (!deleteData) return;
      const response = await deleteAddress(deleteData);
      if (!response.data) {
        toast.error(response.message);
        return;
      }

      refetch();
      if (deleteData.default) {
        defaultAddress.refetch();
      }
      requestIdleCallback(() => {
        if (
          parentContext.addressActive?.id === deleteData.id &&
          !deleteData.default
        ) {
          if (!parentContext.backToDefaultValue) return;
          parentContext.backToDefaultValue();
        }
      });
    } catch (error) {
      toast.error(contants.messages.errors.server);
    }
  };
  const handleOpenConfirm = (
    e?: MouseEvent<HTMLSpanElement>,
    data?: IInfoAddress
  ) => {
    setOpenConfirm({ ...openConfirm, open: true });
    setDeleteData(data || null);
  };

  const handleComfirm = async (v: {
    open: boolean;
    confirm: "cancel" | "ok";
  }) => {
    if (v.open || v.confirm === "cancel") return;

    handleDelete();
  };
  return (
    <>
      <AnimatePresence initial={true} custom={1}>
        {data && data?.data && (
          <motion.div
            key={"address-list"}
            {...contants.animations.addressForm}
            className="w-full h-full"
          >
            {data.data.length > 0 ? (
              data.data.map((address) => {
                return (
                  <AddressItem
                    handleDelete={handleOpenConfirm}
                    handleClick={handleClickData}
                    key={address.id}
                    handleEdit={handleUpdate}
                    data={address}
                  />
                );
              })
            ) : (
              <div className="flex items-center justify-center h-[133px] border-b border-gray-primary">
                <span>{"You don't have a delivery address yet"}</span>
              </div>
            )}

            {data.data.length < 4 && (
              <div
                onClick={handleAddForm}
                className="text-black py-6 w-full border-b border-gray-primary flex items-center justify-center cursor-pointer"
              >
                <WrapperAnimation
                  hover={{}}
                  className="px-4 flex items-center justify-center gap-1"
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <span>Add address</span>
                </WrapperAnimation>
              </div>
            )}
          </motion.div>
        )}

        <Confirm
          title={"Notification"}
          subtitle={
            <>
              {"Are want to delete "}{" "}
              {deleteData && !deleteData.isDefault ? (
                <b>{addressToString(deleteData?.address)}</b>
              ) : (
                <b>{"default address"}</b>
              )}
            </>
          }
          open={openConfirm.open}
          setOpen={setOpenConfirm}
          onConfirm={handleComfirm}
        />
      </AnimatePresence>
      {isLoading && <LoadingSecondary />}
    </>
  );
}
