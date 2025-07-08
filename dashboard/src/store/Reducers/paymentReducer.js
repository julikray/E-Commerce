import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getSellerPaymentDetails = createAsyncThunk(
  "payment/getSellerPaymentDetails",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/payment/sellerPaymentDetails/${sellerId}`,
        {
          withCredentials: true,
        }
      );

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendWithdrawalRequest = createAsyncThunk(
  "payment/sendWithdrawalRequest",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/payment/withdrawalRequest`, info, {
        withCredentials: true,
      });

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data)
      return rejectWithValue(error.response.data);
    }
  }
);

export const paymentReducer = createSlice({
  name: "payment",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    pendingWithDrawal: [],
    successWithDrawal: [],
    totalAmount: 0,
    withDrawalAmount: 0,
    pendingAmount: 0,
    availableAmount: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getSellerPaymentDetails.fulfilled, (state, { payload }) => {
        state.pendingWithDrawal = payload.pendingWithDrawal;
        state.successWithDrawal = payload.successWithDrawal;
        state.totalAmount = payload.totalAmount;
        state.availableAmount = payload.availableAmount;
        state.withDrawalAmount = payload.withDrawalAmount;
        state.pendingAmount = payload.pendingAmount;
      })

      .addCase(sendWithdrawalRequest.pending, (state, { payload }) => {
        state.loader = true;
      })

      .addCase(sendWithdrawalRequest.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })

      .addCase(sendWithdrawalRequest.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        // state.pendingWithDrawal = [...state.pendingWithDrawal , payload.withdrawal]
        state.pendingWithDrawal = [
          ...(Array.isArray(state.pendingWithDrawal)
            ? state.pendingWithDrawal
            : []),
          payload.withdrawal,
        ];

        state.availableAmount =
          state.availableAmount - payload.withdrawal.amount;
        state.pendingAmount = payload.withdrawal.amount;
      });
  },
});

export const { messageClear } = paymentReducer.actions;
export default paymentReducer.reducer;
