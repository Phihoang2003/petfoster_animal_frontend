import { ApiTakeActionType } from "@/configs/types";
import axios from "../configs/axios";
export const takeAction: ApiTakeActionType = async () => {
  const res = await axios({
    method: "GET",
    url: "take-action",
  });

  if (!res) return null;

  return res?.data;
};
