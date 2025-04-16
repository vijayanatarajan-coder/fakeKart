import axios from "axios";
import {
  productsFail,
  productsRequest,
  productsSuccess,
  adminProductsFail,
  adminProductsRequest,
  adminProductsSuccess,
} from "../Slices/ProductsSlice";

export const getProducts = (currentPage, resPerPage) => async (dispatch) => {
  try {
    dispatch(productsRequest());

    const { data } = await axios.get(
      `http://localhost:8000/api/v1/products?page=${currentPage}&limit=${resPerPage}`
    );

    if (data?.products?.length && data.count >= 0) {
      dispatch(
        productsSuccess({
          products: data.products,
          productsCount: data.count,
          resPerPage: data.resPerPage,
        })
      );
    } else {
      dispatch(productsFail("Failed to fetch products"));
    }
  } catch (error) {
    dispatch(
      productsFail(error.response?.data?.message || "Something went wrong")
    );
  }
};

export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch(adminProductsRequest());
    const accessToken = sessionStorage.getItem("googleToken");
    const { data } = await axios.get(
      `http://localhost:8000/api/v1/admin/products`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (data.success) {
      dispatch(adminProductsSuccess({ products: data.products }));
    } else {
      console.error("API Failed Response:", data);
      dispatch(adminProductsFail("Failed to fetch products"));
    }
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    dispatch(
      adminProductsFail(error.response?.data?.message || "Something went wrong")
    );
  }
};
