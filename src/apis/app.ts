import {
  ApiFilterPage,
  ApiTakeActionType,
  ApiTypesAndBrands,
} from "@/configs/types";
import axios from "../configs/axios";
import { IDataRequestFilter } from "@/configs/interface";
export const takeAction: ApiTakeActionType = async () => {
  const res = await axios({
    method: "GET",
    url: "take-action",
  });

  if (!res) return null;

  return res?.data;
};

export const typesAndBrands: ApiTypesAndBrands = async () => {
  const res = await axios({
    method: "GET",
    url: "product/types-brands",
  });

  if (!res) return null;

  return res?.data;
};

export const filterPage: ApiFilterPage = async (data: IDataRequestFilter) => {
  const res = await axios({
    method: "GET",
    url: "filter-product",
    params: data,
  });

  if (!res) return null;

  return res?.data;
};
