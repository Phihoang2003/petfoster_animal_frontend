import {
  ApiRefreshVerifyCode,
  ApiRegister,
  ApiVerifyCode,
} from "@/configs/types";
import axios from "../configs/axios";
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
