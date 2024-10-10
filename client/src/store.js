import { configureStore } from "@reduxjs/toolkit"
import productSlice from "./features/productSlice"
import userSlice from "./features/userSlice";
import cartSlice from "./features/cartSlice";
import orderSlice from "./features/orderSlice"

const store = configureStore({
    reducer: {
        productSlice,
        userSlice,
        cartSlice,
        orderSlice
    }
});

export default store;