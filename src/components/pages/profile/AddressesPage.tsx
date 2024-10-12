"use client";
import WrapperAnimation from "@/components/animations/WrapperAnimation";
import AddressForm from "@/components/common/inputs/address/AddressForm";
import AddressItem from "@/components/common/inputs/address/AddressItem";
import BaseAddressDialog from "@/components/common/inputs/address/BaseAddressDialog";
import LoadingSecondary from "@/components/common/loadings/LoadingSecondary";
import BaseProfilePage from "@/components/pages/common/BaseProfilePage";
import { IInfoAddress } from "@/configs/interface";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useState } from "react";

export const BaseProfilePageContext = createContext<{ refetch: () => any }>({
  refetch: () => {},
});
export default function AddressesPage() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const data: { data: IInfoAddress[] } = { data: [] };
  const [updateData, setUpdateData] = useState<{
    data: IInfoAddress | null;
    updateMode: boolean;
  }>({
    data: null,
    updateMode: false,
  });
  const handleOpenConfirm = () => {};
  const handleUpdate = () => {};
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <BaseProfilePageContext.Provider value={{ refetch: () => {} }}>
      <BaseProfilePage
        title="ADDRESS LIST"
        action={
          <WrapperAnimation hover={{}}>
            {data && data.data.length < 4 && (
              <button
                onClick={() => setOpen(true)}
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
                // refetch();
                handleClose();
              });
            }}
            onBeforeUpdate={() => {
              requestIdleCallback(() => {
                // refetch();
                handleClose();
              });
            }}
          />
        )}

        {/* <Comfirm
                    title={'Notification'}
                    subtitle={
                        <>
                            {'Are want to delete '} {deleteData && !deleteData.isDefault ? <b>{addressToString(deleteData?.address)}</b> : <b>{'default address'}</b>}
                        </>
                    }
                    open={openComfirm.open}
                    setOpen={setOpenComfirm}
                    onComfirm={handleComfirm}
                /> */}
      </BaseAddressDialog>
    </BaseProfilePageContext.Provider>
  );
}
