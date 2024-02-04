import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { customLocalStorage } from "../../utils/localStorage";

interface UserType {
  name: string;
  email: string;
  isAdmin: string;
  avatar: string | null;
  id: string;
}

interface PayloadType extends UserType {
  token: string;
}

export type AuthInitialState = {
  isLoggedIn: boolean;
  user: UserType;
};
const initialState: AuthInitialState = {
  isLoggedIn: false,
  user: { name: "", email: "", isAdmin: "User", avatar: null, id: "" },
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<PayloadType>) => {
      const { name, email, avatar, isAdmin, token, id } = action.payload;
      customLocalStorage.setData("token", token);
      return (state = {
        ...state,
        isLoggedIn: true,
        user: { name, email, avatar, isAdmin, id },
      });
    },
    logoutUser: (state) => {
      customLocalStorage.deleteData("token");
      return {
        ...state,
        isLoggedIn: false,
        user: { name: "", email: "", isAdmin: "", avatar: null, id: "" },
      };
    },
  },
});

export const { setUserData, logoutUser } = authSlice.actions;
export default authSlice.reducer;
