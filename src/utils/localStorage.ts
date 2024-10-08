import { ICart } from "@/configs/interface";

const keyCart: string = "cart-user";
export const addCartTolocal = (
  data: { cart: ICart[]; payment: ICart[] },
  username: string
) => {
  localStorage.setItem(username, JSON.stringify({ ...data, cart: data.cart }));
};
