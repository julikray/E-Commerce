import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const addToCard = createAsyncThunk(
  "card/addToCard",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/product/addToCard", info);

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCardProducts = createAsyncThunk(
  "card/getCardProducts",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/product/getCardProducts/${userId}`);

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCardProduct = createAsyncThunk(
  "card/deleteCardProduct",
  async (cardId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/product/deleteCardProduct/${cardId}`
      );

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const quantityInc = createAsyncThunk(
  "card/quantityInc",
  async (cardId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantityInc/${cardId}`);

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const quantityDec = createAsyncThunk(
  "card/quantityDec",
  async (cardId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantityDec/${cardId}`);

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/product/addToWishlist", info);

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getWishlistProducts = createAsyncThunk(
  "wishlist/getWishlistProducts",
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/product/getWishlistProducts/${userId}`
      );

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeWishlistProducts = createAsyncThunk(
  "wishlist/removeWishlistProducts",
  async (wishlistId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/product/removeWishlistProducts/${wishlistId}`
      );

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);









export const cardReducer = createSlice({
  name: "card",
  initialState: {
    cardProducts: [],
    cardProductsCount: 0,
    buyProductItem: 0,
    wishlistCount: 0,
    wishlist: [],
    price: 0,
    errorMessage: "",
    successMessage: "",
    shippingFee: 0,
    outOfStockProducts: [],
  },

  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(addToCard.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
      })

      .addCase(addToCard.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.cardProductsCount = state.cardProductsCount + 1;
      })

      .addCase(getCardProducts.fulfilled, (state, { payload }) => {
        state.cardProducts = payload.cardProduct;
        state.price = payload.price;
        state.cardProductsCount = payload.cardProductsCount;
        state.shippingFee = payload.shippingFee;
        state.outOfStockProducts = payload.outOfStockProducts;
        state.buyProductItem = payload.buyProductItem;
      })

      .addCase(deleteCardProduct.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })

      .addCase(quantityInc.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })

      .addCase(quantityDec.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
      })

      .addCase(addToWishlist.rejected, (state, { payload }) => {
        state.errorMessage = payload.error;
      })

      .addCase(addToWishlist.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message;
        state.wishlistCount =
          state.wishlistCount > 0 ? state.wishlistCount + 1 : 1;
      })

      .addCase(getWishlistProducts.fulfilled, (state, { payload }) => {
        state.wishlist = payload.wishlists;
        state.wishlistCount = payload.wishlistCount;
      })

       .addCase(removeWishlistProducts.fulfilled, (state, { payload }) => {
        state.successMessage = payload.message
        state.wishlist = state.wishlist.filter(p => p._id !== payload.wishlistId ) ;
        state.wishlistCount = state.wishlistCount - 1;
      })

  },
});

export const { messageClear } = cardReducer.actions;
export default cardReducer.reducer;
