import { createCartUser, getCartUser } from "@/apis/user";
import { ICart } from "@/configs/interface";
import { RootState } from "@/configs/types";
import { contants } from "@/utils/constant";
import { capitalize } from "@/utils/format";
import {
  addCartTolocal,
  addPaymetnTolocal,
  getPaymentFromLocal,
  getStoreFromLocal,
} from "@/utils/localStorage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { actionAsyncStorage } from "next/dist/client/components/action-async-storage-instance";
import { toast } from "react-toastify";

export const getPayment = createAsyncThunk("cart/getPayment", (_, thunkApi) => {
  const { userReducer } = thunkApi.getState() as RootState;

  const username = userReducer.user?.username;
  if (!username || username === "") return [];

  const store = getPaymentFromLocal(username);

  if (!store) return [];

  return store.payment as ICart[];
});
export const getCart = createAsyncThunk(
  "cart/getCartUser",
  async (_, thunkApi) => {
    const { userReducer } = thunkApi.getState() as RootState;

    const username = userReducer.user?.username;
    if (!username || username === "")
      return {
        data: [],
        username,
      };

    try {
      const response = await getCartUser();

      // if call failure
      if (!response)
        return {
          data: [],
          username,
        };

      // if call failure
      if (response.status !== 200)
        return {
          data: [],
          username,
        };

      const modifyResponse = response.data.map((item) => {
        return {
          ...item,
          checked: false,
        };
      });

      return {
        data: modifyResponse as ICart[],
        username,
      };
    } catch (error) {
      return {
        data: [],
        username,
      };
    }
  }
);

export const addCart = createAsyncThunk(
  "cart/addCart",
  async (data: ICart, thunkApi) => {
    const { userReducer } = thunkApi.getState() as RootState;
    const username = userReducer.user?.username;
    if (!username || username === "") return undefined;
    try {
      const response = await createCartUser(data);
      if (!response) {
        toast.warn(contants.messages.errors.handle);

        return thunkApi.rejectWithValue({
          data,
          username,
        });
      }

      if (response.status != 200) {
        toast.error(capitalize(response.message));

        return thunkApi.rejectWithValue({
          data,
          username,
        });
      }

      return {
        data,
        username,
      };
    } catch (error) {
      return thunkApi.rejectWithValue({
        data,
        username,
      });
    }
  }
);
export const modifyChecked = createAsyncThunk(
  "cart/modifyChecked",
  (data: { data: ICart; checked: boolean }, thunkApi) => {
    const { userReducer } = thunkApi.getState() as RootState;
    const username = userReducer.user?.username;
    if (!username || username === "") return undefined;

    return {
      data,
      username,
    };
  }
);
export const removeCart = createAsyncThunk(
  "cart/removeCartUser",
  (data: { data: ICart; index: number }, thunkApi) => {
    const { userReducer } = thunkApi.getState() as RootState;
    const username = userReducer.user?.username;
    if (!username || username === "") return undefined;

    return {
      data,
      username,
    };
  }
);
export const checkedAll = createAsyncThunk(
  "cart/checkedAll",
  (data: boolean, thunkApi) => {
    const { userReducer } = thunkApi.getState() as RootState;
    const username = userReducer.user?.username;
    if (!username || username === "") return undefined;

    return {
      data,
      username,
    };
  }
);
export const getCheckedAllCart = createAsyncThunk(
  "cart/getCheckedAllCart",
  async (_, thunkApi) => {
    const { userReducer } = thunkApi.getState() as RootState;

    const username = userReducer.user?.username;

    if (!username || username === "") return false;

    const store = getStoreFromLocal(username);

    const arrCart = (store.cart as ICart[]) || [];
    const checkAll = arrCart.every((item) => {
      return item.checked;
    });
    return checkAll;
  }
);
export const addPaymentToCart = createAsyncThunk(
  "cart/addPaymentToCart",
  (_, thunkApi) => {
    const { userReducer, cartReducer } = thunkApi.getState() as RootState;
    const username = userReducer.user?.username;
    if (!username || username === "")
      return { paymentItems: [], cartItems: [], username: "" };
    const paymentItems = cartReducer.cartUser.filter((item) => item.checked);
    const cartItems = cartReducer.cartUser.filter((item) => !item.checked);
    return {
      paymentItems,
      cartItems,
      username,
    };
  }
);

export const deletePayment = createAsyncThunk(
  "cart/deletePayment",
  (index: number, thunkApi) => {
    const { userReducer } = thunkApi.getState() as RootState;
    const username = userReducer.user?.username;
    if (!username || username === "") return undefined;

    return {
      username,
      index,
    };
  }
);

