import { FaHeart, FaPlus, FaShoppingBag, FaTruck, FaUserAlt, FaUsers } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserSlice } from "../../../features/userSlice";
import Loader from "../../loader/Loader";
import "./AccountMenu.scss"

const itemCss = "p-2 my-list-item";

function AccountMenu({ current }) {
  const { isAdmin, loading } = useSelector(getUserSlice);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="card border-0 shadow account-menu">
          <div className="card-header">
            <h4 className="mb-0 fw-semibold py-2">Account</h4>
          </div>
          <div className="card-body">
            <div className="d-flex flex-column gap-2">
              <Link to="/users/me" className="account-menu-item">
                <span className={itemCss + (current === "profile" ? " active" : "")}>
                  <FaUserAlt className="me-2" />
                  My profile
                </span>
              </Link>

              <Link to="/users/me/current-orders" className="account-menu-item">
                <span className={itemCss + (current === "current-orders" ? " active" : "")}>
                  <FaShoppingBag className="me-2" />
                  Current orders
                </span>
              </Link>

              <Link to="/users/me/favorite-list" className="account-menu-item">
                <span className={itemCss + (current === "favorite-list" ? " active" : "")}>
                  <FaHeart className="me-2" />
                  My favorites
                </span>
              </Link>

              {isAdmin && (
                <>
                  <Link to="/admin/user-list" className="account-menu-item">
                    <span className={itemCss + (current === "admin-user-list" ? " active" : "")}>
                      <FaUsers className="me-2" />
                      Users
                    </span>
                  </Link>
                  <Link to="/admin/product-list"className="account-menu-item">
                    <span className={itemCss + (current === "admin-product-list" ? " active" : "")}>
                      <FaTruck className="me-2" />
                      Products
                    </span>
                  </Link>
                  <Link to="/admin/product/new"className="account-menu-item">
                    <span className={itemCss + (current === "admin-new-product" ? " active" : "")}>
                      <FaPlus className="me-2" />
                      Add Product
                    </span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AccountMenu;
