import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getSellerReqDashboardIndex = createAsyncThunk(
  "dashboardIndex/getSellerReqDashboardIndex",
  async (_, { rejectWithValue, fulfillWithValue } ) => {
    try {
      const { data } = await api.get(
        "/seller/getSellerReqDashboardIndex",
        { withCredentials: true }
      );

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
       console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

 
export const getAdminReqDashboardIndex = createAsyncThunk(
  "dashboardIndex/getAdminReqDashboardIndex",
  async ( _,
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/admin/getAdminReqDashboardIndex`,
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



export const dashboardIndexReducer = createSlice({
  name: "dashboardIndex",
  initialState: {
     totalSale:0,
     totalOrder: 0,
     totalProduct: 0,
     totalPendingOrder: 0,
     totalSeller: 0,
     recentOrders: [],
     recentMessage: []
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
       state.successMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder

     .addCase(getSellerReqDashboardIndex.fulfilled, (state, { payload }) => {
        state.totalSale = payload.totalSale;
        state.totalOrder = payload.totalOrder;
        state.totalProduct = payload.totalProduct;
        state.totalPendingOrder = payload.totalPendingOrder;
        state.recentOrders = payload.recentOrders;
        state.recentMessage = payload.messages;
      })

      .addCase(getAdminReqDashboardIndex.fulfilled, (state, { payload }) => {
        state.totalSale = payload.totalSale;
        state.totalOrder = payload.totalOrder;
        state.totalProduct = payload.totalProduct;
        state.totalSeller = payload.totalSeller;
        state.recentOrders = payload.recentOrders;
        state.recentMessage = payload.messages;
      })
    
    
    


  },
});


export const { messageClear } = dashboardIndexReducer.actions;
export default dashboardIndexReducer.reducer;
