import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "../../../components/page-layout/PageLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CLEAR_USER_ERRORS, getUserSlice, loginUser } from "../../../features/userSlice";
import Loader from "../../../components/loader/Loader";
import { useAlert } from "react-alert";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { currentUser, loading, isAuthenticated, errorType, errorMessage } = useSelector(getUserSlice);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginUser = (e) => {
    dispatch(loginUser({ emailAddress, password }));
  };
  useEffect(() => {
    if (isAuthenticated && currentUser != null) {
      alert.show("Login Success", { type: "success" });
      navigate("/users/me", {
        replace: true,
      });
    }
    if (errorType === "loginError") {
      alert.show(errorMessage, { type: "danger" });
      dispatch({ type: CLEAR_USER_ERRORS });
    }
  }, [dispatch, navigate, isAuthenticated, currentUser, alert, errorType, errorMessage]);
  return (
    <PageLayout page="auth">
      {loading ? (
        <Loader />
      ) : (
        <div className="container py-3">
          <div className="row my-4">
            <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
              <div className="card border-0 shadow">
                <div className="card-body px-4">
                  <h4 className="card-title fw-bold mt-2 mb-4">Sign In</h4>
                  <form className="row g-2">
                    <div className="col-md-12">
                      <label className="form-label">Email Address</label>
                      <input type="email" className="form-control" placeholder="name@domain.com" onChange={(e) => setEmailAddress(e.target.value)} />
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">Password</label>
                      <input id="passwordCtrl" type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="col-md-12">
                      <Link to="/auth/user/forgot-password">
                        <span className="text-decoration-none">Forgot password?</span>
                      </Link>
                    </div>
                    <div className="col-md-12 mt-4">
                      <button type="button" id="loginBtn" className="btn btn-primary w-100" onClick={handleLoginUser}>
                        Login
                      </button>
                    </div>
                    <div className="col-md-12">
                      <div className="row g-2">
                        <div className="col">
                          <hr className="text-muted" />
                        </div>
                        <div className="col-auto align-self-center text-muted">or continue with</div>
                        <div className="col">
                          <hr className="text-muted" />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="hstack gap-2 justify-content-center">
                        <button className="btn-facebook rounded-circle">
                          <FaFacebookF />
                        </button>
                        <button className="btn-google rounded-circle">
                          <FaGoogle />
                        </button>
                        <button className="btn-apple rounded-circle">
                          <FaApple />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <hr className="text-muted my-0" />
                <div className="text-center p-3">
                  Don&lsquo;t hanve an account?{" "}
                  <Link to="/auth/register">
                    <span className="text-decoration-none fw-medium">Register</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
        </div>
      )}
    </PageLayout>
  );
};

export default Login;
