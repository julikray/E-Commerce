import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
 

export const placeOrder = createAsyncThunk(
  "card/placeOrder",
  async (
    { price, products, shipping_fee, shippingInfo, userId, navigate, items },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.post("/home/order/placeOrder", {
        price,
        products,
        shipping_fee,
        shippingInfo,
        userId,
        navigate,
        items,
      });

      navigate('/payment' , {
        state : {
          price: price + shipping_fee,
          items, 
          orderId: data.orderId
        }

      })
      console.log(data);
      return true

      // return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOrder = createAsyncThunk(
  "order/getOrder",
  async ({ customerId, status }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/order/customer/getOrder/${customerId}/${status}`);
      console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const getOrders = createAsyncThunk(
  "order/getOrders",
  async ( orderId , { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/order/customer/getOrders/${orderId}`);
      console.log(data)
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const orderReducer = createSlice({
  name: "order",
  initialState: {
    myOrders: [],
    errorMessage: "",
    successMessage: "",
    myOrder: {},
  },

  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder

    .addCase(getOrder.fulfilled, (state, action) => {
      state.myOrders = action.payload.orders;
    })

    .addCase(getOrders.fulfilled, (state, action) => {
      state.myOrder = action.payload.order;
    })

  },
});

export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
