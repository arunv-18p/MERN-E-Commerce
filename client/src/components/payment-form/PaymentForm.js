import React from "react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PaymentOptionCheck from "../checkout/payment-option-check/PaymentOptionCheck";
import { useSelector } from "react-redux";
import { getCartSlice } from "../../features/cartSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../configs/axios";

const PaymentForm = () => {
  const [paymentOption, setPaymentOption] = useState("card");
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const handlePayment = async (event) => {
    event.preventDefault();
    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    const id = result.paymentIntent.payment_method;
    const paymentMethodResult = await axiosInstance.get(`/api/v1/payment/payment_methods/${id}`);
    const { last4, exp_month, exp_year, brand } = paymentMethodResult.data.paymentMethod.card;
    const cardDetails = {
      last4,
      exp_month,
      exp_year,
      brand,
    };
    localStorage.setItem("cardDetails", JSON.stringify(cardDetails));
    localStorage.setItem("paymentType", JSON.stringify(paymentOption));
    if (result.paymentIntent.status === "succeeded") {
      navigate("/checkout/confirm-checkout");
    }
  };
  return (
    <form className="row g-3">
      <div className="col-md-12">
        <div className="d-flex flex-wrap gap-2">
          <PaymentOptionCheck name="cod" title="Cash on delivery" checked={paymentOption === "cod"} onCheckedChanged={setPaymentOption} />
          <PaymentOptionCheck name="card" title="Card" checked={paymentOption === "card"} onCheckedChanged={setPaymentOption} />
        </div>
      </div>

      {paymentOption === "card" ? (
        <>
          <div className="col-md-12">
            <label className="form-label">Name on card</label>
            <input type="text" className="form-control" />
          </div>

          {/* <div className="col-md-12">
                    <div className="hstack gap-2">
                      <div className="flex-grow-1">
                        <label className="form-label">Card number</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="xxxx-xxxx-xxxx-xxxx"
                        />
                      </div>
                      <div className="flex-shrink-0">
                        <label className="form-label">CVV</label>
                        <input type="text" className="form-control" placeholder="123" size={5} />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row g-2">
                      <div className="col">
                        <label className="form-label">Expiry</label>
                        <select className="form-select">
                          <option>Month</option>
                        </select>
                      </div>
                      <div className="col mt-auto">
                        <input type="text" className="form-control" placeholder="Year" />
                      </div>
                    </div>
                  </div> */}

          <PaymentElement />
        </>
      ) : (
        <>
          <h5 className="text-muted text-center mt-4 mb-3">Thank you for using COD, Pay as cash when you receive product</h5>
        </>
      )}

      <div className="col-md-12 mt-4">
        <div className="d-grid gap-2 d-flex justify-content-end">
          <Link to="/checkout/delivery-info">
            <span className="btn btn-outline-primary">Back</span>
          </Link>
          <button className="btn btn-primary" onClick={handlePayment}>
            Pay Now
          </button>
        </div>
      </div>
    </form>
  );
};

export default PaymentForm;
