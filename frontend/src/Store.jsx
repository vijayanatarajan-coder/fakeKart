import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import productsReducer from "./Slices/ProductsSlice";
import productReducer from "./Slices/ProductSlice";

const reducer = combineReducers({
  productsState: productsReducer,
  productState: productReducer,
});
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
