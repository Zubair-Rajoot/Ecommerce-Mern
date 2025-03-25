import { configureStore } from "@reduxjs/toolkit";
import {productReducer, productDetailsReducer } from "./slices/productSlice";
import { userReducer } from "./slices/userSlice";

const store = configureStore({
  reducer: {
    products: productReducer, 
    productDetails: productDetailsReducer,
    user: userReducer

    
  },

  
});

export default store;
