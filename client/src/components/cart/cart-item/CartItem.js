import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  ADD_ITEM_TO_CART,
  DELETE_ITEM_FROM_CART,
  REMOVE_ITEM_FROM_CART,
} from "../../../features/cartSlice";

function CartItem({ cartItem }) {
  const dispatch = useDispatch();
  const getQtyInput = () => {
    return (
      <div className="input-group input-group-sm">
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={() => {
            dispatch({ type: REMOVE_ITEM_FROM_CART, payload: { ...cartItem } });
          }}
        >
          <FaMinus />
        </button>
        <input
          type="text"
          className="form-control text-center border-primary"
          placeholder=""
          defaultValue="1"
          value={cartItem.quantity}
          size="2"
        />
        <button
          className="btn btn-outline-primary"
          type="button"
          onClick={() => {
            dispatch({ type: ADD_ITEM_TO_CART, payload: { ...cartItem } });
          }}
        >
          <FaPlus />
        </button>
      </div>
    );
  };

  return (
    <div className="d-flex py-2">
      <div className="flex-shink-0">
        <img
          className="rounded"
          src={cartItem.thumbnail}
          width={100}
          height={100}
          alt="Product image."
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="ms-3 me-md-2 flex-grow-1">
        <Link href="/product/1">
          <span className="text-dark text-decoration-none">{cartItem.title}</span>
        </Link>
        <small className="d-flex flex-wrap text-muted">
          <span>{cartItem.sku}</span>
          <div className="vr mx-2"></div>
          <span>{cartItem.brand}</span>
        </small>
        <h5 className="fw-semibold mt-2">${parseInt(cartItem.price) * cartItem.quantity}</h5>
        <div className="d-inline-block d-sm-none mt-2">{getQtyInput()}</div>
      </div>
      <div className="flex-shrink-0 d-none d-sm-inline ms-3">{getQtyInput()}</div>
      <div className="flex-shrink-0 ms-4">
        <button
          className="btn btn-sm btn-outline-danger"
          type="button"
          onClick={() => {
            dispatch({ type: DELETE_ITEM_FROM_CART, payload: { ...cartItem } });
          }}
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
