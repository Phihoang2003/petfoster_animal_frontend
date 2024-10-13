import {
  ApiDevisionDistrictOutside,
  ApiDevisionProvincesOutside,
  ApiDevisionWardOutside,
} from "@/configs/types";
import axios from "../configs/axios";
import { contants } from "@/utils/constant";
import { IDistrictOutside, IProvinceOutside } from "@/configs/interface";
export const getDevisionProvinces: ApiDevisionProvincesOutside = async () => {
  const res = await axios({
    method: "GET",
    url: "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
    headers: {
      "Content-Type": "application/json",
      token: contants.apis.ghn.token,
    },
  });

  if (!res) return null;

  return res?.data;
};
export const getDevisionDistrictes: ApiDevisionDistrictOutside = async (
  data: IProvinceOutside
) => {
  const res = await axios({
    method: "GET",
    url: "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",
    headers: {
      "Content-Type": "application/json",
      token: contants.apis.ghn.token,
    },
    params: {
      province_id: data.ProvinceID,
    },
  });

  if (!res) return null;

  return res?.data;
};

export const getDevisionWards: ApiDevisionWardOutside = async (
  data: IDistrictOutside
) => {
  const res = await axios({
    method: "GET",
    url: "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward",
    headers: {
      "Content-Type": "application/json",
      token: contants.apis.ghn.token,
    },
    params: {
      district_id: data.DistrictID,
    },
  });

  if (!res) return null;

  return res?.data;
};
