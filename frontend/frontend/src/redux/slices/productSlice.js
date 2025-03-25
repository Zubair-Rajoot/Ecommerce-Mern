import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// export const fetchProducts = createAsyncThunk("products/fetch", async (keyword = "", currentPage=1 ) => {
//   const response = await axios.get(`http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}`);
//   return response.data;
// });


export const fetchProducts = createAsyncThunk("products/fetch", async ({ keyword = "", currentPage = 1, price=[0, 25000], category, ratings=0 }) => {


  let link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}
  &price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

  if(category){
     link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`

  }
  const response = await axios.get(link);
  return response.data;
});




// Get product details
export const fetchProductDetails = createAsyncThunk(
  "product/fetch",
  async (id) => {
    const { data } = await axios.get(`http://localhost:4000/api/v1/product/${id}`);
    return data;
  }
);

// Products slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
    productsCount: 0, // Set default value
    resultPerPage: 1,  // Set default value
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        console.log("API Response:", action.payload);
        state.products = action.payload.products;
        state.resultPerPage = action.payload.resultPerPage || 1;
        state.productsCount = action.payload.productCount || 0; // Fix here
        // state.filteredProductsCount = action.payload.filteredProductsCount
    })
    
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

      
  },
});

// Product details slice
const productDetailsSlice = createSlice({
  name: "product",
  initialState: {
    product: {},
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        console.log("API Response:", action.payload);
        state.product = action.payload.product; // ✅ Corrected key
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const productReducer = productSlice.reducer;
export const productDetailsReducer = productDetailsSlice.reducer;
