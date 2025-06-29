import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const addBanner = createAsyncThunk(
  "banner/addBanner",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/addBanner", info, {
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

export const updateBanner = createAsyncThunk(
  "banner/updateBanner",
  async ({ bannerId, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/updateBanner/${bannerId}`, info, {
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

export const getBanner = createAsyncThunk(
  "banner/getBanner",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/getBanner/${productId}`, {
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

export const bannerReducer = createSlice({
  name: "banner",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    banners: [],
    banner: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(addBanner.pending, (state, { payload }) => {
        state.loader = true;
      })

      .addCase(addBanner.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })

      .addCase(addBanner.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.banner = payload.banner;
      })

      .addCase(getBanner.fulfilled, (state, { payload }) => {
        state.banner = payload.banner;
      })

      .addCase(updateBanner.pending, (state, { payload }) => {
        state.loader = true;
      })

      .addCase(updateBanner.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })

      .addCase(updateBanner.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.banner = payload.banner;
      });
  },
});
export const { messageClear } = bannerReducer.actions;
export default bannerReducer.reducer;
