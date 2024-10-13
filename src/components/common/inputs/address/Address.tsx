"use client";
import {
  getDevisionDistrictes,
  getDevisionProvinces,
  getDevisionWards,
} from "@/apis/outside";
import District from "@/components/common/inputs/address/District";
import Province from "@/components/common/inputs/address/Province";
import Wards from "@/components/common/inputs/address/Wards";
import TextField from "@/components/common/inputs/TextField";
import {
  IAddress,
  IDistrictOutside,
  IProvinceOutside,
  IWardOutside,
} from "@/configs/interface";
import Validate from "@/utils/validate";
import { useQuery } from "@tanstack/react-query";
import React, {
  ChangeEvent,
  FocusEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";

export interface Address {
  province: IProvinceOutside | undefined;
  district: IDistrictOutside | undefined;
  ward: IWardOutside | undefined;
}
export interface IAddressProps {
  onValidate?: (validateFuc: () => boolean) => void;
  onAddress?: (values: IAddress) => void;
  initData?: IAddress;
}
function Address({ initData, onValidate, onAddress }: IAddressProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["getProvinces"],
    queryFn: () => getDevisionProvinces(),
  });
  const validFucs = {
    province: () => false,
    districh: () => false,
    ward: () => false,
  };
  const [form, setForm] = useState<IAddress>(
    initData || {
      province: "",
      district: "",
      ward: "",
      address: "",
    }
  );
  const [address, setAddress] = useState<Address>({
    province: undefined,
    district: undefined,
    ward: undefined,
  });
  const [districhs, setDistrichs] = useState<
    IDistrictOutside[] | undefined | null
  >(undefined);
  const [wards, setWards] = useState<IWardOutside[] | undefined | null>(
    undefined
  );

  const [error, setError] = useState("");
  const validate = (initData: string | undefined) => {
    const { error, message } = Validate.address(initData || "");
    setError(message);

    return error;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    validate(e.target.value);
  };
  const handleProvince = useCallback(
    async (value: IProvinceOutside | undefined) => {
      setAddress({
        ...address,
        province: value,
        district: undefined,
        ward: undefined,
      });
      if (!value) {
        setDistrichs(null);
        setWards(null);
        return;
      }
      try {
        const response = await getDevisionDistrictes(value);
        setDistrichs(null);
        setWards(null);
        if (response) {
          setDistrichs(response.data);
          return;
        }

        setDistrichs(null);
        setWards(null);
      } catch (error) {
        console.log(error);
      }
    },
    [address]
  );
  const handleDistrict = useCallback(
    async (value: IDistrictOutside | undefined) => {
      setAddress({
        ...address,
        district: value as IDistrictOutside,
        ward: undefined,
      });

      if (!value) {
        setWards(null);
        return;
      }

      try {
        const response = await getDevisionWards(value);

        setWards(null);
        if (response) {
          setWards(response.data);
          return;
        }
        setWards(null);
      } catch (error) {
        console.log(error);
      }
    },
    [address]
  );

  useEffect(() => {
    if (!initData) return;
    setForm(initData);
  }, [initData]);

  useEffect(() => {
    setForm({
      ...form,
      province: address.province?.ProvinceName || "",
      district: address.district?.DistrictName || "",
      ward: address.ward?.WardName || "",
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const validateAll = () => {
    const validError: boolean[] = [];
    const value = validate(form.address);
    validError.push(value);
    Object.values(validFucs).forEach((fuc) => {
      const value = fuc();
      validError.push(value);
    });

    return validError.some((value) => value);
  };

  useEffect(() => {
    if (!onValidate) return;

    onValidate(validateAll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validateAll]);

  useEffect(() => {
    if (!onAddress) return;

    onAddress(form);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  return (
    <div className="flex flex-col justify-between gap-[26px] w-full">
      <div className="flex md:flex-row flex-col items-center justify-between gap-5">
        <Province
          onValidate={(validFuc) => {
            validFucs.province = validFuc;
          }}
          name="province"
          initData={initData && initData.province}
          data={data?.data}
          label="Province"
          onValue={handleProvince}
        />
        <District
          onValidate={(validFuc) => {
            validFucs.districh = validFuc;
          }}
          name="district"
          initData={initData && initData.district}
          messageUndefined="Please choose your province"
          data={districhs}
          label="District"
          onValue={handleDistrict}
        />
        <Wards
          onValidate={(validFuc) => {
            validFucs.ward = validFuc;
          }}
          name="ward"
          initData={initData && initData.ward}
          messageUndefined="Please choose your district"
          onValue={(value) => {
            setAddress({
              ...address,
              ward: value as IWardOutside,
            });
          }}
          data={wards}
          label="Ward"
        />
      </div>
      <TextField
        name="address"
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete="address"
        value={form.address}
        message={error}
        size="small"
        label={"Address"}
      />
    </div>
  );
}
export default memo(Address);
