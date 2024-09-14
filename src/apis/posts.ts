import axios from "../configs/axios";
import { IParamsApiPostPage } from "@/configs/interface";
import { ApiPostPage } from "@/configs/types";
import Validate from "@/utils/validate";

export const getPosts: ApiPostPage = async (prevParams: IParamsApiPostPage) => {
  const params: { page?: number; search?: string } = {};

  if (
    (prevParams.page && Validate.isNumber(prevParams.page + "")) ||
    (prevParams.search && Validate.isBlank(prevParams.search))
  ) {
    params.page = Number(prevParams.page) - 1;
    params.search = prevParams.search;
  } else {
    if (params.page || params.search) {
      delete params.page;
      delete params.search;
    }
  }

  const res = await axios({
    method: "GET",
    url: "/posts",
    params,
  });

  if (!res) return null;

  return res?.data;
};
