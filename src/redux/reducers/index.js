import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// import Reducers
import authReducer from "./auth";
import userListReducer from "./userList";

// config storage
const authConfig = {
  key: "auth",
  storage,
};

const reducer = combineReducers({
  auth: persistReducer(authConfig, authReducer),
  userList: userListReducer,
});

export default reducer;
