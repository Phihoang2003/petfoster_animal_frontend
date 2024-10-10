import {
  IApiTakeAction,
  IBaseResponse,
  ICart,
  IComment,
  ICommentRequest,
  IDetailProduct,
  IFormChangePassword,
  IImagePost,
  IParamsApiPostPage,
  IPet,
  IPetAttribute,
  IPost,
  IPostDetail,
  IPostRequest,
  IProfile,
  IRequestFilterPet,
  IReview,
  ISearchItem,
  ISignDataResponse,
  PagiantionResponse,
} from "@/configs/interface";
import { store } from "@/redux/store";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
export type ValidTags = keyof JSX.IntrinsicElements;

export type LocationTileType = "center" | "left" | "right";
export type TypeNotification =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "none";
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
export type ApiLikeCommentsWithPost = (
  id: number
) => Promise<IBaseResponse<IComment>>;
export type ApiDeleteCommentsWithPost = (
  id: number
) => Promise<IBaseResponse<IComment>>;
export type ApiLikePostsWithPost = (
  id: string
) => Promise<IBaseResponse<IComment>>;
export type ImageType = {
  link: string;
  data: File | null;
};
export type ApiCreatePost = (
  data: IPostRequest
) => Promise<IBaseResponse<IPostDetail>>;

export type ApiHightlightPostPage = (
  params: IParamsApiPostPage
) => Promise<IBaseResponse<IPost[]>>;
export type ApiGetCurUserWithUsername = (
  username: string
) => Promise<IBaseResponse<IProfile>>;
export type ApiDeleteImage = (id: number) => Promise<IBaseResponse<IImagePost>>;
export type ApiUpdatePost = (
  data: IPostRequest,
  id: string
) => Promise<IBaseResponse<IPostDetail>>;

export type ApiTakeActionType = () => Promise<IBaseResponse<IApiTakeAction>>;
export type ApiDetailProductType = (
  idProduct: string
) => Promise<IBaseResponse<IDetailProduct>>;
export type ApiChangePassword = (
  data: IFormChangePassword
) => Promise<IBaseResponse<any>>;
export type ApiReplayReview = (data: IReview) => Promise<IBaseResponse<any>>;
export type ApiCreateCartUser = (data: ICart) => Promise<IBaseResponse<ICart>>;
export type ApiGetCartUser = () => Promise<IBaseResponse<ICart[]>>;
export type ApiUpdateCartUser = (
  data: ICart[]
) => Promise<IBaseResponse<ICart[]>>;

export type ProfileType = {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  birthday: string;
};
export type DataRequestUpdateUser = {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  birthday: string;
  avatar?: string;
};

export type ApiUpdateCurUser = (
  data: DataRequestUpdateUser
) => Promise<IBaseResponse<IProfile>>;
