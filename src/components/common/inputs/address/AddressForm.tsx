"use client";
import { addAddress, updateAddress } from "@/apis/user";
import SocialButton from "@/components/buttons/SocialButton";
import Address from "@/components/common/inputs/address/Address";
import Confirm from "@/components/common/inputs/Confirm";
import TextField from "@/components/common/inputs/TextField";
import PaymentItem from "@/components/pages/payments/PaymentItem";
import { IAddress, IInfoAddress } from "@/configs/interface";
import { links } from "@/data/links";
import useGetDefaultAddress from "@/hooks/useGetDefaultAddress";
import { contants } from "@/utils/constant";
import Validate from "@/utils/validate";
import { FormControlLabel, Radio, Stack } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { MouseEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
export interface IAddressFormProps {
  initData?: IInfoAddress;
  updateMode?: boolean;
  onBeforeAdd?: () => void;
  onBeforeUpdate?: () => void;
  showNotiAdopt?: boolean;
}
export default function AddressForm({
  initData,
  updateMode = false,
  showNotiAdopt = false,
  onBeforeAdd,
  onBeforeUpdate,
}: IAddressFormProps) {
  const defaultAddress = useGetDefaultAddress();
  const petAdopt = { name: "" };
  const asked = "";
  const [form, setForm] = useState<IInfoAddress>({
    id: 0,
    name: "",
    phone: "",
    address: {
      province: "",
      district: "",
      ward: "",
      address: "",
    },
  });
  const [addresses, setAddresses] = useState<IAddress>({
    province: "",
    district: "",
    ward: "",
    address: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });
  const [isCheck, setIsCheck] = useState(false);
  let adddresValid: () => boolean;
  const [openConfirm, setOpenConfirm] = useState({
    open: false,
    confirm: "cancel",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setForm({
      ...form,
      address: {
        ...addresses,
      },
    });
    if (validate()) return;

    if (updateMode) {
      handleOpenConfirm();
    } else {
      await handleAdd({
        ...form,
        address: addresses,
      });
    }

    if (isCheck || updateMode) {
      defaultAddress.refetch();
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { error, message } = Validate.address(e.target.value);

    setErrors({
      ...errors,
      [e.target.name]: message,
    });
  };
  const handleOpenConfirm = (
    e?: MouseEvent<HTMLSpanElement>,
    data?: IInfoAddress
  ) => {
    setOpenConfirm({
      ...openConfirm,
      open: true,
    });
  };
  const handleConfirm = async (v: {
    open: boolean;
    confirm: "cancel" | "ok";
  }) => {
    if (v.open || v.confirm === "cancel") return;
    await handleUpdate({
      ...form,
      address: addresses,
    });
  };

  const handleUpdate = async (data: IInfoAddress) => {
    try {
      const response = await updateAddress({ ...data, isDefault: isCheck });
      if (!response.data) {
        toast.error(response.message);
        return;
      }
      if (!onBeforeUpdate) {
        requestIdleCallback(() => {
          // if (parentContext.addressActive?.id === data.id && !data.isDefault) {
          //     parentContext.setDefaultValue(response.data);
          // }
        });
        // context.back();
      } else {
        onBeforeUpdate();
      }

      if (showNotiAdopt) {
        handleShowGoToAdoptPet();
      }
    } catch (error) {
      toast.error(contants.messages.errors.server);
    }
  };

  const validate = () => {
    const validErrors = { name: "", phone: "" };
    const results: boolean[] = [];
    const fullName = Validate.fullName(form.name);
    validErrors.name = fullName.message;
    results.push(fullName.error);
    const phone = Validate.phone(form.phone);
    validErrors.phone = phone.message;
    results.push(phone.error);
    results.push(adddresValid());
    setErrors({ ...validErrors });
    return results.some((item) => item);
  };

  const handleAdd = async (data: IInfoAddress) => {
    try {
      const response = await addAddress({ ...data, isDefault: isCheck });

      if (!response.data) {
        toast.error(response.message);
        return;
      }

      if (!onBeforeAdd) {
        // context.back();
      } else {
        onBeforeAdd();
      }

      // show noti
      if (showNotiAdopt) {
        handleShowGoToAdoptPet();
      }
    } catch (error) {
      toast.error(contants.messages.errors.server);
    }
  };

  const handleShowGoToAdoptPet = () => {
    if (!petAdopt || !asked) return;

    toast.success(
      <div className="flex items-center gap-2 text-black-main">
        <span>
          <b>{petAdopt.name}</b> is waiting for you.
          <Link
            className="hover:underline text-blue-primary"
            href={links.pets.ask}
          >
            Click to continue to register
          </Link>
        </span>
      </div>
    );
  };

  useEffect(() => {
    if (!initData || !updateMode) return;

    setForm({ ...initData });
    setIsCheck(!!initData.default);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initData]);

  return (
    <AnimatePresence initial={true} custom={1}>
      <motion.form
        onSubmit={handleSubmit}
        key={"address-form"}
        {...contants.animations.addressForm}
        className="w-full pt-5 flex flex-col gap-7"
      >
        <PaymentItem title="Information" size="text-lg" mt="mt-[14px]">
          <Stack spacing={"26px"}>
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              message={errors.name}
              value={form.name}
              name="name"
              size="small"
              label={"Fullname"}
            />
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              message={errors.phone}
              name="phone"
              value={form.phone}
              size="small"
              label={"Phone"}
            />
          </Stack>
        </PaymentItem>
        <PaymentItem title="Address" size="text-lg" mt="mt-[14px]">
          <Address
            initData={initData && initData?.address}
            onAddress={(values) => {
              setAddresses({
                ...(values as IAddress),
              });
            }}
            onValidate={(validate) => {
              adddresValid = validate;
            }}
          />
        </PaymentItem>
        <PaymentItem title="Setting" size="text-lg" mt="mt-[0px]">
          <FormControlLabel
            value={isCheck}
            control={
              <Radio checked={isCheck} onClick={(e) => setIsCheck(!isCheck)} />
            }
            label="Set to default"
          />
        </PaymentItem>

        <div className="w-full  flex items-center justify-center pb-4">
          <div className="w-[80%]">
            <SocialButton
              type="submit"
              maxWidth="max-w-full"
              background="#505DE8"
              title="Save"
            />
          </div>
        </div>
      </motion.form>

      <Confirm
        title={"Notification"}
        subtitle={"Are want to update ?"}
        open={openConfirm.open}
        setOpen={setOpenConfirm}
        onConfirm={handleConfirm}
      />
    </AnimatePresence>
  );
}
