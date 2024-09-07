import axios from "../configs/axios";
import { IRequestFilterPet } from "@/configs/interface";
import { ApiFilterPets } from "@/configs/types";

export const filterPets: ApiFilterPets = async (params: IRequestFilterPet) => {
  const res = await axios({
    url: "/pets",
    method: "GET",
    params,
  });
  if (!res) return null;

  return res?.data;
};
