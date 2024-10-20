import axios from "../configs/axios";
import { IRequestFilterPet } from "@/configs/interface";
import {
  ApiFilterPets,
  ApiPetAttributes,
  ApiPetDetailPage,
  ApiPetFavorite,
} from "@/configs/types";

export const filterPets: ApiFilterPets = async (params: IRequestFilterPet) => {
  const res = await axios({
    url: "/pets",
    method: "GET",
    params,
  });
  if (!res) return null;
  return res?.data;
};
export const getPetAttibutes: ApiPetAttributes = async () => {
  const res = await axios({
    method: "GET",
    url: "/pets/attributes",
  });

  if (!res) return null;

  return res?.data;
};

export const petDetail: ApiPetDetailPage = async (id: string) => {
  const res = await axios({
    method: "GET",
    url: "/pets/" + id,
  });

  if (!res) return null;

  return res?.data;
};
export const favorite: ApiPetFavorite = async (id: string) => {
  const res = await axios({
    method: "PUT",
    url: "/user/pets/favourite/" + id,
  });

  if (!res) return null;

  return res?.data;
};
