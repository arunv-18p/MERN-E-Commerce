import { Link, useNavigate } from "react-router-dom";
import PageLayout from "../../../components/page-layout/PageLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_USER_ERRORS, getUserSlice, registerUser } from "../../../features/userSlice";
import { useAlert } from "react-alert";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { isAuthenticated, errorType, errorMessage } = useSelector(getUserSlice);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phCode: "",
    phoneNumber: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (errorType === "registerUserError") {
      alert.show(errorMessage, { type: "danger" });
      dispatch({ type: CLEAR_USER_ERRORS });
    }
  }, [dispatch, navigate, isAuthenticated, errorType, errorMessage, alert]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(userData));
  };
  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  return (
    <PageLayout page="auth">
      <div className="container py-3">
        <div className="row my-4">
          <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <div className="card border-0 shadow">
              <div className="card-body px-4">
                <h4 className="card-title fw-bold mt-2 mb-4">Sign Up</h4>
                <form className="row g-3" onSubmit={submitHandler} encType="multipart/form-data">
                  <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    <input type="text" name="firstName" className="form-control" onChange={onChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <input type="text" name="lastName" className="form-control" onChange={onChange} />
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Phone Number</label>
                    <div className="input-group">
                      <div>
                        <select className="form-select rounded-0 rounded-start bg-light" onChange={onChange} name="phCode">
                          <option>+00</option>
                          <option>+91</option>
                          <option>+92</option>
                        </select>
                      </div>
                      <input type="tel" name="phoneNumber" className="form-control" onChange={onChange} />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Email Address</label>
                    <input type="email" name="emailAddress" className="form-control" onChange={onChange} />
                  </div>
                  {/* <div className="col-md-12">
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" />
                      <label className="form-check-label">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" />
                      <label className="form-check-label">Female</label>
                    </div>
                  </div>*/}
                  <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" onChange={onChange} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" name="confirmPassword" className="form-control" onChange={onChange} />
                  </div>
                  <div className="col-md-12 mt-4">
                    <button className="btn btn-primary w-100">Register</button>
                  </div>
                  <div className="col-md-12">
                    <div className="text-muted bg-light rounded p-3 border small">
                      By clicking the &lsquo;Sign Up&lsquo; button, you confirm that you accept our{" "}
                      <Link to="#">Terms of use and Privacy Policy</Link>.
                    </div>
                  </div>
                </form>
                <hr className="text-muted" />
                <div className="text-center">
                  Already have an account?{" "}
                  <Link to="/auth/login">
                    <span className="text-decoration-none fw-medium">Login</span>
                  </Link>
                </div>
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
};

export default Register;
