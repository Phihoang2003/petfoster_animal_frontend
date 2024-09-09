import {
  ApiGetCurUser,
  ApiLogin,
  ApiRefreshVerifyCode,
  ApiRegister,
  ApiVerifyCode,
} from "@/configs/types";
import axios from "../configs/axios";
import { setTokenToCookie } from "@/utils/cookies";
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
