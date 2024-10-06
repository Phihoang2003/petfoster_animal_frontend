import axiosConfig from "@/configs/axios";
import { IReview } from "@/configs/interface";
import { ApiReplayReview } from "@/configs/types";
import axios from "@/configs/axios";

export const replyReview: ApiReplayReview = async (data: IReview) => {
  const res = await axiosConfig({
    method: "POST",
    url: "admin/reviews",
    data: {
      idReplay: data.id,
      comment: data.comment,
    },
  });

  if (!res) return null;

  return res?.data;
};
export const deleteReview: ApiReplayReview = async (data: IReview) => {
  const res = await axios({
    method: "DELETE",
    url: "admin/reviews/" + data.id,
  });

  if (!res) return null;

  return res?.data;
};
