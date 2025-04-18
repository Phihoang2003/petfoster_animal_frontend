import {
  ApiActionSearchHistories,
  ApiChangePassword,
  ApiCreateCartUser,
  ApiCreateOrder,
  ApiCreateReivew,
  ApiDetailHistory,
  ApiGetAddresses,
  ApiGetAddressesById,
  ApiGetCartUser,
  ApiGetCurUser,
  ApiGetCurUserWithUsername,
  ApiGetDefaultAddress,
  ApiGetSearchHistories,
  ApiHandleAddresses,
  ApiHistory,
  ApiLogin,
  ApiPayment,
  ApiRefreshVerifyCode,
  ApiRegister,
  ApiUpdateCartUser,
  ApiUpdateCurUser,
  ApiUpdateStatusOrder,
  ApiVerifyCode,
  DataRequestUpdateUser,
  StateType,
  UpdateStatusOrderType,
} from "@/configs/types";
import axios from "../configs/axios";
import { setTokenToCookie } from "@/utils/cookies";
import {
  ICart,
  IFormChangePassword,
  IInfoAddress,
  IOrder,
  IPayment,
  IRequestReview,
  ISearchItem,
} from "@/configs/interface";
import { dataURLtoFile, replaceValidDistrich } from "@/utils/format";
import moment from "moment";
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
export const updateCartUser: ApiUpdateCartUser = async (data: ICart[]) => {
  const res = await axios({
    method: "PUT",
    url: "user/carts",
    data: data.map((item) => {
      return {
        productId: item.productId,
        size: item.size,
        quantity: item.quantity,
      };
    }),
  });

  if (!res) return null;

  return res?.data;
};

export const updateUser: ApiUpdateCurUser = async (
  data: DataRequestUpdateUser
) => {
  console.log(data, {
    ...data,
    gender: data.gender === "Male",
    avartar: data.avatar ? dataURLtoFile(data.avatar) : null,
    birthday: moment(data.birthday).format("D/MM/yyyy"),
  });
  const res = await axios({
    method: "POST",
    url: "user/profile",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: {
      ...data,
      gender: data.gender === "Male",
      avatar: data.avatar ? dataURLtoFile(data.avatar) : null,
    },
  });

  if (!res) return null;

  return res?.data;
};

export const changePassword: ApiChangePassword = async (
  data: IFormChangePassword
) => {
  const res = await axios({
    method: "POST",
    url: "user/profile/change-password",
    data,
  });

  if (!res) return null;

  return res?.data;
};

export const getAddresses: ApiGetAddresses = async () => {
  const res = await axios({
    method: "GET",
    url: "user/addresses",
  });

  if (!res) return null;

  return res?.data;
};

export const getDefaultAddress: ApiGetDefaultAddress = async () => {
  const res = await axios({
    method: "GET",
    url: "user/addresses/default",
  });

  if (!res) return null;

  return res?.data;
};

export const getAddressesById: ApiGetAddressesById = async (id: number) => {
  const res = await axios({
    method: "GET",
    url: "user/addresses/" + id,
  });

  if (!res) return null;

  return res?.data;
};

export const addAddress: ApiHandleAddresses = async (data: IInfoAddress) => {
  const res = await axios({
    method: "POST",
    url: "user/addresses",
    data: {
      ...data,
      setDefault: data.isDefault,
      address: {
        ...data.address,
        district: replaceValidDistrich(data.address.district),
      },
    },
  });

  if (!res) return null;

  return res?.data;
};

export const updateAddress: ApiHandleAddresses = async (data: IInfoAddress) => {
  const res = await axios({
    method: "PUT",
    url: "user/addresses/" + data.id,
    data: {
      ...data,
      setDefault: data.isDefault,
      address: {
        ...data.address,
        district: replaceValidDistrich(data.address.district),
      },
    },
  });

  if (!res) return null;

  return res?.data;
};

export const deleteAddress: ApiHandleAddresses = async (data: IInfoAddress) => {
  const res = await axios({
    method: "DELETE",
    url: "user/addresses/" + data.id,
  });

  if (!res) return null;

  return res?.data;
};

export const createOrder: ApiCreateOrder = async (data: IOrder) => {
  const res = await axios({
    method: "POST",
    url: "user/order",
    data,
  });

  if (!res) return null;

  return res?.data;
};

export const updateUserStatusOrder: ApiUpdateStatusOrder = async (
  data: UpdateStatusOrderType
) => {
  const res = await axios({
    method: "POST",
    url: "user/order/cancel/" + data.id,
    data: {
      status: data.status.toLocaleUpperCase(),
      reason: data.reason,
    },
  });

  if (!res) return null;

  return res?.data;
};

export const createPayment: ApiPayment = async (data: IPayment) => {
  const res = await axios({
    method: "POST",
    url: "user/payment",
    data,
  });

  if (!res) return null;

  return res?.data;
};

export const orderHistory: ApiHistory = async (
  page?: number | undefined,
  status?: StateType | string
) => {
  const res = await axios({
    method: "GET",
    url: "user/order/history",
    params: {
      page: page || 0,
      status,
    },
  });

  if (!res) return null;

  return res?.data;
};

export const detailOtherHistory: ApiDetailHistory = async (
  id: string | number
) => {
  const res = await axios({
    method: "GET",
    url: "user/order/history/" + id,
  });

  if (!res) return null;

  return res?.data;
};

export const createReview: ApiCreateReivew = async (data: IRequestReview) => {
  console.log("data", data);

  const res = await axios({
    method: "POST",
    url: "user/reviews",
    data: {
      orderId: data.orderId,
      productId: data.productId,
      comment: data.content,
      rate: data.star,
    },
  });

  if (!res) return null;

  return res?.data;
};
