"use client";
import { detailOtherHistory, updateUserStatusOrder } from "@/apis/user";
import ReasonDialog from "@/components/dialogs/ReasonDialog";
import BaseBreadCrumbs from "@/components/pages/common/BaseBreadCrumbs";
import DetailOrderhistoryItem from "@/components/pages/order-histories/DetailOrderHistoryItem";
import { IDetailOrder } from "@/configs/interface";
import { RootState, StateType } from "@/configs/types";
import { links } from "@/data/links";
import { useAppSelector } from "@/hooks/reduxHooks";
import firebaseService from "@/services/firebaseService";
import { contants } from "@/utils/constant";
import { capitalize, getIconWithStatus, toCurrency } from "@/utils/format";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid2, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DetailOrderHistoryContext = createContext<{
  data: IDetailOrder | undefined;
  refetch: () => void;
}>({ data: undefined, refetch: () => {} });

export interface IDetailOrderHistoryProps {
  id: string | number;
}
export default function DetailOrderHistoryPage({
  id,
}: IDetailOrderHistoryProps) {
  const { user } = useAppSelector((state: RootState) => state.userReducer);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["histories/detail", id],
    queryFn: () => detailOtherHistory(id),
  });

  const [open, setOpen] = useState(false);

  if (error) {
    notFound();
  }

  const dataDetail = data?.data;

  const status = dataDetail && (dataDetail.state.toLowerCase() as StateType);

  const handleOpenReason = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateStatus = async (reason: string) => {
    if (!dataDetail || status !== "placed") return;

    try {
      const response = await updateUserStatusOrder({
        id: dataDetail.id,
        status: "cancelled_by_customer",
        reason,
      });

      if (!response) {
        toast.warn(contants.messages.errors.handle);
        return;
      }

      if (response.errors) {
        toast.warn(capitalize(response.message));
        return;
      }

      toast.success(
        `Thank you for your interest in the product. We will improve product and service quality.`
      );
      refetch();

      await firebaseService.publistStateCancelByCustomerOrderNotification({
        ...dataDetail,
        username: user?.username || "",
        orderId: id + "",
        reason,
      });
    } catch (error) {
      toast.error(contants.messages.errors.server);
    }
  };

  return (
    <DetailOrderHistoryContext.Provider value={{ data: dataDetail, refetch }}>
      <BaseBreadCrumbs
        isLoading={isLoading}
        title="ORDER DETAIL"
        breadcrumb={[
          {
            title: "Order Details",
            href: links.history.orderHistory,
          },
        ]}
        footer={
          <div className="w-full flex text-violet-primary justify-center mt-12">
            <Link
              href={"/other-history"}
              className="hover:underline flex items-center gap-4 font-medium"
            >
              <span>Back to my order</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        }
        actions={
          status === "placed" && (
            <span
              onClick={handleOpenReason}
              className="text-red-primary hover:underline cursor-pointer"
            >
              Cancel
            </span>
          )
        }
      >
        {dataDetail && (
          <div className="rounded-lg border-2 border-[#DBDBDB] flex flex-col overflow-hidden">
            <Grid2
              key={1}
              container
              spacing={2}
              sx={{
                px: "44px",
                py: "30px",
              }}
              bgcolor={"#F2F2F2"}
            >
              <Grid2 size={{ lg: 4 }}>
                <Stack component={"ul"} spacing={"24px"}>
                  <li className="text-lg text-black-main font-medium">
                    Order ID:
                    <span className="text-grey-secondary text-1xl font-normal">
                      {" "}
                      #{dataDetail.id}
                    </span>
                  </li>
                  <li className="text-lg text-black-main font-medium">
                    Date Placed:
                    <span className="text-grey-secondary text-1xl font-normal">
                      {" "}
                      {dataDetail.placedDate}{" "}
                    </span>
                  </li>
                  {dataDetail.expectedTime && (
                    <li className="text-lg text-black-main font-medium">
                      Expected Time:
                      <span className="text-grey-secondary text-1xl font-normal">
                        {" "}
                        {moment(dataDetail.expectedTime).format(
                          "D/MM/yyyy"
                        )}{" "}
                      </span>
                    </li>
                  )}
                  <li className="flex items-center gap-2">
                    {(() => {
                      const status =
                        dataDetail.state.toLowerCase() as StateType;
                      const { icon, color } = getIconWithStatus(status);

                      return (
                        <>
                          <FontAwesomeIcon color={color} icon={icon} />
                          <span>{capitalize(status)}</span>
                        </>
                      );
                    })()}
                  </li>
                </Stack>
              </Grid2>

              {/* center */}
              <Grid2 size={{ lg: 6 }}>
                <Stack component={"ul"} spacing={"8px"}>
                  <li className="text-lg text-black-main font-medium mb-3">
                    Shipping Info
                  </li>
                  <li className="text-black-main flex flex-col gap-1">
                    <span>{dataDetail.name}</span>
                    <span>{dataDetail.phone}</span>
                  </li>
                  <li className="text-black-main">{dataDetail.address}</li>
                </Stack>
              </Grid2>
              {/* right */}
              <Grid2 size={{ lg: 2 }}>
                <Stack component={"ul"} spacing={"8px"}>
                  <li className="text-lg text-black-main font-medium mb-3">
                    Payment Method
                  </li>
                  <li className="text-black-main flex flex-col gap-1">
                    {dataDetail.paymentMethod}
                  </li>
                </Stack>
                <Stack component={"ul"} spacing={"8px"} mt={"15px"}>
                  <li className="text-lg text-black-main font-medium mb-3">
                    Delivery Method
                  </li>
                  <li className="text-black-main flex flex-col gap-1">
                    {dataDetail.deliveryMethod}
                  </li>
                </Stack>
              </Grid2>
            </Grid2>
            {/* render detail product */}
            <div className="flex-1 pb-8">
              <Grid2
                container
                key={2}
                spacing={1}
                py={"18px"}
                sx={{
                  borderBottom: "1px solid #DBDBDB",
                  display: { xs: "none", md: "none", lg: "flex" },
                }}
              >
                <Grid2 size={{ lg: 6 }}>
                  <div className="flex items-center justify-center">
                    <span className="text-center text-[#303B4E]">Product</span>
                  </div>
                </Grid2>
                <Grid2 size={{ lg: 2 }}>
                  <div className="flex items-center justify-center">
                    <span className="text-center text-[#303B4E]">Price</span>
                  </div>
                </Grid2>
                <Grid2 size={{ lg: 2 }}>
                  <div className="flex items-center justify-center">
                    <span className="text-center text-[#303B4E]">Quantity</span>
                  </div>
                </Grid2>
                <Grid2 size={{ lg: 2 }}>
                  <div className="flex items-center justify-center">
                    <span className="text-center text-[#303B4E]">Total</span>
                  </div>
                </Grid2>
              </Grid2>

              <div className="px-4">
                {dataDetail.products.map((item) => {
                  return (
                    <DetailOrderhistoryItem
                      key={`${item.productId} ${item.size}`}
                      data={{
                        ...item,
                        status: dataDetail.state.toLowerCase() as StateType,
                      }}
                    />
                  );
                })}
              </div>

              <Grid2
                container
                key={3}
                spacing={1}
                py={"18px"}
                px={"16px"}
                mt={"32px"}
              >
                <Grid2 size={{ lg: 6 }}></Grid2>
                <Grid2
                  size={{ lg: 2 }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="flex flex-col items-start justify-center gap-5">
                    <span className="text-center font-medium text-[#303B4E]">
                      Subtotal:{" "}
                    </span>
                    <span className="text-center font-medium text-[#303B4E]">
                      Shipping fee:{" "}
                    </span>
                    <span className="text-center font-medium text-[#303B4E]">
                      Total:{" "}
                    </span>
                  </div>
                </Grid2>
                <Grid2 size={{ lg: 2 }}></Grid2>
                <Grid2
                  size={{ lg: 2 }}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div className="flex flex-col items-end justify-center gap-5">
                    <span className="text-center text-grey-secondary">
                      {toCurrency(dataDetail.subTotal)}
                    </span>
                    <span className="text-center text-grey-secondary">
                      {toCurrency(dataDetail.shippingFee)}
                    </span>
                    <span className="text-center text-grey-secondary">
                      {toCurrency(dataDetail.total)}
                    </span>
                  </div>
                </Grid2>
              </Grid2>
            </div>
          </div>
        )}

        {open && (
          <ReasonDialog
            onClose={handleClose}
            handleAfterClickSend={async (reason) => {
              // do somthing

              await handleUpdateStatus(reason);

              requestIdleCallback(() => {
                handleClose();
              });
            }}
          />
        )}
      </BaseBreadCrumbs>
    </DetailOrderHistoryContext.Provider>
  );
}
