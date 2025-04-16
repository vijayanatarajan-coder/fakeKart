import axios from "axios";
import {
  productFail,
  productRequest,
  productSuccess,
  newProductFail,
  newProductRequest,
  newProductSuccess,
  deleteProductFail,
  deleteProductRequest,
  deleteProductSuccess,
  updateProductFail,
  updateProductRequest,
  updateProductSuccess,
} from "../Slices/ProductSlice";

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch(productRequest());

    const { data } = await axios.get(
      `http://localhost:8000/api/v1/product/${id}`
    );

    if (data.success) {
      dispatch(productSuccess(data.product));
    } else {
      dispatch(productFail("Failed to fetch product"));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(productFail(errorMessage));
  }
};

export const createNewProduct = (productData) => async (dispatch) => {
  try {
    dispatch(newProductRequest());
    const accessToken = sessionStorage.getItem("googleToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const { data } = await axios.post(
      `http://localhost:8000/api/v1/admin/product/new`,
      productData,
      config
    );

    if (data.success) {
      dispatch(newProductSuccess(data.product));
    } else {
      dispatch(newProductFail("Failed to create product"));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(newProductFail(errorMessage));
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());
    const accessToken = sessionStorage.getItem("googleToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const { data } = await axios.delete(
      `http://localhost:8000/api/v1/admin/product/${id}`,
      config
    );

    if (data.success) {
      dispatch(deleteProductSuccess(id));
    } else {
      dispatch(deleteProductFail("Failed to create product"));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(deleteProductFail(errorMessage));
  }
};

export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch(updateProductRequest());
    const accessToken = sessionStorage.getItem("googleToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const { data } = await axios.put(
      `http://localhost:8000/api/v1/admin/product/${id}`,
      productData,
      config
    );

    if (data.success) {
      dispatch(updateProductSuccess(data.product));
    } else {
      dispatch(updateProductFail("Failed to create product"));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    dispatch(updateProductFail(errorMessage));
  }
};
