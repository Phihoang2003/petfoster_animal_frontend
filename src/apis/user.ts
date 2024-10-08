import {
  ApiActionSearchHistories,
  ApiCreateCartUser,
  ApiGetCartUser,
  ApiGetCurUser,
  ApiGetCurUserWithUsername,
  ApiGetSearchHistories,
  ApiLogin,
  ApiRefreshVerifyCode,
  ApiRegister,
  ApiVerifyCode,
} from "@/configs/types";
import axios from "../configs/axios";
import { setTokenToCookie } from "@/utils/cookies";
import { ICart, ISearchItem } from "@/configs/interface";
export const register: ApiRegister = async (data) => {
  const res = await axios({
    method: "POST",
    url: "register",
    data,
  });

  if (!res) return null;

  return res?.data;
};

export const refreshVerifyCode: ApiRefreshVerifyCode = async (code: string) => {
  const res = await axios({
    method: "GET",
    url: "refresh-code",
    params: {
      code,
    },
  });

  if (!res) return null;

  return res?.data;
};

export const verifyCode: ApiVerifyCode = async (code: string) => {
  const res = await axios({
    method: "GET",
    url: "/verify",
    params: {
      code,
    },
  });

  if (!res) return null;

  return res?.data;
};
export const login: ApiLogin = async (data) => {
  const res = await axios({
    method: "POST",
    url: "login",
    data,
  });
  if (!res) return null;
  setTokenToCookie(res?.data?.token);
  return res?.data;
};
export const curUser: ApiGetCurUser = async () => {
  const res = await axios({
    method: "GET",
    url: "user/profile",
  });

  if (!res) return null;

  return res?.data;
};
export const getSearchHistories: ApiGetSearchHistories = async () => {
  const res = await axios({
    method: "GET",
    url: "user/search-histories",
  });

  if (!res) return null;

  return res?.data;
};
export const addSearchHistories: ApiActionSearchHistories = async (
  data: ISearchItem
) => {
  const form = new FormData();

  form.append("keyword", data.title);
  const res = await axios({
    method: "PUT",
    url: "user/search-histories",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: form,
  });

  if (!res) return null;

  return res?.data;
};
export const deleteSearchHistories: ApiActionSearchHistories = async (
  data: ISearchItem
) => {
  const form = new FormData();

  form.append("keyword", data.title);
  const res = await axios({
    method: "DELETE",
    url: "user/search-histories",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: form,
  });

  if (!res) return null;

  return res?.data;
};

export const getUserWithUsername: ApiGetCurUserWithUsername = async (
  username: string
) => {
  const res = await axios({
    method: "GET",
    url: "user/profile/" + username,
  });

  if (!res) return null;

  return res?.data;
};
export const createCartUser: ApiCreateCartUser = async (data: ICart) => {
  const res = await axios({
    method: "POST",
    url: "user/carts",
    data: {
      productId: data.productId,
      size: data.size,
      quantity: data.quantity,
    },
  });
  console.log("data", data);

  if (!res) return null;

  return res?.data;
};
export const getCartUser: ApiGetCartUser = async () => {
  const res = await axios({
    method: "GET",
    url: "user/carts",
  });

  if (!res) return null;

  return res?.data;
};
