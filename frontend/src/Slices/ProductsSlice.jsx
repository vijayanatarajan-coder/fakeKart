import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  products: [],
  productsCount: 0,
  resPerPage: 0,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsRequest(state) {
      state.loading = true;
    },
    productsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload.products || [];
      state.productsCount = action.payload.productsCount || 0;
      state.resPerPage = action.payload.resPerPage || 3;
      state.error = null;
    },
    productsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    adminProductsRequest(state) {
      state.loading = true;
    },
    adminProductsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload.products || [];
    },
    adminProductsFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

const { actions, reducer } = productsSlice;

export const {
  productsRequest,
  productsSuccess,
  productsFail,
  adminProductsFail,
  adminProductsRequest,
  adminProductsSuccess,
  clearError,
} = actions;

export default reducer;
