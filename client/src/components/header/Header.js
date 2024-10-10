import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUserAlt, FaShoppingCart } from "react-icons/fa";

import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUserSlice, logoutUser } from "../../features/userSlice";
import { getCartSlice } from "../../features/cartSlice";

const Header = () => {
  const [openedDrawer, setOpenedDrawer] = useState(false);
  const toggleDrawer = () => setOpenedDrawer(!openedDrawer);
  const changeNav = (event) => setOpenedDrawer(!openedDrawer);
  const dispatch = useDispatch();
  const { currentUser } = useSelector(getUserSlice);
  const { cartItems } = useSelector(getCartSlice)

  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={changeNav}>
            <span className="ms-2 h5">MERN E-Commerce</span>
          </Link>

          <div className={"navbar-collapse offcanvas-collapse " + (openedDrawer ? "open" : "")}>
            <ul className="navbar-nav me-auto mb-lg-0">
              <li className="nav-item">
                <Link to="/products" className="nav-link text-white" replace onClick={changeNav}>
                  Explore
                </Link>
              </li>
            </ul>
            <button type="button" className="btn bg-dark btn-outline-light me-3 d-none d-lg-inline">
              <Link to="/users/me/cart-items">
                <FaShoppingCart color="white" />
                <span className="ms-3 badge rounded-pill bg-danger">{cartItems.length}</span>
              </Link>
            </button>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  href="!#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUserAlt color="white" />
                  <span className="p-2 text-white">
                    {currentUser ? currentUser.firstName + " " + currentUser.lastName : "No User"}
                  </span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-dark bg-primary dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  {currentUser ? (
                    <>
                      <li>
                        <Link
                          to="/users/me"
                          className="dropdown-item text-white"
                          onClick={changeNav}
                        >
                          My Account
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/users/me/order-history"
                          className="dropdown-item text-white"
                          onClick={changeNav}
                        >
                          My Orders
                        </Link>
                      </li>
                      <li className="dropdown-divider bg-light"></li>
                      <li>
                        <Link
                          to="/"
                          className="dropdown-item text-white"
                          onClick={() => {
                            dispatch(logoutUser());
             
                          }}
                        >
                          Logout
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/auth/login"
                          className="dropdown-item text-white"
                          onClick={changeNav}
                        >
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link to="/auth/register" className="dropdown-item" onClick={changeNav}>
                          Sign Up
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>

          <div className="d-inline-block d-lg-none">
            <button type="button" className="btn bg-dark btn-outline-light">
              <Link to="/users/me/cart-items">
                <FaShoppingCart color="white" />
                <span className="ms-3 badge rounded-pill bg-danger">{cartItems.length}</span>
              </Link>
            </button>
            <button
              className="navbar-toggler p-0 border-0 ms-3"
              type="button"
              onClick={toggleDrawer}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
