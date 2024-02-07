import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  slots: {},
  mySlots: {},
};

export const slotSlice = createSlice({
  name: "slot",
  initialState,
  reducers: {
    setSlots: (state, action: PayloadAction<any>) => {
      return { ...state, slots: action.payload };
    },
    addMySlots: (state, action: PayloadAction<any>) => {
      return { ...state, mySlots: action.payload };
    },
  },
});

export const { setSlots, addMySlots } = slotSlice.actions;
export default slotSlice.reducer;
