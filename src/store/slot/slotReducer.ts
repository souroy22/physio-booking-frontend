import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  slots: {},
};

export const slotSlice = createSlice({
  name: "slot",
  initialState,
  reducers: {
    setSlots: (state, action: PayloadAction<any>) => {
      return { ...state, slots: action.payload };
    },
  },
});

export const { setSlots } = slotSlice.actions;
export default slotSlice.reducer;
