import { ApiRegister } from "@/configs/types";
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
