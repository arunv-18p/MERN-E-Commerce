import { Link, useNavigate, useParams } from "react-router-dom";

import PageLayout from "../../../components/page-layout/PageLayout";
import PricingCard from "../../../components/cart/pricing-card/PricingCard";
import CheckoutStepper from "../../../components/checkout/checkout-stepper/CheckoutStepper";
import ReviewCartItem from "../../../components/checkout/review-cart-item/ReviewCartItem";
import { FaCcVisa } from "react-icons/fa";

import { useSelector } from "react-redux";
import { getCartSlice } from "../../../features/cartSlice";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { UPDATE_CART_ITEMS_PRICE } from "../../../features/cartSlice";
import { getUserSlice } from "../../../features/userSlice";

import Loader from "../../../components/loader/Loader";
import { createOrder, getOrderSlice, RESET_ORDER_SUCCESS } from "../../../features/orderSlice";

function ConfirmCheckout() {
  const dispatch = useDispatch();
  const { cartItems, totalPrice, subTotal, discount, deliveryCharge } = useSelector(getCartSlice);
  const { currentUser, loading } = useSelector(getUserSlice);
  const { orderSuccess } = useSelector(getOrderSlice);
  const [paymentType, setPaymentType] = useState("card");
  const navigate = useNavigate();
  const [billingDetails, setBillingDetails] = useState({
    userRef: "",
    firstName: "",
    lastName: "",
    phCode: "",
    phoneNumber: "",
    emailAddress: "",
    state: "",
    country: "",
    address: "",
    postalCode: "",
  });
  const [cardDetails, setCardDetails] = useState({
    brand: "",
    last4: "",
    exp_year: "",
    exp_month: "",
  });
  useEffect(() => {
    dispatch({ type: UPDATE_CART_ITEMS_PRICE });

    // Billing Details
    const billingDetailsTemp = JSON.parse(localStorage.getItem("billingDetails"));
    billingDetailsTemp && setBillingDetails({ ...billingDetailsTemp });
    // Card Details
    const cardDetailsTemp = JSON.parse(localStorage.getItem("cardDetails"));
    cardDetailsTemp && setCardDetails({ ...cardDetailsTemp });
    // Payment Type
    const paymentTypeTemp = JSON.parse(localStorage.getItem("paymentType"));
    paymentTypeTemp && setPaymentType(paymentTypeTemp);

    if (orderSuccess) {
      navigate("/checkout/checkout-success");
      dispatch({ type: RESET_ORDER_SUCCESS });
    }
  }, [dispatch, currentUser, orderSuccess, navigate]);
  const handleConfirmCheckout = (e) => {
    e.preventDefault();
    const orderItems = cartItems.map((cartItem) => {
      const { id, title, price, quantity } = cartItem;
      return { _id: id, title, price, quantity };
    });
    const { userRef, ...otherBillingDetails } = billingDetails;
    const prices = { totalPrice, subTotal, discount, deliveryCharge };
    const order = {
      orderItems,
      userRef,
      prices,
      paymentType,
      cardDetails,
      billingDetails: otherBillingDetails,
    };
    dispatch(createOrder(order));
  };
  return (
    <PageLayout>
      {currentUser === null || loading ? (
        <Loader />
      ) : (
        <div className="container py-4">
          <div className="row">
            <div className="col-md-12">
              <CheckoutStepper step={3} />
            </div>
          </div>
          <div className="row g-3">
            <div className="col-lg-8">
              <div className="card border-0 shadow">
                <div className="card-body">
                  <h4 className="fw-semibold mb-3">Items in cart</h4>
                  <div className="row row-cols-1 row-cols-md-2 g-3">
                    {cartItems.map((cartItem, key) => {
                      return (
                        <div className="col" key={key}>
                          <ReviewCartItem cartItem={cartItem} />
                        </div>
                      );
                    })}
                  </div>
                  <hr className="text-muted" />
                  <div className="row g-3">
                    <div className="col-md-6">
                      <h4 className="fw-semibold">Billing Details</h4>
                      <div className="vstack text-dark small">
                        <span>
                          {billingDetails.firstName} {billingDetails.lastName}
                        </span>
                        <span>{billingDetails.emailAddress}</span>
                        <span>
                          {billingDetails.phCode} {billingDetails.phoneNumber}
                        </span>
                        <span>{billingDetails.address}</span>
                        <span>{billingDetails.postalCode}</span>
                        <span>{billingDetails.state}</span>
                        <span>{billingDetails.country}</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h4 className="fw-semibold">Payment Method</h4>
                      <div className="d-flex gap-3 text-success">
                        <span className="fw-bold">{cardDetails.brand === "visa" && <FaCcVisa />}</span>
                        <div className="vstack small text-muted">
                          <span>XXXX-XXXX-XXXX-{cardDetails.last4}</span>
                          <span>
                            Exp: {cardDetails.exp_month}/{cardDetails.exp_year}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <PricingCard pricingOnly prices={{ totalPrice, subTotal, deliveryCharge, discount }}>
                <div className="mt-3 d-grid gap-2">
                  <button className="btn btn-primary" onClick={handleConfirmCheckout}>
                    Confirm
                  </button>
                  <Link to="/checkout/payment">
                    <span className="btn btn-outline-primary">Return</span>
                  </Link>
                </div>
              </PricingCard>
            </div>
          </div>
          <br />
          <br />
          <br />
        </div>
      )}
    </PageLayout>
  );
}

export default ConfirmCheckout;
