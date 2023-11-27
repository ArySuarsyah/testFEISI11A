import { createSlice } from "@reduxjs/toolkit";
import { asyncLoginAction, asyncRegister } from "../action/authAction";
const initialState = {
  dataUser: {},
  loginMessage: "",
  registerMessage: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
    deleteMessage: (state) => {
      state.loginMessage = "";
      state.registerMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncLoginAction.pending, (state, action) => {
      state.loginMessage = action.payload;
    });
    builder.addCase(asyncLoginAction.fulfilled, (state, action) => {
      state.dataUser = action.payload;
    });
    builder.addCase(asyncLoginAction.rejected, (state, action) => {
      state.loginMessage = action.payload;
    });
    builder.addCase(asyncRegister.pending, (state, action) => {
      state.registerMessage = action.payload;
    });
    builder.addCase(asyncRegister.fulfilled, (state, action) => {
      state.dataUser = action.payload;
    });
    builder.addCase(asyncRegister.rejected, (state, action) => {
      state.registerMessage = action.payload;
    });
  },
});

export const { logout, deleteMessage } = authSlice.actions;
export default authSlice.reducer;
