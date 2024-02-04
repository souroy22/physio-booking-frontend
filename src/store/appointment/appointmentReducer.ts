import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AppointmentsState = {
  appointments: [];
};
const initialState: AppointmentsState = {
  appointments: [],
};

export const appointmentsSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAllAppointments: (state, action: PayloadAction<[]>) => {
      return (state = {
        ...state,
        appointments: action.payload,
      });
    },
  },
});

export const { getAllAppointments } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
