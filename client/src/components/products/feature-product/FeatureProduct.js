import { Link } from "react-router-dom";

const FeatureProduct = ({ product }) => {
    return (
        <div className="col">
            <div className="card shadow">
                <img className="card-img-top bg-light cover" height="240" alt={product.title} src={product.thumbnail} />
                <div className="card-body">
                    <h5 className="card-title text-center">{product.title}</h5>
                    <p className="card-text text-center text-muted">{product.price}</p>
                    <div className="d-grid gap-2">
                        <Link to={`/products/${product._id}`} className="btn btn-outline-dark">
                            Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureProduct;
