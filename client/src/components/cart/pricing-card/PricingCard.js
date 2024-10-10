import { Link } from "react-router-dom";

function PricingCard({ prices, pricingOnly, children }) {
  if (prices == null) {
    prices = {
      subTotal: 0,
      discount: 0,
      deliveryCharge: 0,
      totalPrice: 0
    }
  }
  return (
    <div className="card border-0 shadow">
      <div className="card-body">
        <div className="vstack gap-2">
          <div className="d-flex justify-content-between">
            <span>Subtotal:</span>
            <span>${prices.subTotal}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Discount:</span>
            <span className="text-danger">${prices.discount}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Delivery charge:</span>
            <span className="text-success">${prices.deliveryCharge}</span>
          </div>

          <hr className="text-muted" />

          <div className="d-flex justify-content-between">
            <span className="h5">Total:</span>
            <span className="fw-bold h5 mb-0">${prices.totalPrice}</span>
          </div>

          {!pricingOnly && (
            <div className="d-grid gap-2 mt-2">
              <Link to="/checkout/delivery-info">
                <span className="btn btn-primary">Checkout</span>
              </Link>
              <Link to="/">
                <span className="btn btn-outline-primary">Continue Shopping</span>
              </Link>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

export default PricingCard;
