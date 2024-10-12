"use client";
import SocialButton from "@/components/buttons/SocialButton";
import Address from "@/components/common/inputs/address/Address";
import Confirm from "@/components/common/inputs/Confirm";
import TextField from "@/components/common/inputs/TextField";
import PaymentItem from "@/components/pages/payments/PaymentItem";
import { IAddress, IInfoAddress } from "@/configs/interface";
import { contants } from "@/utils/constant";
import { FormControlLabel, Radio, Stack } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {};
  const handleConfirm = () => {};

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
