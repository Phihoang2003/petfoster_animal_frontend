import { ApiUploadImageMessage, ImageType } from "@/configs/types";
import axios from "../configs/axios";
export const uploadImagesMessage: ApiUploadImageMessage = async (
  images: ImageType[]
) => {
  const formData = new FormData();

  images.forEach((item) => {
    formData.append("images", item.data as File);
  });

  const res = await axios({
    method: "POST",
    url: `user/messages`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });

  if (!res) return null;

  return res?.data;
};
