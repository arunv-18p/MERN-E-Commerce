import { Link } from "react-router-dom";
import Product from "../product/Product";

import { useEffect, useState } from "react";
import { FaSearch, FaThList, FaThLarge } from "react-icons/fa";
import ProductHorizontal from "../product-horizontal/ProductHorizontal";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { fetchProducts, FILTER_PRODUCTS, getProductSlice, SEARCH_PRODUCTS } from "../../../features/productSlice";

function FilterMenuLeft() {
  const dispatch = useDispatch();

  const { brands, categories } = useSelector(getProductSlice);

  const mBrands = ["All", ...brands.slice(0, 4)];
  const mCategories = ["All", ...categories.slice(0, 4)];

  const [filter, setFilter] = useState({
    minPrice: "",
    maxPrice: "",
    filterBrands: [],
    filterCategories: [],
  });

  const onFilterChange = (e) => {

    if (e.target.name === "minPrice" || e.target.name === "maxPrice") {
      setFilter({ ...filter, [e.target.name]: e.target.value });
    } else {
      if (e.target.name === "filterBrands" || e.target.name === "filterCategories") {
        if (e.target.checked === true) {
          setFilter({ ...filter, [e.target.name]: [e.target.value, ...filter[e.target.name]] });
        } else {
          setFilter({ ...filter, [e.target.name]: filter[e.target.name].filter((item) => item !== e.target.value) });
        }
      }
    }
  };

  const handleFilterApply = (e) => {
    dispatch({ type: FILTER_PRODUCTS, payload: filter });
  };

  return (
    <ul className="list-group list-group-flush rounded">
      <li className="list-group-item d-none d-lg-block">
        <h5 className="mt-1 mb-2">Browse</h5>
        <div className="d-flex flex-wrap my-2">
          {mCategories.map((value, index) => {
            return (
              <span
                key={index}
                className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
                onClick={(e) => {
                  if (e.target.classList.contains("btn-primary") && e.target.classList.contains("text-white")) {
                    e.target.classList.remove("btn-primary", "text-white");
                    onFilterChange({ target: { name: "filterCategories", value: value, checked: false } });
                  } else {
                    e.target.classList.add("btn-primary", "text-white");
                    onFilterChange({ target: { name: "filterCategories", value: value, checked: true } });
                  }
                }}
              >
                {value}
              </span>
            );
          })}
        </div>
      </li>
      <li className="list-group-item">
        <h5 className="mt-1 mb-1">Brands</h5>
        <div className="d-flex flex-column">
          {mBrands.map((v, i) => {
            return (
              <div key={i} className="form-check">
                <input className="form-check-input" type="checkbox" name="filterBrands" value={v} onChange={onFilterChange} />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  {v}
                </label>
              </div>
            );
          })}
        </div>
      </li>

      <li className="list-group-item">
        <h5 className="mt-1 mb-2">Price Range</h5>
        <div className="d-grid d-block mb-3">
          <div className="form-floating mb-2">
            <input type="number" className="form-control" placeholder="Min" name="minPrice" onChange={onFilterChange} />
            <label htmlFor="floatingInput">Min Price</label>
          </div>
          <div className="form-floating mb-2">
            <input type="number" className="form-control" placeholder="Max" name="maxPrice" onChange={onFilterChange} />
            <label htmlFor="floatingInput">Max Price</label>
          </div>
          <button className="btn btn-dark" onClick={handleFilterApply}>
            Apply
          </button>
        </div>
      </li>
    </ul>
  );
}

function ProductList() {
  const [viewType, setViewType] = useState({ grid: true });
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { splitProducts, categories, totalProducts, loading } = useSelector(getProductSlice);
  const mCategories = ["All", ...categories.slice(0, 4)]
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    dispatch({ type: SEARCH_PRODUCTS, payload: searchQuery.toLowerCase() });
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  function changeViewType() {
    setViewType({
      grid: !viewType.grid,
    });
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container-fluid mt-5 py-4 px-xl-5">
          <nav aria-label="breadcrumb" className="bg-custom-light rounded">
            <ol className="breadcrumb p-3 mb-0">
              <li className="breadcrumb-item">
                <Link className="text-decoration-none link-secondary" to="/products" replace>
                  All Prodcuts
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Cases &amp; Covers
              </li>
            </ol>
          </nav>

          <div className="h-scroller d-block d-lg-none">
            <nav className="nav h-underline">
              {mCategories.map((v, i) => {
                return (
                  <div key={i} className="h-link me-2">
                    <Link to="/products" className="btn btn-sm btn-outline-dark rounded-pill" replace>
                      {v}
                    </Link>
                  </div>
                );
              })}
            </nav>
          </div>

          <div className="row mb-3 d-block d-lg-none">
            <div className="col-12">
              <div id="accordionFilter" className="accordion shadow">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button fw-bold collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFilter"
                      aria-expanded="false"
                      aria-controls="collapseFilter"
                    >
                      Filter Products
                    </button>
                  </h2>
                </div>
                <div id="collapseFilter" className="accordion-collapse collapse" data-bs-parent="#accordionFilter">
                  <div className="accordion-body p-0">
                    <FilterMenuLeft />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-4 mt-lg-3">
            <div className="d-none d-lg-block col-lg-3">
              <div className="border rounded shadow">
                <FilterMenuLeft />
              </div>
            </div>
            <div className="col-lg-9">
              <div className="d-flex flex-column h-100">
                <div className="row mb-3">
                  <div className="col-lg-3 d-none d-lg-block">
                    <select className="form-select" aria-label="Default select example" defaultValue="">
                      <option value="">All Models</option>
                      <option value="1">iPhone X</option>
                      <option value="2">iPhone Xs</option>
                      <option value="3">iPhone 11</option>
                    </select>
                  </div>
                  <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row">
                    <div className="input-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Search products..."
                        aria-label="search input"
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <button className="btn btn-outline-dark" onClick={handleSearch}>
                        <FaSearch />
                      </button>
                    </div>
                    <button className="btn btn-outline-dark ms-2 d-none d-lg-inline" onClick={changeViewType}>
                      {viewType.grid ? <FaThList /> : <FaThLarge />}
                    </button>
                  </div>
                </div>
                <div
                  className={
                    "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 " + (viewType.grid ? "row-cols-xl-3" : "row-cols-xl-2")
                  }
                >
                  {splitProducts.length > 0 &&
                    Array.from(splitProducts[page - 1]).map((product, key) => {
                      if (viewType.grid) {
                        return <Product key={key} percentOff={key % 2 === 0 ? 15 : null} product={product} />;
                      }
                      return <ProductHorizontal key={key} percentOff={key % 4 === 0 ? 15 : null} product={product} />;
                    })}
                </div>
                <div className="d-flex align-items-center mt-auto">
                  <span className="text-muted small d-none d-md-inline">Showing 10 of {totalProducts}</span>

                  <div className="ms-auto">
                    <PaginationControl
                      page={page}
                      between={1}
                      total={splitProducts.length}
                      limit={1}
                      changePage={(page) => {
                        setPage(page);
                      }}
                      ellipsis={1}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductList;
