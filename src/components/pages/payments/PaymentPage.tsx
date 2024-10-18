"use client";
import ContainerContent from "@/components/common/common-components/ContainerContent";
import AddressInfoPayment from "@/components/common/inputs/address/AddressInfoPayment";
import LineProgress from "@/components/pages/payments/LineProgress";
import { links } from "@/data/links";
import {
  Breadcrumbs,
  FormControlLabel,
  Grid,
  Grid2,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import Link from "next/link";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { contants } from "@/utils/constant";
import {
  IInfoAddress,
  IOrder,
  IOrderItem,
  IPayment,
} from "@/configs/interface";
import PaymentItem from "@/components/pages/payments/PaymentItem";
import PaymentCard from "@/components/pages/payments/PaymentCard";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { AddressCodeType, PaymentMethod, RootState } from "@/configs/types";
import {
  getShippingFee,
  searchDistrichts,
  searchProvinces,
  searchWards,
} from "@/apis/outside";
import SocialButton from "@/components/buttons/SocialButton";
import OrderSummary from "@/components/pages/payments/OrderSummary";
import LoadingSecondary from "@/components/common/loadings/LoadingSecondary";
import LoadingPrimary from "@/components/common/loadings/LoadingPrimary";
import firebaseService from "@/services/firebaseService";
import ConfirmPaymentDialog from "@/components/dialogs/ConfirmPaymentDialog";
import { useRouter, useSearchParams } from "next/navigation";
import { createPayment, updateUserStatusOrder } from "@/apis/user";
import { toast } from "react-toastify";
import { capitalize } from "@/utils/format";
import { clearAllPayment } from "@/redux/slice/cartsSlice";

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
  const { user } = useAppSelector((state: RootState) => state.userReducer);
  const { payment } = useAppSelector((state: RootState) => state.cartReducer);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [line, setLine] = useState(2);
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [checked, setChecked] = useState(0);
  const [addresses, setAddresses] = useState<IInfoAddress | null>(null);
  const [shippingItem, setShippingItem] = useState(dataCard[1]);
  const [loadingShippingItem, setloadingShippingItem] = useState(false);
  const [form, setForm] = useState<IOrder>(initData);
  const [openConfirm, setOpenConfirm] = useState(false);
  const handleOpenConfirm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpenConfirm(true);
  };

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

  const handleChangePaymentMethod = (e: ChangeEvent<HTMLInputElement>) => {
    const method = e.target.value.toLowerCase() as PaymentMethod;

    // set payment method
    setForm({
      ...form,
      methodId: method === "cash" ? 1 : 2,
    });
  };

  const conditonShowBtn = useMemo(() => {
    if (!payment) return true;

    if (payment.length <= 0 || addresses == null) {
      return true;
    }

    return false;
  }, [addresses, payment]);

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

  useEffect(() => {
    if (!addresses) return;
    setForm({
      ...form,
      addressId: addresses.id,
      deliveryId: checked <= 0 ? dataCard[0].id : shippingItem.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!payment) return;
    const orderItems = payment.map((item) => {
      return {
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
      } as IOrderItem;
    });

    setForm({
      ...form,
      orderItems,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payment]);

  const handleClearWhenSuccess = async (photourl: string, orderId?: number) => {
    dispatch(clearAllPayment());
    toast.success(contants.messages.success.payment);
    router.push(links.products);

    if (!user) return;

    await firebaseService.addSuccessfulPurchaseNotification({
      photourl,
      username: user.username,
      displayName: user.displayName,
      orderId,
    });
  };

  useEffect(() => {
    (async () => {
      const status = searchParams.get("vnp_TransactionStatus");
      const responseCode = searchParams.get("vnp_ResponseCode");

      const validateArr = [
        parseInt(searchParams.get("order_Id") || "0"),
        parseInt(searchParams.get("vnp_Amount") || "0"),
        parseInt(searchParams.get("vnp_TransactionNo") || "0"),
      ];

      const valid = validateArr.some((item) => item <= 0);

      setLoading(true);

      if (responseCode === "24") {
        try {
          const response = await updateUserStatusOrder({
            id: parseInt(searchParams.get("order_Id") || "0"),
            status: "cancelled_by_customer",
            reason: "Payment failed",
          });

          if (!response) {
            toast.warn(contants.messages.errors.handle);
            return;
          }

          if (response.errors) {
            toast.warn(capitalize(response.message));
            return;
          }

          toast.warn(`Payment failed`);
          router.push(links.home);
        } catch (error) {
          toast.error(contants.messages.errors.server);
        } finally {
          setLoading(false);
        }

        return;
      }

      if (valid) {
        setLoading(false);
        return;
      }

      const form: IPayment = {
        orderId: parseInt(searchParams.get("order_Id") || "0"),
        amount: parseInt(searchParams.get("vnp_Amount") || "0"),
        isPaid: status === "00" || false,
        payAt: searchParams.get("vnp_PayDate") || "",
        transactionNumber: parseInt(
          searchParams.get("vnp_TransactionNo") || "0"
        ),
        paymentMethod: {
          id: 2,
          method: searchParams.get("vnp_CardType") || "ATM",
        },
      };

      const response = await createPayment(form);

      try {
        if (!response) {
          toast.error(contants.messages.errors.handle);
          return;
        }

        // if (response.status !== 200) {
        //   toast.error(response.message);
        //   return;
        // }

        handleClearWhenSuccess(response.data.photourl, form.orderId);
      } catch (error) {
        toast.error(contants.messages.errors.server);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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
              {/* payment method */}
              <PaymentItem title="Payment">
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  defaultValue={dataPayments[0]}
                  name="row-radio-buttons-group"
                >
                  {dataPayments.map((item) => {
                    return (
                      <FormControlLabel
                        key={item}
                        value={item}
                        control={
                          <Radio
                            onChange={handleChangePaymentMethod}
                            sx={{
                              color: "#505DE8",
                              accentColor: "#505DE8",
                            }}
                          />
                        }
                        label={item}
                      />
                    );
                  })}
                </RadioGroup>
              </PaymentItem>
              <div className="w-full ">
                <SocialButton
                  disabled={conditonShowBtn}
                  type="submit"
                  maxWidth="max-w-full"
                  background="#505DE8"
                  title="Confirm order"
                />
              </div>
            </Stack>
          )}
        </Grid2>

        <Grid2 size={{ sm: 12, md: 12, lg: 6 }}>
          <OrderSummary
            dataDelivery={checked <= 0 ? dataCard[checked] : shippingItem}
          />
        </Grid2>
        {!isClient && (
          <Grid2 size={{ sm: 12, md: 12, lg: 12 }}>
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              height={"100%"}
            >
              <LoadingSecondary />
            </Stack>
          </Grid2>
        )}
        {loading && <LoadingPrimary />}

        {/* confirm dialog */}
        <ConfirmPaymentDialog
          setLoading={setLoading}
          addresses={addresses}
          totalAndWeight={totalAndWeight}
          paymentData={payment}
          form={{
            ...form,
            ship: checked <= 0 ? dataCard[checked].price : shippingItem.price,
          }}
          setOpen={setOpenConfirm}
          open={openConfirm}
        />
      </Grid2>
    </ContainerContent>
  );
}
