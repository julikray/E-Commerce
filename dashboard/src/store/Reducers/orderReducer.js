import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getAdminOrders = createAsyncThunk(
  "order/getAdminOrders",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/home/order/admin/getAdminOrders?page=${page}&searchValue=${searchValue}&parPage=${parPage} `,
        { withCredentials: true }
      );

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAdminOrdersDetails = createAsyncThunk(
  "order/getAdminOrdersDetails",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/order/admin/getAdminOrdersDetails/${orderId}  `,
        { withCredentials: true }
      );

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminOrderStatusUpdate = createAsyncThunk(
  "order/adminOrderStatusUpdate",
  async ({ orderId, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/home/order/admin/adminOrderStatusUpdate/${orderId}  `,
        info,
        { withCredentials: true }
      );

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSellerOrders = createAsyncThunk(
  "order/getSellerOrders",
  async (
    { parPage, page, searchValue, sellerId },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/home/order/seller/getSellerOrders/${sellerId}?page=${page}&searchValue=${searchValue}&parPage=${parPage} `,
        { withCredentials: true }
      );

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSellerOrdersDetails = createAsyncThunk(
  "order/getSellerOrdersDetails",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/order/seller/getSellerOrdersDetails/${orderId}  `,
        { withCredentials: true }
      );

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const sellerOrderStatusUpdate = createAsyncThunk(
  "order/sellerOrderStatusUpdate",
  async ({ orderId, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        `/home/order/seller/sellerOrderStatusUpdate/${orderId}  `,
        info,
        { withCredentials: true }
      );

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderReducer = createSlice({
  name: "order",
  initialState: {
    successMessage: "",
    errorMessage: "",
    totalOrder: 0,
    order: {},
    myOrders: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getAdminOrders.fulfilled, (state, { payload }) => {
        state.myOrders = payload.orders;
        state.totalOrder = payload.totalOrder;
      })

      .addCase(getAdminOrdersDetails.fulfilled, (state, { payload }) => {
        state.order = payload.order;
      })

      .addCase(adminOrderStatusUpdate.rejected, (state, { payload }) => {
        state.errorMessage = payload.message;
      })

      .addCase(adminOrderStatusUpdate.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })

      .addCase(getSellerOrders.fulfilled, (state, { payload }) => {
        state.myOrders = payload.orders;
        state.totalOrder = payload.totalOrder;
      })

      .addCase(getSellerOrdersDetails.fulfilled, (state, { payload }) => {
        state.order = payload.order;
      })

      .addCase(sellerOrderStatusUpdate.rejected, (state, { payload }) => {
        state.errorMessage = payload.message;
      })

      .addCase(sellerOrderStatusUpdate.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      });
  },
});

export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
