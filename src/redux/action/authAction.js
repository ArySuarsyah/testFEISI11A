import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../helper/http";

export const asyncLoginAction = createAsyncThunk(
  "asyncLoginAction",
  async (payload, { rejectWithValue }) => {
    try {
      const form = {
        email: payload.email,
        password: payload.password,
      };
      const { data } = await http().post("/auth/login", form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error) {
      console.log(error.response.data.detail);
      if (error.response.data.detail) {
        return rejectWithValue(error.response.data.detail);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const asyncRegister = createAsyncThunk(
  "asyncRegister",
  async (payload, { rejectWithValue }) => {
    try {
      const form = {
        name: payload.name,
        email: payload.email,
        password: payload.password,
      };
      const { data } = await http().post("/auth/register", form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error) {
      // return error.response.data.detail;
      // // result.map((msg) => {
      // //   for (let key in msg) {
      // //     console.log(msg[key]);
      // //   }
      // // });
      if (error.response.data.detail) {
        return rejectWithValue(error.response.data.detail);
      }
      return rejectWithValue(error.message);
    }
  }
);
