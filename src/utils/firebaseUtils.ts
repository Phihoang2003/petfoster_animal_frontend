import { IProfile } from "@/configs/interface";
import firebaseService from "@/services/firebaseService";

export const handleSetLastSeenInfoFirebase = (user: IProfile) => {
  firebaseService.setLastseen(user);
};
