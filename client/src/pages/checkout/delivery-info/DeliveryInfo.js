import { Link, useNavigate } from "react-router-dom";
import CheckoutStepper from "../../../components/checkout/checkout-stepper/CheckoutStepper";
import PricingCard from "../../../components/cart/pricing-card/PricingCard";
import PageLayout from "../../../components/page-layout/PageLayout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartSlice, UPDATE_CART_ITEMS_PRICE } from "../../../features/cartSlice";
import { getUserSlice, updateUserProfile } from "../../../features/userSlice";
import Loader from "../../../components/loader/Loader";

function DeliveryInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading } = useSelector(getUserSlice);
  const [userData, setUserData] = useState(currentUser);
  const { totalPrice, subTotal, discount, deliveryCharge } = useSelector(getCartSlice);
  const [saveShippingInfo, setSaveShippingInfo] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    postalCode: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    dispatch({ type: UPDATE_CART_ITEMS_PRICE });
    if (currentUser) {
      if (currentUser.shippingInfo) {
        setShippingInfo(currentUser.shippingInfo);
      }
    }
  }, [dispatch, currentUser]);
  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const onShippingInfoChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { _id, firstName, lastName, emailAddress, phCode, phoneNumber } = userData;
    const billingDetails = {
      userRef: _id,
      firstName,
      lastName,
      phCode,
      phoneNumber,
      emailAddress,
      ...shippingInfo,
    };

    localStorage.setItem("billingDetails", JSON.stringify(billingDetails));

    if (saveShippingInfo) {
      dispatch(updateUserProfile({ ...currentUser, shippingInfo }));
    }
    navigate("/checkout/payment");
  };
  return (
    <PageLayout>
      {userData === null || loading ? (
        <Loader />
      ) : (
        <div className="container py-4">
          <div className="row">
            <div className="col-md-12">
              <CheckoutStepper />
            </div>
          </div>
          <div className="row g-3">
            <div className="col-lg-8">
              <div className="card border-0 shadow">
                <div className="card-body">
                  <form className="row g-3">
                    <h4 className="fw-semibold mb-0">Contact Info</h4>
                    <div className="col-md-6">
                      <label className="form-label">First Name</label>
                      <input type="text" name="firstName" className="form-control" value={userData.firstName} onChange={onChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Last Name</label>
                      <input type="text" name="lastName" className="form-control" value={userData.lastName} onChange={onChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone Number</label>
                      <div className="input-group">
                        <div>
                          <select className="form-select rounded-0 rounded-start bg-light" onChange={onChange} name="phCode">
                            <option>+91</option>
                            <option>+92</option>
                          </select>
                        </div>
                        <input type="tel" className="form-control" name="phoneNumber" value={userData.phoneNumber} onChange={onChange} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email Address</label>
                      <input type="email" className="form-control" name="emailAddress" value={userData.emailAddress} onChange={onChange} />
                    </div>

                    <div className="col-md-12">
                      <hr className="text-muted mb-0" />
                    </div>

                    <h4 className="fw-semibold mb-0">Shipping Info</h4>
                    <div className="col-md-12">
                      <label className="form-label">Address</label>
                      <input type="text" className="form-control" name="address" value={shippingInfo.address} onChange={onShippingInfoChange} />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">State</label>
                      <input type="text" name="state" className="form-control" value={shippingInfo.state} onChange={onShippingInfoChange} />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Country</label>
                      <input type="text" name="country" value={shippingInfo.country} className="form-control" onChange={onShippingInfoChange} />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Postal Code</label>
                      <input type="text" className="form-control" name="postalCode" value={shippingInfo.postalCode} onChange={onShippingInfoChange} />
                    </div>

                    <div className="col-md-12">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" onChange={(e) => setSaveShippingInfo(e.target.checked)} />
                        <label className="form-check-label">Save this address</label>
                      </div>
                    </div>

                    <div className="col-md-12 mt-4">
                      <div className="d-grid gap-2 d-flex justify-content-end">
                        <Link to="/users/me/cart-items">
                          <span className="btn btn-outline-primary">Cancel</span>
                        </Link>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                          Continue
                        </button>
                      </div>
                    </div>
                  </form>
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
      )}
    </PageLayout>
  );
}

export default DeliveryInfo;
