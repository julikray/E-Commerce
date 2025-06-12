import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";


export const customerRegister = createAsyncThunk(
  "auth/customerRegister",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer/customerRegister", info);
      localStorage.setItem("customerToken", data.token);

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const customerLogin = createAsyncThunk(
  "auth/customerLogin",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/customer/customerLogin", info);
      localStorage.setItem("customerToken", data.token);

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

const decodeToken = (token) => {
  if (token) {
     const userInfo = jwtDecode(token)
     return userInfo
  } else {
    return "";
  }
};

 

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    loader: "",
    userInfo: decodeToken(localStorage.getItem('customerToken')),
    errorMessage: "",
    successMessage: "",
  },

  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(customerRegister.pending, (state, { payload }) => {
        state.loader = true;
      })

      .addCase(customerRegister.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })

      .addCase(customerRegister.fulfilled, (state, { payload }) => {
        const userInfo = decodeToken(payload.token)
        state.successMessage = payload.message;
        state.loader = false;
        state.userInfo = userInfo;
      })

      .addCase(customerLogin.pending, (state, { payload }) => {
        state.loader = true;
      })

      .addCase(customerLogin.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })

      .addCase(customerLogin.fulfilled, (state, { payload }) => {
       const userInfo = decodeToken(payload.token)
       state.successMessage = payload.message;
        state.loader = false;
        state.userInfo = userInfo
      });
  },
});

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
