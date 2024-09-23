import {
  IBaseResponse,
  IComment,
  ICommentRequest,
  IParamsApiPostPage,
  IPet,
  IPetAttribute,
  IPost,
  IPostDetail,
  IProfile,
  IRequestFilterPet,
  ISearchItem,
  ISignDataResponse,
  PagiantionResponse,
} from "@/configs/interface";
import { store } from "@/redux/store";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
export type ValidTags = keyof JSX.IntrinsicElements;

export type LocationTileType = "center" | "left" | "right";
export type SortType = string | null;

export type StateType =
  | "placed"
  | "shipping"
  | "delivered"
  | "cancelled"
  | "cancelled_by_admin"
  | "cancelled_by_customer";

export type RoleType = "ROLE_USER" | "ROLE_STAFF" | "ROLE_ADMIN" | "ROLE_SUPER";
export type ValidateType = { message: string; error: boolean };

export type ApiFilterPets = (
  params: IRequestFilterPet
) => Promise<IBaseResponse<PagiantionResponse<IPet>>>;

export type ApiRegister = (
  data: RegisterFormData
) => Promise<ISignDataResponse>;

export type ApiRefreshVerifyCode = (
  code: string
) => Promise<IBaseResponse<any>>;
export type ApiGetCurUser = () => Promise<IBaseResponse<IProfile>>;

export type ApiVerifyCode = (code: string) => Promise<IBaseResponse<any>>;

export type RegisterFormData = {
  username: string;
  gender: string | boolean;
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type MenuHeaderType = {
  title: string;
  href: string;
  icon: IconProp;
};
export type UserFormType = { username: string; password: string };
export type ApiLogin = (data: UserFormType) => Promise<ISignDataResponse>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ApiPetAttributes = () => Promise<IBaseResponse<IPetAttribute>>;
export type ApiGetSearchHistories = () => Promise<IBaseResponse<ISearchItem[]>>;
export type ApiActionSearchHistories = (
  data: ISearchItem
) => Promise<IBaseResponse<ISearchItem[]>>;
export type ApiPostPage = (
  params: IParamsApiPostPage
) => Promise<IBaseResponse<PagiantionResponse<IPost>>>;

export type ApiDetailPost = (id: string) => Promise<IBaseResponse<IPostDetail>>;

export type ApiCommentsWithPost = (
  id: string,
  page?: number
) => Promise<IBaseResponse<PagiantionResponse<IComment>>>;

export type ApiPushCommentsWithPost = (
  data: ICommentRequest
) => Promise<IBaseResponse<IComment>>;
