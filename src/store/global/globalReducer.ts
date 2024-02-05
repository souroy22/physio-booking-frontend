import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GlobalStateType = {
  loading: boolean;
};

const initialState: GlobalStateType = {
  loading: true,
};

export const authSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLoader: (state, action: PayloadAction<boolean>) => {
      return { ...state, loading: action.payload };
    },
  },
});

export const { setLoader } = authSlice.actions;
export default authSlice.reducer;
