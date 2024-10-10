import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { ADD_ITEM_TO_CART, getCartSlice } from "../../../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductHorizontal = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div className="col">
      <div className="card shadow">
        <div className="row g-0">
          <div className="col-4">
            <Link to="/products/1" href="!#" replace>
              <div className="badge bg-dim py-2 text-white position-absolute" style={{ top: "0.5rem", right: "0.5rem" }}>
                {product.discountPercentage} OFF
              </div>
              <img className="rounded-start bg-light cover w-100 h-100" alt="" src={product.thumbnail} />
            </Link>
          </div>
          <div className="col-8">
            <div className="card-body h-100">
              <div className="d-flex flex-column h-100">
                <h5 className="card-title text-dark text-truncate mb-1">{product.title}</h5>

                <p className="card-text text-muted mb-2 flex-shrink-0">
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
        </div>
      </div>
    </div>
  );
};

export default ProductHorizontal;
