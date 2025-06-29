import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { messageClear } from "./cardReducer";

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (__, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/getCategorys");

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (__, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/getProducts");

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (slug, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/getProductDetails/${slug}`);

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

export const priceRangeProduct = createAsyncThunk(
  "product/priceRangeProduct",
  async (__, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/home/priceRangeProduct");

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);



export const queryProducts = createAsyncThunk(
  "product/queryProducts",
  async (query, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get( `/home/queryProducts?category=${query.category}&&rating=${query.rating}&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${query.sortPrice}&&pageNumber=${query.pageNumber}&&searchValue=${query.searchValue ? query.searchValue : '' } ` );

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);


export const customerReview = createAsyncThunk(
  "review/customerReview",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/customerReview" , info);

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);


export const getCustomerReview = createAsyncThunk(
  "review/getCustomerReview",
  async ({productId , pageNumber }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/getCustomerReview/${productId}?pageNo=${pageNumber}` );

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);


export const getHomeBanner = createAsyncThunk(
  "product/getHomeBanner",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/getHomeBanner');

      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);



export const homeReducer = createSlice({
  name: "home",
  initialState: {
    categorys: [],
    products: [],
    totalProduct: 0,
    parPage: 0 ,
    latestProducts: [],
    topRatedProducts: [],
    discountProducts: [],
    priceRange: {
      low: 0,
      high: 3000,
    },
    product: {},
    relatedProducts: [],
    moreProducts: [],
    successMessage: '',
    errorMessage: '',
    reviews: [] , 
    totalReview: 0 , 
    ratingReview: [],
    banners: []
  },
  reducers: {
    clearMessages : (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.fulfilled, (state, action) => {
        state.categorys = action.payload.categorys;
      })
      .addCase(getCategory.rejected, (state, action) => {
        console.error("Fetching categories failed:", action.payload);
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.products = action.payload.products || [];
        state.latestProducts = action.payload.latestProducts || [];
        state.topRatedProducts = action.payload.topRatedProducts || [];
        state.discountProducts = action.payload.discountProducts || [];
      })
      .addCase(getProduct.rejected, (state, action) => {
        console.error("Fetching products failed:", action.payload);
      })

      .addCase(priceRangeProduct.fulfilled, (state, action) => {
        state.latestProducts = action.payload.latestProducts || [];
        state.priceRange = action.payload.priceRange || [];
      })
      .addCase(priceRangeProduct.rejected, (state, action) => {
        console.error("Fetching products failed:", action.payload);
      })
         .addCase(queryProducts.fulfilled, (state, action) => {
        state.products = action.payload.products || [];
        state.totalProduct = action.payload.totalProduct || [];
        state.parPage = action.payload.parPage || [];
      })

      .addCase(queryProducts.rejected, (state, action) => {
        console.error("Fetching products failed:", action.payload);
      })

      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.product = action.payload.product || [];
        state.relatedProducts = action.payload.relatedProducts || [];
        state.moreProducts = action.payload.moreProducts || [];
        
      })

      .addCase(customerReview.fulfilled, (state, action) => {
        state.successMessage = action.payload.message 
      })

      .addCase(getCustomerReview.fulfilled, (state, action) => {
        state.reviews = action.payload.reviews 
        state.totalReview = action.payload.totalReview 
        state.ratingReview = action.payload.ratingReview 
      })

      .addCase(getHomeBanner.fulfilled, (state, action) => {
        state.banners = action.payload.banners 
        
      })


  },
});
export const { clearMessages  } = homeReducer.actions;
export default homeReducer.reducer;
