import { curUser } from "@/apis/user";
import { IProfile } from "@/configs/interface";
import { RoleType } from "@/configs/types";
import {
  clearToken,
  getTokenFromCookie,
  setRoleToCookie,
} from "@/utils/cookies";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const fetchUserByToken = createAsyncThunk(
  "user/fetchUserByToken",
  async (_, thunkAPi) => {
    const token = getTokenFromCookie();
    if (!token || token === "" || token === null) return null;
    try {
      const res = await curUser();
      if (res.errors) {
        return null;
      }
      setRoleToCookie(res.data.role as RoleType);
      return res.data;
    } catch (error) {
      clearToken();
      return null;
    }
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  clearToken();
  return null;
});
interface IInitUserStoreState {
  user: null | IProfile;
  token: string;
  loading: boolean;
}
const initState: IInitUserStoreState = {
  user: null,
  token: getTokenFromCookie() || "",
  loading: false,
};
export const user = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserByToken.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUserByToken.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUserByToken.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
    });
    // logout
    builder.addCase(logout.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
      });
  },
});
export const { setToken } = user.actions;
export default user.reducer;
