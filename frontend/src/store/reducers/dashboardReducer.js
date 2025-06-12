import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getDashboardIndexData = createAsyncThunk(
  "dashboard/getDashboardIndexData",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/order/customer/getDashboardIndexData/${userId}`
      );

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const dashboardReducer = createSlice({
  name: "dashboard",
  initialState: {
    recentOrders: [],
    errorMessage: "",
    successMessage: "",
    totalOrder: 0,
    pendingOrder: 0,
    cancelledOrder: 0,
  },

  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDashboardIndexData.fulfilled, (state, action) => {
      state.totalOrder = action.payload.totalOrder;
      state.pendingOrder = action.payload.pendingOrder;
      state.cancelledOrder = action.payload.cancelledOrder;
      state.recentOrders = action.payload.recentOrders;
    });
  },
});

export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;
