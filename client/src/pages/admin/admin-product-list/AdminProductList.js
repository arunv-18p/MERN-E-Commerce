import React, { useEffect, useState } from "react";
import PageLayout from "../../../components/page-layout/PageLayout";
import AccountMenu from "../../../components/user/account-menu/AccountMenu";
import Loader from "../../../components/loader/Loader";
import { PaginationControl } from "react-bootstrap-pagination-control";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductById, fetchProducts, getProductSlice } from "../../../features/productSlice";

import { Link } from "react-router-dom";

import "./AdminProductList.scss";

const AdminProductList = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { splitProducts, loading } = useSelector(getProductSlice);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <PageLayout>
      {loading || splitProducts.length === 0 ? (
        <Loader />
      ) : (
        <div>
          <div className="bg-light">
            <div className="container-fluid">
              <div className="row py-4 px-2">
                <nav aria-label="breadcrumb col-12">
                  <ol className="breadcrumb mb-1">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Product List
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <div className="container-fluid p-4">
            <div className="row g-3">
              <div className="col-lg-3">
                <AccountMenu current="admin-product-list" />
              </div>
              <div className="col-lg-9">
                <table
                  class="table table-stripped table-bordered table-hover shadow"
                  id="productsTable"
                >
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">id</th>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Category</th>
                      <th scope="col">Price</th>
                      <th scope="col">Discount Percentage</th>
                      <th scope="col">Rating</th>
                      <th scope="col">Stock</th>
                      <th scope="col">Brand</th>
                      <th scope="col">Sku</th>
                      <th scope="col">Warranty</th>
                      <th scope="col">Shipping Info</th>
                      <th scope="col">Availability</th>
                      <th scope="col">Reviews</th>
                      <th scope="col">Return Policy</th>
                      <th scope="col">Minimum Order Quantity</th>
                      <th scope="col">Images</th>
                      <th scope="col">Thumbnail</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {splitProducts[page].map((product, key) => {
                      return (
                        <tr>
                          <th scope="row" className="ellipses">
                            {(page - 1) * 10 + key}
                          </th>
                          <td className="ellipses">{product._id}</td>
                          <td className="ellipses">{product.title}</td>
                          <td className="ellipses">{product.description}</td>
                          <td className="ellipses">{product.category}</td>
                          <td className="ellipses">{product.price}</td>
                          <td className="ellipses">{product.discountPercentage}</td>
                          <td className="ellipses">{product.rating}</td>
                          <td className="ellipses">{product.stock}</td>
                          <td className="ellipses">{product.brand}</td>
                          <td className="ellipses">{product.sku}</td>
                          <td className="ellipses">{product.warrantyInformation}</td>
                          <td className="ellipses">{product.shippingInformation}</td>
                          <td className="ellipses">{product.availabilityStatus}</td>
                          <td className="ellipses">{product.reviews.length}</td>
                          <td className="ellipses">{product.returnPolicy}</td>
                          <td className="ellipses">{product.minimumOrderQuantity}</td>
                          <td className="ellipses">{product.images.length}</td>
                          <td className="ellipses">{product.thumbnail}</td>
                          <td>
                            <Link to={`/admin/product/edit/${product._id}`}>
                              <button className="btn btn-primary">Edit</button>
                            </Link>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                dispatch(deleteProductById(product._id));
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <nav className="float-end mt-3">
                  {splitProducts.length > 1 && (
                    <PaginationControl
                      page={page}
                      between={1}
                      total={splitProducts.length - 1}
                      limit={1}
                      changePage={(page) => {
                        setPage(page);
                      }}
                      ellipsis={1}
                    />
                  )}
                </nav>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
        </div>
      )}
    </PageLayout>
  );
};

export default AdminProductList;
