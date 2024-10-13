import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../configs/axios";
import { getSplitItems } from "../utils/ArrayUtils";

const initialState = {
  loading: false,
  orderSuccess: false,
  userOrders: [],
  userSplitOrders: []
};

export const createOrder = createAsyncThunk("orders/createOrder", async (orderDetails) => {
  const response = await axiosInstance.post("/api/v1/users/me/orders/new", orderDetails, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response.data.order;
});

export const getMyOrders = createAsyncThunk("orders/getMyOrders", async () => {
  const response = await axiosInstance.get("/api/v1/users/me/orders", {
    withCredentials: true,
  });
  return response.data.orders;
});

export const RESET_ORDER_SUCCESS = 'RESET_ORDER_SUCCESS'

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // createOrder - /api/v1/users/me/orders/new
    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
      state.orderSuccess = false;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.orderSuccess = action.payload != null;
      state.loading = false;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.orderSuccess = false;
      state.userOrders = [];
    });

    // reset orders
    builder.addCase(RESET_ORDER_SUCCESS, (state) => {
        state.orderSuccess = false;
    })

    // getMyOrders - /api/v1/users/me/orders
    builder.addCase(getMyOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMyOrders.fulfilled, (state, action) => {
      state.userOrders = action.payload;
      state.userSplitOrders = getSplitItems(action.payload, 10);
      state.loading = false;
    });
    builder.addCase(getMyOrders.rejected, (state, action) => {
      state.loading = false;
      state.userOrders = [];
    });
  },
});

export const getOrderSlice = (state) => state.orderSlice;

export default orderSlice.reducer;
