import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import api from "../../api/api";

export const addCustomerFriend = createAsyncThunk(
  "chat/addCustomerFriend",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/chat/customer/addCustomerFriend", info);

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);


export const sendMessageCustomerToSeller = createAsyncThunk(
  "chat/sendMessageCustomerToSeller",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/chat/customer/sendMessageCustomerToSeller", info);

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const chatReducer = createSlice({
  name: "chat",
  initialState: {
    my_friends: [],
    fd_messages: [],
    currentFd: "",
    successMessage: "",
    errorMessage: ""
  },

  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    updateMessage: (state , {payload}) => {
      state.fd_messages = [...state.fd_messages , payload]
    }
  },
  extraReducers: (builder) => {

    builder
    
    .addCase(addCustomerFriend.fulfilled, (state, { payload }) => {
      state.fd_messages = payload.messages
      state.currentFd = payload.currentFd
      state.my_friends = payload.myFriends
       
    })

     .addCase(sendMessageCustomerToSeller.fulfilled, (state, { payload }) => {
     let tempFriends = state.my_friends
     let index = tempFriends.findIndex(f => f.fdId === payload.message.receverId  )
     while(index > 0) {
      let temp = tempFriends[index]
      tempFriends[index] = tempFriends[index - 1]
      tempFriends[index - 1] = temp
      index--
     }
     state.my_friends = tempFriends
     state.fd_messages = [...state.fd_messages, payload.message];
     state.successMessage = 'message send success'
       
     
    })


  },
});

export const { messageClear  ,updateMessage } = chatReducer.actions;
export default chatReducer.reducer;
