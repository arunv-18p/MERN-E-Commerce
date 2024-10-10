import { Link } from "react-router-dom";

function ReviewCartItem({ cartItem }) {
  return (
    <div className="d-flex">
      <div className="flex-shink-0">
        <img className="rounded" src={cartItem.thumbnail} width={80} height={80} alt="Product image." style={{ objectFit: "cover" }} />
      </div>
      <div className="flex-grow-1 ms-3 h-100">
        <div className="vstack">
          <Link to={`/products/${cartItem.id}`}>
            <span className="text-dark text-decoration-none">{cartItem.title}</span>
          </Link>
          <small className="text-muted mb-2" style={{ fontSize: 12 }}>
            <span>{cartItem.brand}</span>
            ,&nbsp;
            <span>{cartItem.sku}</span>
          </small>
          <h6 className="mb-0">
            ${cartItem.quantity} &times; ${cartItem.price}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default ReviewCartItem;
