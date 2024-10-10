import React, { useEffect, useState } from "react";
import PageLayout from "../../../components/page-layout/PageLayout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { axiosInstance } from "../../../configs/axios";
import { useDispatch } from "react-redux";

import CheckoutStepper from "../../../components/checkout/checkout-stepper/CheckoutStepper";
import PricingCard from "../../../components/cart/pricing-card/PricingCard";
import { useSelector } from "react-redux";
import { getCartSlice, UPDATE_CART_ITEMS_PRICE } from "../../../features/cartSlice";
import PaymentForm from "../../../components/payment-form/PaymentForm";
import Loader from "../../../components/loader/Loader";

const Payment = () => {
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState("");
  const [stripeClientSecret, setStripeClientSecret] = useState("");
  const { totalPrice, subTotal, discount, deliveryCharge } = useSelector(getCartSlice);

  useEffect(() => {
    dispatch({ type: UPDATE_CART_ITEMS_PRICE });
    async function getStripApiKey() {
      const { data } = await axiosInstance.get("/api/v1/payment/public/key");
      setStripeApiKey(data.stripeApiKey);
    }
    async function getClientSecret(totalAmount) {
      const { data } = await axiosInstance.post(
        "/api/v1/payment/process",
        {
          amount: parseFloat(totalAmount),
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setStripeClientSecret(data.client_secret);
    }
    getStripApiKey();
    console.log(totalPrice)
    getClientSecret(totalPrice * 100 || 0.00);
  }, [dispatch, totalPrice]);
  const options = {
    // passing the client secret obtained from the server
    clientSecret: stripeClientSecret,
  };
  return (
    <PageLayout>
      {!stripeApiKey || !stripeClientSecret ? (
        <Loader />
      ) : (
        <Elements stripe={loadStripe(stripeApiKey)} options={options}>
          <div className="container py-4">
            <div className="row">
              <div className="col-md-12">
                <CheckoutStepper step={2} />
              </div>
            </div>
            <div className="row g-3">
              <div className="col-lg-8">
                <div className="card border-0 shadow">
                  <div className="card-body">
                    <h4 className="fw-semibold mb-3">Payment Method</h4>
                    <PaymentForm />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <PricingCard pricingOnly prices={{ totalPrice, subTotal, deliveryCharge, discount }} />
              </div>
            </div>
            <br />
            <br />
            <br />
          </div>
        </Elements>
      )}
    </PageLayout>
  );
};

export default Payment;
