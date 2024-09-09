import { RoleType } from "@/configs/types";
import Cookies from "js-cookie";
export const getTokenFromCookie = () => {
  const token = Cookies.get("token");
  return token;
};
export const setTokenToCookie = (token: string) => {
  Cookies.set("token", token);
};
export const setRoleToCookie = (role: RoleType) => {
  Cookies.set("role", role);
};
export const clearToken = () => {
  Cookies.remove("token");
  Cookies.remove("role");
};
