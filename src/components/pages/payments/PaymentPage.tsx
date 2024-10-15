"use client";
import ContainerContent from "@/components/common/common-components/ContainerContent";
import AddressInfoPayment from "@/components/common/inputs/address/AddressInfoPayment";
import LineProgress from "@/components/pages/payments/LineProgress";
import { links } from "@/data/links";
import { Breadcrumbs, Grid, Grid2, Stack } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { contants } from "@/utils/constant";
import { IInfoAddress, IOrder } from "@/configs/interface";
import PaymentItem from "@/components/pages/payments/PaymentItem";
import PaymentCard from "@/components/pages/payments/PaymentCard";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { AddressCodeType, RootState } from "@/configs/types";
import {
  getShippingFee,
  searchDistrichts,
  searchProvinces,
  searchWards,
} from "@/apis/outside";

const { dataCard } = contants;

const dataPayments = ["Cash", "Pre-Payment"];

const initData: IOrder = {
  methodId: 1,
  addressId: 0,
  deliveryId: dataCard[0].id,
  ship: dataCard[0].price,
  orderItems: [],
};
export default function PaymentPage() {
  const dispatch = useAppDispatch();
  const { payment } = useAppSelector((state: RootState) => state.cartReducer);
  const [line, setLine] = useState(2);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [checked, setChecked] = useState(0);
  const [addresses, setAddresses] = useState<IInfoAddress | null>(null);
  const [shippingItem, setShippingItem] = useState(dataCard[1]);
  const [loadingShippingItem, setloadingShippingItem] = useState(false);
  const [form, setForm] = useState<IOrder>(initData);
  const handleOpenConfirm = () => {};

  const handleDelivery = (
    item: { id: number; title: string; business: string; price: number },
    index: number
  ) => {
    setChecked(index);
    setForm({
      ...form,
      ship: item.price,
      deliveryId: item.id,
    });
  };

  const handleShowShipping = async () => {
    if (!addresses || payment.length <= 0) {
      console.log("Chua co don hang");
      return;
    }
    const addressCodes: AddressCodeType = {
      province: null,
      district: null,
      ward: null,
    };
    try {
      setloadingShippingItem(true);
      const province = await searchProvinces(addresses.address.province);
      if (!province) return;
      addressCodes.province = province.ProvinceID;
      const district = await searchDistrichts(
        province,
        addresses.address.district
      );

      if (!district) return;

      // set district code
      addressCodes.district = district.DistrictID;

      const ward = await searchWards(district, addresses.address.ward);

      if (!ward) return;

      // set district code
      addressCodes.ward = ward.WardCode;

      if (payment.length < 0 || totalAndWeight.weight < 0) return;

      const shippingFee: number = await getShippingFee(
        addressCodes,
        totalAndWeight
      );

      setShippingItem({
        ...shippingItem,
        price: shippingFee,
      });
      setloadingShippingItem(false);
      if (checked <= 0) return;
      setForm({
        ...form,
        ship: shippingFee,
        addressId: addresses.id,
        deliveryId: contants.instantProvince.includes(
          addresses.address.province
        )
          ? dataCard[0].id
          : shippingItem.id,
      });
    } catch (error) {
      setloadingShippingItem(false);
      console.log("error in handleShowShipping", error);
    }
  };

  const totalAndWeight = useMemo(() => {
    if (payment.length <= 0) return { value: 0, weight: 0, quantity: 0 };

    const value = payment.reduce((total, item) => {
      return (total += item.price * item.quantity);
    }, 0);
    const weight = payment.reduce((total, item) => {
      return (total += (item.size as number) * item.quantity);
    }, 0);
    const quantity = payment.reduce((result, item) => {
      return (result += item.quantity);
    }, 0);
    return { value, weight, quantity };
  }, [payment]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    (async () => {
      if (!addresses) {
        // set line
        setLine(2);
        return;
      }

      // set line
      setLine(4);

      if (!contants.instantProvince.includes(addresses.address.province)) {
        setChecked(1);
        setForm({
          ...form,
          addressId: addresses.id,
          deliveryId: shippingItem.id,
        });
      } else {
        setChecked(0);
        setForm({
          ...form,
          addressId: addresses.id,
          deliveryId: dataCard[0].id,
        });
      }

      await handleShowShipping();
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses]);

  return (
    <ContainerContent className="pt-12 select-none">
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Link className="hover:underline" href="/">
            Home
          </Link>
          <Link className="hover:underline" href={links.users.cart}>
            Cart
          </Link>
          <Link
            className="text-black-main hover:underline "
            href={links.users.payment}
          >
            Payment
          </Link>
        </Breadcrumbs>
      </div>
      <LineProgress progressNun={line} />

      {/* AddressInfo */}
      <Grid2
        container
        spacing={"48px"}
        mt={"34px"}
        component={"form"}
        onSubmit={handleOpenConfirm}
      >
        <Grid2 size={{ sm: 12, md: 12, lg: 6 }}>
          {isClient && (
            <Stack spacing={"40px"}>
              <AddressInfoPayment
                onData={(data) => {
                  if (!data) {
                    setAddresses(null);
                    return;
                  }
                  setAddresses(data);

                  if (form.addressId === 0) {
                    setForm({
                      ...form,
                      addressId: data.id,
                      deliveryId: contants.instantProvince.includes(
                        data.address.province
                      )
                        ? dataCard[0].id
                        : shippingItem.id,
                    });
                  }
                }}
              />

              <PaymentItem title="Delivery method">
                <div className="flex flex-col md:flex-row items-center justify-between gap-5 mt-6">
                  <PaymentCard
                    disabled={
                      addresses
                        ? !contants.instantProvince.includes(
                            addresses.address.province
                          )
                        : true
                    }
                    onClick={() => handleDelivery(dataCard[0], 0)}
                    data={dataCard[0]}
                    checked={checked === 0}
                  />
                  <PaymentCard
                    disabled={!addresses}
                    loading={loadingShippingItem}
                    onClick={() => handleDelivery(shippingItem, 1)}
                    data={shippingItem}
                    checked={checked === 1}
                  />
                </div>
              </PaymentItem>
            </Stack>
          )}
        </Grid2>

        <Grid2 size={{ sm: 12, md: 12, lg: 6 }}>
          <div>Right side</div>
        </Grid2>
      </Grid2>
    </ContainerContent>
  );
}
