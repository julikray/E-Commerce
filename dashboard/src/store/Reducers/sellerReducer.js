import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getSellerReq = createAsyncThunk(
  "seller/getSellerReq",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/request-seller-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage} `,
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

export const getSeller = createAsyncThunk(
  "seller/getSeller",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/get-seller/${sellerId}`, {
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

export const sellerStatusUpdate = createAsyncThunk(
  "seller/sellerStatusUpdate",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/seller-status-update`, info, {
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


export const sellerReducer = createSlice({
  name: "category",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    sellers: [],
    totalSeller: 0,
    seller: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder
    
    .addCase(getSellerReq.fulfilled, (state, { payload }) => {
      state.sellers = payload.sellers;
      state.totalSeller = payload.totalSeller;
    })

    .addCase(getSeller.fulfilled, (state, { payload }) => {
        state.seller = payload.seller;
        
     })

     .addCase(sellerStatusUpdate.fulfilled, (state, { payload }) => {
      state.seller = payload.seller;
      state.successMessage = payload.message;
      
   })




  },
});


export const { messageClear } = sellerReducer.actions;
export default sellerReducer.reducer;
