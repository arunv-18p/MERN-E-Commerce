import React from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaMapMarker,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUserSlice, logoutUser } from "../../features/userSlice";
import Loader from "../loader/Loader";

const Footer = () => {
  const { currentUser, loading } = useSelector(getUserSlice);
  const dispatch = useDispatch();
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="vstack mt-auto">
          <footer className="py-4 bg-secondary">
            <div className="container py-3">
              <div className="row g-3">
                <div className="col-md-6 col-lg-4 d-none d-md-block">
                  <h5 className="text-light">Contact us</h5>
                  <div className="vstack gap-1">
                    <p className="mb-2 text-light text-opacity-75 small">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer in feugiat
                      lorem.
                    </p>
                    <small className="d-flex text-light text-opacity-75 gap-2">
                      <FaMapMarker className="mt-1" />
                      <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                    </small>
                    <small className="d-flex text-light text-opacity-75 gap-2">
                      <FaEnvelope className="mt-1" />
                      <div>info@domain.com</div>
                    </small>
                    <small className="d-flex text-light text-opacity-75 gap-2">
                      <FaPhone className="mt-1" />
                      <div>(+95) 9 12345678</div>
                    </small>
                  </div>
                </div>
                <div className="col-md-6 col-lg-2 d-none d-md-block">
                  <h5 className="text-light">Information</h5>
                  <div className="vstack small gap-2">
                    <Link to="#" className="footer-link text-light">
                      About us
                    </Link>
                    <Link to="#" className="footer-link text-light">
                      Find a store
                    </Link>
                    <Link to="#" className="footer-link text-light">
                      Terms & conditions
                    </Link>
                  </div>
                </div>
                <div className="col-md-6 col-lg-2 d-none d-md-block">
                  <h5 className="text-light">Account</h5>
                  <div className="vstack small gap-2">
                    {currentUser === null ? (
                      <>
                        <Link to="/auth/login">
                          <span className="footer-link text-light">Login</span>
                        </Link>
                        <Link to="/auth/register">
                          <span className="footer-link text-light">Register</span>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to="/users/me">
                          <span className="footer-link text-light">My Account</span>
                        </Link>
                        <Link to="/users/me/current-orders">
                          <span className="footer-link text-light">My Orders</span>
                        </Link>
                        <Link
                          to="/"
                          onClick={() => {
                            dispatch(logoutUser());
                          }}
                        >
                          <span className="footer-link text-light">Logout</span>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <h5 className="text-light text-center text-md-start">Newsletter</h5>
                  <div className="text-light text-opacity-75 mb-3 small text-center text-md-start">
                    Subscribe for promotions and wonderful events
                  </div>
                  <form className="hstack gap-2 justify-content-center justify-content-md-start mb-3">
                    <div>
                      <input
                        type="email"
                        className="form-control border border-primary"
                        placeholder="Your email"
                      />
                    </div>
                    <button className="btn btn-warning">Subscribe</button>
                  </form>
                  <div className="hstack gap-2 justify-content-center justify-content-md-start">
                    <Link to="#" className="text-decoration-none">
                      <img src="/images/apple-app-store-badge.svg" alt="" />
                    </Link>
                    <Link to="#" className="text-decoration-none">
                      <img src="/images/google-play-badge.svg" alt="" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          <footer className="py-4 bg-primary">
            <div className="container d-flex">
              <span className="text-light text-opacity-50 my-auto">
                &copy; {new Date().getFullYear()} MERN E-Commerce
              </span>
              <div className="ms-auto hstack gap-4">
                <Link to="#" className="ms-auto link-light">
                  <FaFacebook />
                </Link>
                <Link to="#" className="ms-auto link-light">
                  <FaTwitter />
                </Link>
                <Link to="#" className="ms-auto link-light">
                  <FaInstagram />
                </Link>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

export default Footer;
