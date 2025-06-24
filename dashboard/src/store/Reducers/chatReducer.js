import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getCustomers = createAsyncThunk(
  "chat/getCustomers",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/seller/getCustomers/${sellerId}`, {
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

export const getCustomersMessage = createAsyncThunk(
  "chat/getCustomersMessage",
  async (customerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/chat/seller/getCustomersMessage/${customerId}`,
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

export const sendMessageSellerToCustomer = createAsyncThunk(
  "chat/sendMessageSellerToCustomer",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/chat/seller/sendMessageSellerToCustomer",
        info
      );

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSeller = createAsyncThunk(
  "chat/getSeller",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/admin/getSeller`, {
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


export const sendMessageSellerToAdmin = createAsyncThunk(
  "chat/sendMessageSellerToAdmin",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/chat/admin/sendMessageSellerToAdmin",
        info
      );

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAdminMessage = createAsyncThunk(
  "chat/getAdminMessage",
  async (receverId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/chat/admin/getAdminMessage/${receverId}`,
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


export const getSellerMessage = createAsyncThunk(
  "chat/getSellerMessage",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/chat/admin/getSellerMessage`,
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

export const chatReducer = createSlice({
  name: "chat",
  initialState: {
    successMessage: "",
    errorMessage: "",
    customers: [],
    messages: [],
    activeCustomer: [],
    activeSeller: [],
    messageNotification: [],
    activeAdmin: "",
    friends: [],
    sellerAdminMessage: [],
    currentSeller: {},
    currentCustomer: {},
 
 
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    updateMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
    updateCustomer: (state, { payload }) => {
      state.activeCustomer = payload;
    },
     updateSellers: (state, { payload }) => {
      state.activeSeller = payload;
    },
    updateAdminMessage: (state, { payload }) => {
      state.sellerAdminMessage = [...state.sellerAdminMessage, payload];
    },
      updateSellerMessage: (state, { payload }) => {
      state.sellerAdminMessage = [...state.sellerAdminMessage, payload];
    },

    activeStatusUpdate : (state, { payload }) => {
      state.activeAdmin = payload.status
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getCustomers.fulfilled, (state, { payload }) => {
        state.customers = payload.customers;
      })

      .addCase(getCustomersMessage.fulfilled, (state, { payload }) => {
        state.messages = payload.messages;
        state.currentCustomer = payload.currentCustomer;
      })

      .addCase(sendMessageSellerToCustomer.fulfilled, (state, { payload }) => {
        let tempFriends = state.customers;
        let index = tempFriends.findIndex(
          (f) => f.fdId === payload.message.receverId
        );
        while (index > 0) {
          let temp = tempFriends[index];
          tempFriends[index] = tempFriends[index - 1];
          tempFriends[index - 1] = temp;
          index--;
        }
        state.customers = tempFriends;
        state.messages = [...state.messages, payload.message];
        state.successMessage = "message send success";
      })

      .addCase(getSeller.fulfilled, (state, { payload }) => {
        state.seller = payload.seller;
         
      })

        .addCase(sendMessageSellerToAdmin.fulfilled, (state, { payload }) => {
        state.sellerAdminMessage =  [...state.sellerAdminMessage, payload.message];  
        state.successMessage = "message send success";
         
      })


      .addCase(getAdminMessage.fulfilled, (state, { payload }) => {
        state.sellerAdminMessage =   payload.messages;
        state.currentSeller = payload.currentSeller
         
      })

        .addCase(getSellerMessage.fulfilled, (state, { payload }) => {
        state.sellerAdminMessage =   payload.messages;
   
         
      })


  },
});

export const { messageClear, updateMessage, updateCustomer ,updateSellers ,updateAdminMessage , updateSellerMessage ,activeStatusUpdate } =
  chatReducer.actions;
export default chatReducer.reducer;
