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

export const getPaymentRequest = createAsyncThunk(
  "payment/getPaymentRequest",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/payment/getPaymentRequest`, {
        withCredentials: true,
      });

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const confirmPaymentRequest = createAsyncThunk(
  "payment/confirmPaymentRequest",
  async (paymentId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/payment/confirmPaymentRequest`,
        { paymentId },
        {
          withCredentials: true,
        }
      );

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
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
    pendingWithdrawal: [],
    successWithDrawal: [],
    totalAmount: 0,
    withDrawalAmount: 0,
    pendingAmount: 0,
    availableAmount: 0,
    loaderPaymentId: null, // NEW
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
        state.pendingWithdrawal = payload.pendingWithdrawal;
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
        state.pendingWithdrawal = [
          ...(Array.isArray(state.pendingWithdrawal)
            ? state.pendingWithdrawal
            : []),
          payload.withdrawal,
        ];

        state.availableAmount =
          state.availableAmount - payload.withdrawal.amount;
        state.pendingAmount = payload.withdrawal.amount;
      })

      .addCase(getPaymentRequest.fulfilled, (state, { payload }) => {
        state.pendingWithdrawal = payload.withdrawalRequest;
      })

      //  .addCase(confirmPaymentRequest.pending, (state, { payload }) => {
      //   state.loader = true;
      //   state.loaderPaymentId = meta.arg;
      // })

      .addCase(confirmPaymentRequest.pending, (state, { meta }) => {
        state.loader = true;
        state.loaderPaymentId = meta.arg;
      })

      .addCase(confirmPaymentRequest.rejected, (state, { payload }) => {
        state.loader = false;
        // state.errorMessage = payload.message;
        state.errorMessage =
          payload?.message || payload?.error || "Something went wrong";
      })

      .addCase(confirmPaymentRequest.fulfilled, (state, { payload }) => {
        const temp = state.pendingWithdrawal.filter(
          (r) => r._id !== payload.payment._id
        );
        state.loader = false;
        state.loaderPaymentId = null;
        state.successMessage = payload.message;
        state.pendingWithdrawal = temp;
      });
  },
});

export const { messageClear } = paymentReducer.actions;
export default paymentReducer.reducer;
