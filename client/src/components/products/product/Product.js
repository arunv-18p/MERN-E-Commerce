import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ADD_ITEM_TO_CART, getCartSlice } from "../../../features/cartSlice";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div className="col">
      <div className="card shadow">
        <Link to={`/products/${product._id}`} href="!#" replace>
          <div className="badge bg-dim py-2 text-white position-absolute" style={{ top: "0.5rem", right: "0.5rem" }}>
            {product.discountPercentage} OFF
          </div>
          <img className="card-img-top bg-light cover" height="240" alt="" src={product.thumbnail} />
        </Link>
        <div className="card-body">
          <h5 className="card-title text-center text-dark text-truncate">{product.title}</h5>
          <p className="card-text text-center text-muted mb-0">
            <del>${product.price}</del> {(product.price - (product.discountPercentage * product.price) / 100).toFixed(2)}
          </p>
          <div className="d-flex d-block">
            <Link to={`/products/${product._id}`}>
              <button className="btn btn-outline-dark mt-3" style={{ marginRight: "5px" }}>
                Details
              </button>
            </Link>
            <Link to="#">
              <button
                className="btn btn-outline-dark mt-3"
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  dispatch({
                    type: ADD_ITEM_TO_CART,
                    payload: {
                      id: product._id,
                      title: product.title,
                      price: product.price,
                      brand: product.brand,
                      thumbnail: product.thumbnail,
                      discountPercentage: product.discountPercentage,
                      sku: product.sku,
                    },
                  });
                }}
              >
                <FaShoppingCart /> Add to cart
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
