import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  user: {},
};

const usersSlices = createSlice({
  name: "userList",
  initialState,
  reducers: {
    userDataList: (state, action) => {
      state.data = action.payload;
    },
    userView: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { userDataList, userView } = usersSlices.actions;
export default usersSlices.reducer;
