import {
  IBaseResponse,
  IPet,
  IRequestFilterPet,
  PagiantionResponse,
} from "@/configs/interface";

export type ValidTags = keyof JSX.IntrinsicElements;
export type LocationTileType = "center" | "left" | "right";
export type ValidateType = { message: string; error: boolean };
export type ApiFilterPets = (
  params: IRequestFilterPet
) => Promise<IBaseResponse<PagiantionResponse<IPet>>>;

export type RegisterFormData = {
  username: string;
  gender: string | boolean;
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
};
