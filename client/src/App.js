import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./features/userSlice";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import ProductDetails from "./pages/product-details/ProductDetails";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/register/Register";
import ForgotPassword from "./pages/auth/forgotPassword/ForgotPassword";
import CartItems from "./pages/user/cart-items/CartItems";
import UserProfile from "./pages/user/user-profile/UserProfile";
import FavoriteList from "./pages/user/favorite-list/FavoriteList";
import CurrentOrders from "./pages/user/current-orders/CurrentOrders";
import ConfirmCheckout from "./pages/checkout/confirm-checkout/ConfirmCheckout";
import CheckoutSuccess from "./pages/checkout/checkout-success/CheckoutSuccess";
import DeliveryInfo from "./pages/checkout/delivery-info/DeliveryInfo";

import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import AdminProductList from "./pages/admin/admin-product-list/AdminProductList";
import AdminUserList from "./pages/admin/admin-user-list/AdminUserList";
import AdminProductHandler from "./pages/admin/admin-product-handler/AdminProductHandler";

import Payment from "./pages/checkout/payment/Payment";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/products" Component={Products} />
          <Route path="/products/:id" Component={ProductDetails} />
          <Route path="/auth/login" Component={Login} />
          <Route path="/auth/register" Component={Register} />
          <Route path="/auth/forgot-password" Component={ForgotPassword} />
          <Route path="/users/me" Component={UserProfile} />
          <Route path="/users/me/cart-items" Component={CartItems} />
          <Route path="/users/me/favorite-list" Component={FavoriteList} />
          <Route path="/users/me/current-orders" Component={CurrentOrders} />
          <Route path="/checkout/delivery-info" Component={DeliveryInfo} />
          <Route path="/checkout/confirm-checkout" Component={ConfirmCheckout} />
          <Route path="/checkout/checkout-success" Component={CheckoutSuccess} />
          <Route path="/checkout/payment" Component={Payment} />
          <Route
            path="/admin/product/edit/:id"
            element={
              <ProtectedRoute>
                <AdminProductHandler handleType="edit" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/product/new"
            element={
              <ProtectedRoute>
                <AdminProductHandler handleType="add" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/product-list"
            element={
              <ProtectedRoute>
                <AdminProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/user-list"
            element={
              <ProtectedRoute>
                <AdminUserList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
