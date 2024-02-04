import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./global/globalReducer";
import authReducer from "./auth/authReducer";
import doctorReducer from "./doctor/doctorReducer";
import slotReducer from "./slot/slotReducer";
import appointmentReducer from "./appointment/appointmentReducer";

const store = configureStore({
  reducer: {
    globalReducer,
    authReducer,
    doctorReducer,
    slotReducer,
    appointmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
