import { FaTruck } from "react-icons/fa";
import CartItemRow from "../../../components/cart/cart-item-row/CartItemRow";
import PricingCard from "../../../components/cart/pricing-card/PricingCard";
import PageLayout from "../../../components/page-layout/PageLayout";
import { useDispatch, useSelector } from "react-redux";
import { getProductSlice } from "../../../features/productSlice";
import { getCartSlice, UPDATE_CART_ITEMS_PRICE } from "../../../features/cartSlice";
import { useEffect, useState } from "react";
const CartItems = () => {
  const { products } = useSelector(getProductSlice);
  const { cartItems, loading } = useSelector(getCartSlice);
  const dispatch = useDispatch();
  const { totalPrice, subTotal, discount, deliveryCharge } = useSelector(getCartSlice);
  useEffect(() => {
    dispatch({type: UPDATE_CART_ITEMS_PRICE});
  }, [dispatch, cartItems, discount, totalPrice, subTotal]);
  return (
    <PageLayout>
      <div className="container py-4">
        <div className="row g-3">
          <div className="col-lg-8">
            <div className="card border-0 shadow">
              <div className="card-header bg-white">
                <h5 className="my-2">Shopping Cart</h5>
              </div>
              <div className="card-body p-2">
                {/* <CartItem />
              <hr className="text-muted my-1" />
              <CartItem />
              <hr className="text-muted my-1" />
              <CartItem /> */}
                <div className="table-responsive">
                  <table className="table table-borderless align-middle mb-0">
                    {/* <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Qty</th>
                      <th scope="col"></th>
                    </tr>
                  </thead> */}
                    <tbody>
                      {cartItems.map((cartItem, key) => {
                        return <CartItemRow cartItem={cartItem} key={key} />;
                      })}
                      {cartItems.length === 0 && <span>Empty Cart</span>}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer p-3">
                <small>
                  <FaTruck className="text-success me-2" />
                  Delivery within 1-2 weeks
                </small>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card mb-3 border-0 shadow">
              <div className="card-body">
                <div className="input-group">
                  <input className="form-control" type="text" placeholder="Coupon code here" />
                  <button type="button" className="btn btn-primary">
                    Apply
                  </button>
                </div>
              </div>
            </div>
            <PricingCard prices={{ totalPrice, subTotal, discount, deliveryCharge }} />
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
    </PageLayout>
  );
};

export default CartItems;
