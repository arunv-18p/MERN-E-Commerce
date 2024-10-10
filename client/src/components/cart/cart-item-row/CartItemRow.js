import { useState } from "react";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  ADD_ITEM_TO_CART,
  DELETE_ITEM_FROM_CART,
  REMOVE_ITEM_FROM_CART,
} from "../../../features/cartSlice";

function CartItemRow({ cartItem }) {
  const dispatch = useDispatch();
  const getQtyInput = () => {
    return (
      <div className="input-group input-group-sm" style={{ width: 100 }}>
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
          value={cartItem.quantity}
          defaultValue="1"
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
  if (cartItem == null) return;
  return (
    <tr>
      <td scope="row">
        <div className="hstack">
          <img
            className="rounded"
            src={cartItem.thumbnail}
            width={80}
            height={80}
            alt="Product image."
            style={{ objectFit: "cover" }}
          />
          <div className="ms-3">
            <span className="h5">
              <Link href={`/products/${cartItem._id}`}>
                <span className="link-dark text-decoration-none">{cartItem.title}</span>
              </Link>
            </span>
            <small className="d-flex text-muted" style={{ fontSize: 12 }}>
              <span>{cartItem.sku}</span>
              ,&nbsp;
              <span>{cartItem.brand}</span>
            </small>
          </div>
        </div>
      </td>
      <td>
        <h6 className="mb-0">${parseFloat(cartItem.price) * cartItem.quantity}</h6>
      </td>
      <td>
        <div className="d-flex">
          <div>{getQtyInput()}</div>
        </div>
      </td>
      <td>
        <button
          className="btn btn-sm btn-danger"
          type="button"
          onClick={() => {
            dispatch({ type: DELETE_ITEM_FROM_CART, payload: { ...cartItem } });
          }}
        >
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  );
}

export default CartItemRow;
