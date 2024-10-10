import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import PageLayout from "../../../components/page-layout/PageLayout";

function CheckoutSuccess() {
  return (
    <PageLayout>
      <div className="container py-4 h-100">
      <div className="row h-100">
        <div className="col-md-12 h-100">
          <div className="card border-0 shadow h-100">
            <div className="card-body mt-5">
              <div className="d-flex justify-content-center mb-3">
                <FaCheckCircle className="text-success" size="180px" />
              </div>
              <h3 className="text-center">Thank you for order</h3>
              <p className="text-center">
                We&apos;ve received your order. You can track order status in
                your&nbsp;
                <Link to="/users/me/current-orders">
                  <span>account setting</span>
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
    </PageLayout>
  );
}

export default CheckoutSuccess;
