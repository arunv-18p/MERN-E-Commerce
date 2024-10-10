import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subTotal: 0,
  totalPrice: 0,
  discount: 0,
  deliveryCharge: 0,
  cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
};

export const ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART";
export const REMOVE_ITEM_FROM_CART = "REMOVE_ITEM_FROM_CART";
export const DELETE_ITEM_FROM_CART = "DELETE_ITEM_FROM_CART";

export const UPDATE_CART_ITEMS_PRICE = "UPDATE_CART_ITEMS_PRICE";

const getCartItemPrices = (state) => {
  const { cartItems } = state;
  let subTotalTemp = 0.00;
  let discountTemp = 0.00;
  cartItems.forEach((cartItem) => {
    subTotalTemp += parseFloat(cartItem.price) * (cartItem.quantity);
    discountTemp += (parseFloat((cartItem.discountPercentage * cartItem.price) / 100) * cartItem.quantity);
  });
  const subTotal = subTotalTemp;
  const discount = cartItems.length > 0 ? +discountTemp.toFixed(2) : 0.00;
  const deliveryCharge = cartItems.length > 0 ? 40 : 0.00;
  const totalPriceTemp= cartItems.length > 0 ? (subTotal - discount) + deliveryCharge : 0.00;
  const totalPrice = totalPriceTemp > 0 ? +totalPriceTemp.toFixed(2) : 0;
  return { subTotal, discount, deliveryCharge, totalPrice }
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ADD_ITEM_TO_CART, (state, action) => {
      const isItemExist = state.cartItems.find((item) => {
        return item.id === action.payload.id;
      });
      const cartItem = {
        ...action.payload,
        quantity: isItemExist ? isItemExist.quantity + 1 : 1,
      };
      const cartItems = isItemExist ? state.cartItems.map((item) => (item.id === cartItem.id ? cartItem : item)) : [...state.cartItems, cartItem];

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, ...getCartItemPrices(state), cartItems };
    });
    builder.addCase(REMOVE_ITEM_FROM_CART, (state, action) => {
      const isItemExist = state.cartItems.find((item) => {
        return item.id === action.payload.id;
      });
      const cartItem = {
        ...action.payload,
        quantity: isItemExist.quantity - 1,
      };
      const cartItems =
        cartItem.quantity < 1
          ? state.cartItems.filter((item) => item.id !== action.payload.id)
          : state.cartItems.map((item) => (item.id === cartItem.id ? cartItem : item));
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, ...getCartItemPrices(state), cartItems };
    });
    builder.addCase(DELETE_ITEM_FROM_CART, (state, action) => {
      const cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, ...getCartItemPrices(state), cartItems };
    });
    builder.addCase(UPDATE_CART_ITEMS_PRICE, (state) => {
      return { ...state, ...getCartItemPrices(state) }
    })
  },
});

export const getCartSlice = (state) => state.cartSlice;

export default cartSlice.reducer;
