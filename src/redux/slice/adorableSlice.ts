import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitAdorableProps {
  openPostModal: boolean;
}
const initState: IInitAdorableProps = {
  openPostModal: false,
};
export const adorable = createSlice({
  name: "adorable",
  initialState: initState,
  reducers: {
    setOpenPostModal: (state, action: PayloadAction<boolean>) => {
      state.openPostModal = action.payload;
    },
  },
});
export const { setOpenPostModal } = adorable.actions;
export default adorable.reducer;
