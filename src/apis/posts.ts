import axios from "../configs/axios";
import {
  ICommentRequest,
  IParamsApiPostPage,
  IPostRequest,
} from "@/configs/interface";
import {
  ApiCommentsWithPost,
  ApiCreatePost,
  ApiDeleteCommentsWithPost,
  ApiDetailPost,
  ApiLikeCommentsWithPost,
  ApiLikePostsWithPost,
  ApiPostPage,
  ApiPushCommentsWithPost,
} from "@/configs/types";
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
export const getDetailPost: ApiDetailPost = async (id: string) => {
  const res = await axios({
    method: "GET",
    url: "posts/detail/" + id,
  });

  if (!res) return null;

  return res?.data;
};
export const getCommentWithPost: ApiCommentsWithPost = async (
  id: string,
  page?: number
) => {
  const params: { page?: number } = {};
  if (page) {
    params.page = Number(page) - 1;
  } else {
    if (params.page) {
      delete params.page;
    }
  }
  const res = await axios({
    method: "GET",
    url: "comments/" + id,
    params,
  });

  if (!res) return null;

  return res?.data;
};
export const commentWittPost: ApiPushCommentsWithPost = async (
  data: ICommentRequest
) => {
  const res = await axios({
    method: "POST",
    url: "user/comments",
    data,
  });

  if (!res) return null;

  return res?.data;
};
export const likeComment: ApiLikeCommentsWithPost = async (id: number) => {
  const res = await axios({
    method: "PUT",
    url: "comments/like/" + id,
  });

  if (!res) return null;

  return res?.data;
};
export const deleteCommentWittPost: ApiDeleteCommentsWithPost = async (
  id: number
) => {
  const res = await axios({
    method: "DELETE",
    url: "user/comments/" + id,
  });

  if (!res) return null;

  return res?.data;
};
export const likePost: ApiLikePostsWithPost = async (id: string) => {
  const res = await axios({
    method: "PUT",
    url: "user/like-posts/" + id,
  });

  if (!res) return null;

  return res?.data;
};
export const deletePost: ApiDetailPost = async (id: string) => {
  const res = await axios({
    method: "DELETE",
    url: "user/posts/" + id,
  });

  if (!res) return null;

  return res?.data;
};
export const createPost: ApiCreatePost = async (data: IPostRequest) => {
  const formData = new FormData();
  formData.append("title", data.title);
  data.medias.forEach((item, index) => {
    if (item.data) {
      formData.append(`medias[${index}].index`, index + "");
      formData.append(`medias[${index}].file`, item.data);
    }
  });
  const res = await axios({
    method: "POST",
    url: "user/posts",
    headers: {
      "content-type": "multipart/form-data",
    },
    data: formData,
  });

  if (!res) return null;

  return res?.data;
};
