import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DoctorType = {
  name: string;
  id: string;
  email: string;
  avatar: null | string;
};

type DoctorStateType = {
  doctors: DoctorType[];
};

const initialState: DoctorStateType = {
  doctors: [],
};

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    getAllDoctors: (state, action: PayloadAction<DoctorType[]>) => {
      return { ...state, doctors: action.payload };
    },
  },
});

export const { getAllDoctors } = doctorSlice.actions;
export default doctorSlice.reducer;