export const clearAllPayment = createAsyncThunk(
  "cart/clearAllPayment",
  (_, thunkApi) => {
    const { userReducer, cartReducer } = thunkApi.getState() as RootState;
    const username = userReducer.user?.username;
    if (!username || username === "")
      return { paymentItems: [], cartItems: [], username: "" };

    addPaymetnTolocal({ cart: cartReducer.cartUser, payment: [] }, username);
  }
);
const initState: {
  cartUser: ICart[];
  checkAll: boolean;
  payment: ICart[];
  success: boolean;
  error: string | undefined;
  isLoading: boolean;
} = {
  cartUser: [],
  checkAll: false,
  payment: [],
  success: false,
  error: undefined,
  isLoading: false,
};
export const cart = createSlice({
  name: "cart",
  initialState: initState,
  reducers: {
    setCheckedAllCartItem: (state, action: PayloadAction<boolean>) => {
      state.checkAll = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCart.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
      state.success = false;
    });
    builder.addCase(addCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.success = false;
    });
    builder.addCase(addCart.fulfilled, (state, action) => {
      if (!action.payload) return;
      const item = state.cartUser.find(
        (item) =>
          item.productId === action.payload?.data.productId &&
          item.size === action.payload.data.size
      );
      if (item) {
        //because item is object reference(find from userReducer), so we can change it directly
        item.quantity = action.payload.data.quantity + item.quantity;
        addCartTolocal(
          { payment: state.payment, cart: state.cartUser },
          action.payload.username
        );
        return;
      }
      addCartTolocal(
        {
          payment: state.payment,
          cart: [...state.cartUser, action.payload.data],
        },
        action.payload.username
      );
      state.cartUser = [...state.cartUser, action.payload.data];
    });
    //getCart
    builder.addCase(getCart.fulfilled, (state, action) => {
      if (!action.payload.username) return;
      addCartTolocal(
        { payment: state.payment, cart: action.payload.data },
        action.payload.username
      );
      return {
        ...state,
        cartUser: action.payload.data,
      };
    });

    //modifyChecked
    builder.addCase(modifyChecked.fulfilled, (state, action) => {
      if (!action.payload) return;
      const item = state.cartUser.find(
        (item) =>
          item.productId === action.payload?.data.data.productId &&
          item.size === action.payload?.data.data.size
      );

      if (item) {
        item.checked = action.payload.data.checked;
        addCartTolocal(
          { payment: state.payment, cart: state.cartUser },
          action.payload.username
        );
        const checkAll = state.cartUser.every((item) => item.checked);
        state.checkAll = checkAll;
        return;
      }
    });

    //removeCart
    builder.addCase(removeCart.fulfilled, (state, action) => {
      if (!action.payload) return;

      state.cartUser.splice(action.payload?.data.index, 1);
      addCartTolocal(
        { payment: state.payment, cart: state.cartUser },
        action.payload.username
      );
    });
    //checkedAll
    builder.addCase(checkedAll.fulfilled, (state, action) => {
      if (!action.payload) return;
      const newCartUser = state.cartUser.map((item) => {
        return {
          ...item,
          checked: item.repo > 0 ? action.payload?.data : item.checked,
        };
      });

      addCartTolocal(
        { payment: state.payment, cart: newCartUser },
        action.payload.username
      );

      return {
        ...state,
        cartUser: [...newCartUser],
      };
    });
    //getCheckedAllCart
    builder.addCase(getCheckedAllCart.fulfilled, (state, action) => {
      return {
        ...state,
        checkAll: action.payload,
      };
    });
    //addPaymentToCart
    builder.addCase(addPaymentToCart.fulfilled, (state, action) => {
      if (!action.payload.username || action.payload.paymentItems.length <= 0)
        return;
      const data = {
        cart: action.payload.cartItems,
        payment: action.payload.paymentItems,
      };

      // addCartTolocal(data.cart);
      addPaymetnTolocal({ ...data }, action.payload.username);

      return {
        ...state,
        cartUser: [...data.cart],
        payment: [...data.payment],
      };
    });
    //deletePayment
    builder.addCase(deletePayment.fulfilled, (state, action) => {
      if (!action.payload?.username) {
        return;
      }
      state.payment.splice(action.payload.index, 1);
      addPaymetnTolocal(
        { cart: state.cartUser, payment: state.payment },
        action.payload.username
      );
    });
    //clearAllPayment
    builder.addCase(clearAllPayment.fulfilled, (state, action) => {
      return {
        ...state,
        payment: [],
      };
    });
    //getPayment
    builder.addCase(getPayment.pending, (state, action) => {}),
      builder.addCase(getPayment.fulfilled, (state, action) => {
        state.payment = action.payload;
      }),
      builder.addCase(getPayment.rejected, (state, action) => {});
  },
});
export const { setCheckedAllCartItem } = cart.actions;
export default cart.reducer;
