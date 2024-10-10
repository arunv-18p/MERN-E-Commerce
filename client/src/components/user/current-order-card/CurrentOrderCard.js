import { FaCcVisa, FaMoneyBillWave } from "react-icons/fa";

function CurrentOrderCard({ orderItem }) {
  return (
    <div className="card border-0 shadow mb-3">
      <div className="card-header py-3 bg-white">
        <div className="row">
          <div className="col d-flex">
            <span className="fw-semibold h5 my-auto">Order ID: {orderItem._id}</span>
          </div>
          <div className="col-auto">
            <button className="btn btn-sm btn-outline-primary">View Detail</button>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="row gx-2 gy-3">
          <div className="col-md-5">
            <h6 className="fw-bold">Shipping Address</h6>
            <div className="vstack text-dark small">
              <span>
                {orderItem.billingDetails.firstName} {orderItem.billingDetails.lastName}
              </span>
              <span>{orderItem.billingDetails.emailAddress}</span>
              <span>
                {orderItem.billingDetails.phCode} {orderItem.billingDetails.phoneNumber}
              </span>
              <span>{orderItem.billingDetails.address}</span>
              <span>{orderItem.billingDetails.state}</span>
              <span>{orderItem.billingDetails.country}</span>
            </div>
          </div>
          <div className="col-md-4">
            <h6 className="fw-bold">Payment Method</h6>
            <div className="text-success">
              {orderItem.paymentType === "cod" ? (
                <>
                  <span className="fw-bold">
                    <FaMoneyBillWave />
                  </span>
                  <span className="ms-2 small">Cash on delivery</span>
                </>
              ) : (
                <>
                  <span className="fw-bold">{orderItem.cardDetails.brand === "visa" && <FaCcVisa />}</span>
                  <span className="ms-2 small">XXXX-XXXX-XXXX-{orderItem.cardDetails.last4}</span>
                </>
              )}
            </div>
            <div>Subtotal: {orderItem.prices.subTotal}</div>
            <div>Delivery Charge: {orderItem.prices.deliveryCharge}</div>
            <div className="fw-semibold">Total: {orderItem.prices.totalPrice}</div>
          </div>
          <div className="col-md-3">
            <h6 className="fw-bold">Status</h6>
            <span className="fw-semibold">{orderItem.orderStatus.toUpperCase()}</span>
            {/* <div className={cancel ? "text-danger" : "text-success"}>
              <span className="fw-semibold">
                {cancel ? "CANCELLED" : "DELIVERED"}
              </span>
            </div> */}
          </div>
        </div>
      </div>
      <div className="card-footer small border-0 py-3 text-muted">Order Date: {orderItem.createdAt}</div>
    </div>
  );
}

export default CurrentOrderCard;
