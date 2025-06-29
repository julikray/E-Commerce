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


export const getActiveSeller = createAsyncThunk(
  "seller/getActiveSeller",
  async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
    try {
      
       const { data } = await api.get(
        `/getActiveSeller?page=${page}&&searchValue=${searchValue}&&parPage=${parPage} `,
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


export const getDeactiveSeller = createAsyncThunk(
  "seller/getDeactiveSeller",
  async ({ parPage, page, searchValue }, { rejectWithValue, fulfillWithValue }) => {
    try {
      
       const { data } = await api.get(
        `/getDeactiveSeller?page=${page}&&searchValue=${searchValue}&&parPage=${parPage} `,
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



export const createStripeConnectAccount = createAsyncThunk(
  "seller/createStripeConnectAccount",
  async (   ) => {
    try {
      
       const { data : {url} } = await api.get(
        '/payment/createStripeConnectAccount',
        { withCredentials: true }
      );
      window.location.href = url
      console.log(data);
  
    } catch (error) {
   
    }
  }
);


export const activeStripeConnectAccount = createAsyncThunk(
  "seller/activeStripeConnectAccount",
  async ( activeCode , { rejectWithValue, fulfillWithValue }) => {
    try {
      
       const { data } = await api.put(
        `/payment/activeStripeConnectAccount/${activeCode}`,{},
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
       state.successMessage = "";
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

     .addCase(getActiveSeller.fulfilled, (state, { payload }) => {
      state.sellers = payload.sellers;
      state.totalSeller = payload.totalSeller;
      
   })

    .addCase(getDeactiveSeller.fulfilled, (state, { payload }) => {
      state.sellers = payload.sellers;
      state.totalSeller = payload.totalSeller;
      
   })


    .addCase(activeStripeConnectAccount.pending, (state, { payload }) => {
      state.loader = true;
   })

    .addCase(activeStripeConnectAccount.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message
   })

     .addCase(activeStripeConnectAccount.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message
   })



  },
});


export const { messageClear } = sellerReducer.actions;
export default sellerReducer.reducer;
