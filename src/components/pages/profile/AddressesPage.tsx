"use client";
import { deleteAddress, getAddresses } from "@/apis/user";
import WrapperAnimation from "@/components/animations/WrapperAnimation";
import AddressForm from "@/components/common/inputs/address/AddressForm";
import AddressItem from "@/components/common/inputs/address/AddressItem";
import BaseAddressDialog from "@/components/common/inputs/address/BaseAddressDialog";
import Confirm from "@/components/common/inputs/Confirm";
import LoadingSecondary from "@/components/common/loadings/LoadingSecondary";
import BaseProfilePage from "@/components/pages/common/BaseProfilePage";
import { IInfoAddress } from "@/configs/interface";
import { contants } from "@/utils/constant";
import { addressToString } from "@/utils/format";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, MouseEvent, useState } from "react";
import { toast } from "react-toastify";

export const BaseProfilePageContext = createContext<{ refetch: () => any }>({
  refetch: () => {},
});
export default function AddressesPage() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAddresses"],
    queryFn: () => getAddresses(),
  });
  const [updateData, setUpdateData] = useState<{
    data: IInfoAddress | null;
    updateMode: boolean;
  }>({
    data: null,
    updateMode: false,
  });
  const [open, setOpen] = useState(false);
  const [deleteData, setDeleteData] = useState<IInfoAddress | null>(null);
  const [openConfirm, setOpenConfirm] = useState({
    open: false,
    confirm: "cancel",
  });

  const handleOpenConfirm = (
    e?: MouseEvent<HTMLSpanElement>,
    data?: IInfoAddress
  ) => {
    setOpenConfirm({ ...openConfirm, open: true });
    setDeleteData(data || null);
  };

  const handleConfirm = async (v: {
    open: boolean;
    confirm: "cancel" | "ok";
  }) => {
    if (v.open || v.confirm === "cancel") return;

    handleDelete();
  };

  const handleDelete = async () => {
    try {
      if (!deleteData) return;

      const response = await deleteAddress(deleteData);

      if (!response.data) {
        toast.error(response.message);
        return;
      }
      toast.success("Delete address successfully");
      refetch();
    } catch (error) {
      toast.error(contants.messages.errors.server);
    }
  };
  const handleUpdate = (e?: MouseEvent<HTMLElement>, data?: IInfoAddress) => {
    if (!data) return;
    setUpdateData({ data, updateMode: true });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    if (updateData.updateMode) {
      setUpdateData({
        data: null,
        updateMode: false,
      });
    }
  };

  return (
    <BaseProfilePageContext.Provider value={{ refetch }}>
      <BaseProfilePage
        title="ADDRESS LIST"
        action={
          <WrapperAnimation hover={{}}>
            {data && data.data.length < 4 && (
              <button
                onClick={() => {
                  setUpdateData({ data: null, updateMode: false });
                  setOpen(true);
                }}
                className="flex items-center justify-center py-2 px-4 bg-green-65a30d text-white font-medium text-1xl gap-1 hover:rounded transition-all ease-linear hover:bg-[#4b8614]"
              >
                <FontAwesomeIcon icon={faPlus} className="text-[18px]" />
                <span>Add address</span>
              </button>
            )}
          </WrapperAnimation>
        }
      >
        <div className="">
          {data && data?.data && (
            <div key={"address-list"} className="w-full h-full">
              {data.data.length > 0 ? (
                data.data.map((address) => {
                  return (
                    <AddressItem
                      handleEdit={handleUpdate}
                      handleDelete={handleOpenConfirm}
                      key={address.id}
                      data={address}
                    />
                  );
                })
              ) : (
                <div className="flex items-center justify-center h-[133px] border-b border-gray-primary">
                  <span>{"You don't have a delivery address yet"}</span>
                </div>
              )}
            </div>
          )}

          {isLoading && <LoadingSecondary />}
        </div>
      </BaseProfilePage>

      {/* dialog */}
      <BaseAddressDialog
        title={
          <>
            <div className="flex items-center ">
              <h2 className="font-semibold uppercase">{"SHIPPING INFO"}</h2>
            </div>
            <WrapperAnimation
              onClick={handleClose}
              hover={{}}
              className="flex items-center justify-center p-5 pr-0"
            >
              <FontAwesomeIcon className="cursor-pointer" icon={faXmark} />
            </WrapperAnimation>
          </>
        }
        open={open}
        setOpen={setOpen}
      >
        {open && (
          <AddressForm
            showNotiAdopt={true}
            initData={updateData.data || undefined}
            updateMode={updateData.updateMode}
            onBeforeAdd={() => {
              requestIdleCallback(() => {
                refetch();
                handleClose();
              });
            }}
            onBeforeUpdate={() => {
              requestIdleCallback(() => {
                refetch();
                handleClose();
              });
            }}
          />
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
          onConfirm={handleConfirm}
        />
      </BaseAddressDialog>
    </BaseProfilePageContext.Provider>
  );
}
