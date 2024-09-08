import {
  IBaseResponse,
  IPet,
  IRequestFilterPet,
  ISignDataResponse,
  PagiantionResponse,
} from "@/configs/interface";

export type ValidTags = keyof JSX.IntrinsicElements;
export type LocationTileType = "center" | "left" | "right";
export type StateType =
  | "placed"
  | "shipping"
  | "delivered"
  | "cancelled"
  | "cancelled_by_admin"
  | "cancelled_by_customer";
export type ValidateType = { message: string; error: boolean };
export type ApiFilterPets = (
  params: IRequestFilterPet
) => Promise<IBaseResponse<PagiantionResponse<IPet>>>;
export type ApiRegister = (
  data: RegisterFormData
) => Promise<ISignDataResponse>;
export type RegisterFormData = {
  username: string;
  gender: string | boolean;
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
};
