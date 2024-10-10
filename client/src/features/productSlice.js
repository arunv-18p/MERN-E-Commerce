import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../configs/axios";
import { getSplitItems } from "../utils/ArrayUtils";

const initialState = {
  products: [],
  product: null,
  loading: false,
  categories: [],
  brands: [],
  totalProducts: 0,
  featureProducts: [],
  splitProducts: [],
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axiosInstance.get("api/v1/products");
  return response.data.products;
});

export const fetchProductById = createAsyncThunk("products/fetchProductById", async (id) => {
  const response = await axiosInstance.get(`/api/v1/products/${id}`);
  return response.data.product;
});

export const deleteProductById = createAsyncThunk("/products/deleteProductById", async (productId) => {
  const response = await axiosInstance.delete(`/api/v1/products/admin/delete/${productId}`);
  return response.data.product;
});

export const updateProductById = createAsyncThunk("/products/updateProductById", async (product) => {
  const response = await axiosInstance.put(`/api/v1/products/admin/update/${product._id}`, product, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data.product;
});

export const addProductToDB = createAsyncThunk("products/addProductToDB", async (product) => {
  const response = await axiosInstance.post(`/api/v1/products/admin/new`, product, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data.product;
});

const getFeatureProducts = (products) => {
  const featureProducts = products.reduce((acc, curr) => {
    acc[curr.category] = curr;
    return acc;
  }, {});
  return featureProducts;
};

const getCategories = (products) => {
  return [...new Set(products.map((product) => product.category))];
};

const getBrands = (products) => {
  return [...new Set(products.map((product) => product.brand))];
};

export const SEARCH_PRODUCTS = "SEARCH_PRODUCTS";
export const FILTER_PRODUCTS = "FILTER_PRODUCTS";

const searchProducts = (searchQuery, products) => {
  const newProducts = products.filter((product) => {
    return (
      (product.title && product.title.toLowerCase().includes(searchQuery)) ||
      (product.category && product.category.toLowerCase().includes(searchQuery)) ||
      (product.description && product.description.toLowerCase().includes(searchQuery)) ||
      (product.brand && product.brand.toLowerCase().includes(searchQuery)) ||
      (product.sku && product.sku.toLowerCase().includes(searchQuery))
    );
  });
  return newProducts;
};

const filterProducts = (filter, products) => {
  const { minPrice, maxPrice, filterBrands, filterCategories } = filter;
  const tempProducts = products;
  if (filterBrands.includes("All") || filterCategories.includes("All")) return tempProducts;
  const newProducts = tempProducts.filter((product) => {
    return (
      (product.price && product.price > parseInt(minPrice) && product.price < parseInt(maxPrice)) ||
      (product.brand && filterBrands.map(item => item.toLowerCase()).includes(product.brand.toLowerCase())) ||
      (product.category && filterCategories.map(item => item.toLowerCase()).includes(product.category.toLowerCase()))
    );
  });
  return newProducts;
};

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SEARCH_PRODUCTS, (state, action) => {
      const products = searchProducts(action.payload, state.products);
      state.splitProducts = getSplitItems(products, 10);
      state.loading = false;
    });

    builder.addCase(FILTER_PRODUCTS, (state, action) => {
      const products = filterProducts(action.payload, state.products);
      state.splitProducts = getSplitItems(products, 10);
      state.loading = false;
    });

    // getAllProducts - /api/v1/products
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.featureProducts = getFeatureProducts(action.payload);
      state.totalProducts = action.payload.length;
      state.categories = getCategories(action.payload);
      state.brands = getBrands(action.payload);
      state.splitProducts = getSplitItems(action.payload, 10);
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // getProductById - /api/v1/products/:id
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // deleteProductById - /api/v1/products/admin/delete/:id
    builder.addCase(deleteProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProductById.fulfilled, (state, action) => {
      const products = state.products.filter((product) => product._id !== action.payload._id);
      state.loading = false;
      state.products = products;
      state.splitProducts = getSplitItems(products, 10);
    });
    builder.addCase(deleteProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // updateProductById - /api/v1/products/admin/update/:id
    builder.addCase(updateProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProductById.fulfilled, (state, action) => {
      const products = state.products.map((product) => (product._id === action.payload._id ? action.payload : product));
      state.product = action.payload;
      state.products = products;
      state.splitProducts = getSplitItems(products, 10);
      state.loading = false;
    });
    builder.addCase(updateProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const getProductSlice = (state) => state.productSlice;

export default productSlice.reducer;
