import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitAdorableProps {
  openPostModel: boolean;
}
const initState: IInitAdorableProps = {
  openPostModel: false,
};
export const adorable = createSlice({
  name: "adorable",
  initialState: initState,
  reducers: {
    setOpenPostModel: (state, action: PayloadAction<boolean>) => {
      state.openPostModel = action.payload;
    },
  },
});
export const { setOpenPostModel } = adorable.actions;
export default adorable.reducer;
