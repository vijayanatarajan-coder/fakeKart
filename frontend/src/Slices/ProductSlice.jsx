import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  products: [],
  error: null,
  isProductCreated: false,
  isProductDeleted: false,
  isProductUpdated: false,
  isReviewSubmitted: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productRequest(state) {
      state.loading = true;
      state.error = null;
    },
    productSuccess(state, action) {
      state.loading = false;
      state.product = action.payload;
      state.error = null;
    },
    productFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    newProductRequest(state) {
      state.loading = true;
      state.error = null;
    },
    newProductSuccess(state, action) {
      state.loading = false;
      state.product = action.payload;
      state.isProductCreated = true;
    },
    newProductFail(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isProductCreated = false;
    },
    clearProductCreated(state) {
      state.isProductCreated = false;
    },
    clearError(state) {
      state.error = null;
    },
    deleteProductRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deleteProductSuccess(state, action) {
      state.loading = false;
      state.isProductDeleted = true;
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    deleteProductFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearProductDeleted(state) {
      state.isProductDeleted = false;
    },
    updateProductRequest(state) {
      state.loading = true;
      state.error = null;
    },
    updateProductSuccess(state, action) {
      state.loading = false;
      state.product = action.payload;
      state.isProductUpdated = true;
    },
    updateProductFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearProductupdated(state) {
      state.isProductUpdated = false;
    },
  },
});

export const {
  productRequest,
  productSuccess,
  productFail,
  newProductFail,
  newProductRequest,
  newProductSuccess,
  clearProductCreated,
  clearError,
  deleteProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  clearProductDeleted,
  updateProductFail,
  updateProductRequest,
  updateProductSuccess,
  clearProductupdated,
} = productSlice.actions;

export default productSlice.reducer;
