import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageLayout from "../../../components/page-layout/PageLayout";
import AccountMenu from "../../../components/user/account-menu/AccountMenu";

import React from "react";

import { addProductToDB, fetchProductById, getProductSlice, updateProductById } from "../../../features/productSlice";
import Loader from "../../../components/loader/Loader";

const AdminProductHandler = ({ handleType }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, loading } = useSelector(getProductSlice);
  const [productData, setProductData] = useState({
    _id: "",
    title: "",
    description: "",
    category: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    sku: "",
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "",
    minimumOrderQuantity: "",
    returnPolicy: "",
    images: [],
    thumbnail: "",
  });
  const onChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (handleType === "edit") {
      dispatch(updateProductById(productData));
    } else {
      const { _id, ...product } = productData;
      dispatch(addProductToDB(JSON.stringify(product)));
    }
  };
  useEffect(() => {
    if (!product) {
      dispatch(fetchProductById(id));
    } else {
      setProductData({ ...product });
    }
  }, [dispatch, id, product]);
  return (
    <PageLayout>
      <>
        {productData == null || loading ? (
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
                        {handleType === "edit" ? "Edit Product" : "Add"}
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            <div className="container-fluid p-4">
              <div className="row g-3">
                <div className="col-lg-3">
                  <AccountMenu current="admin-new-product" />
                </div>
                <div className="col-lg-9">
                  <div className="row g-3">
                    <div className="col-lg-9">
                      <div className="card border-0 shadow mb-3">
                        <div className="card-body">
                          <h4 className="card-title fw-semibold mt-2 mb-3">{handleType === "edit" ? "Edit Product" : "Add Product"}</h4>
                          <form className="row g-3" onSubmit={submitHandler}>
                            <div className="col-md-6">
                              <label className="form-label">Title</label>
                              <input type="text" name="title" className="form-control" value={productData.title} onChange={onChange} />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Category</label>
                              <input type="text" name="category" className="form-control" value={productData.category} onChange={onChange} />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Price</label>
                              <input type="text" name="price" className="form-control" value={productData.price} onChange={onChange} />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Discount Percentage</label>
                              <input
                                type="text"
                                name="discountPercentage"
                                className="form-control"
                                value={productData.discountPercentage}
                                onChange={onChange}
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Rating</label>
                              <input type="text" name="rating" className="form-control" value={productData.rating} onChange={onChange} />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Stock</label>
                              <input type="text" name="stock" className="form-control" value={productData.stock} onChange={onChange} />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Brand</label>
                              <input type="text" name="brand" className="form-control" value={productData.brand} onChange={onChange} />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">SKU</label>
                              <input type="text" name="sku" className="form-control" value={productData.sku} onChange={onChange} />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Warranty Information</label>
                              <input
                                type="text"
                                name="warrantyInformation"
                                className="form-control"
                                value={productData.warrantyInformation}
                                onChange={onChange}
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Shipping Information</label>
                              <input
                                type="text"
                                name="shippingInformation"
                                className="form-control"
                                value={productData.shippingInformation}
                                onChange={onChange}
                              />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Availability Status</label>
                              <input
                                type="text"
                                name="availabilityStatus"
                                className="form-control"
                                value={productData.availabilityStatus}
                                onChange={onChange}
                              />
                            </div>
                            <div className="col-md-6">
                              
                            <label className="form-label">Return Policy</label>
                              <input type="text" name="returnPolicy" className="form-control" value={productData.returnPolicy} onChange={onChange} />
                            </div>
                            <div className="col-md-6">
                              
                            <label className="form-label">Minimum Order Quantity</label>
                              <input type="text" name="minimumOrderQuantity" className="form-control" value={productData.minimumOrderQuantity} onChange={onChange} />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Thumbnail</label>
                              <input type="text" name="thumbnail" className="form-control" value={productData.thumbnail} onChange={onChange} />
                            </div>
                            <div className="col-md-6">
                              <label className="form-label">Images</label>
                              <textarea
                                type="text"
                                name="images"
                                className="form-control"
                                value={productData.images}
                                onChange={onChange}
                                style={{ height: "150px" }}
                              />
                            </div>
                            <div className="col">
                              <label className="form-label">Description</label>
                              <textarea
                                type="text"
                                name="description"
                                className="form-control"
                                value={productData.description}
                                onChange={onChange}
                                style={{ height: "250px" }}
                              />
                            </div>
                            <div className="col-md-12 mt-4">
                              <button className="btn btn-primary float-end">{handleType === "edit" ? "Update" : "Add Product"}</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3"></div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
          </div>
        )}
      </>
    </PageLayout>
  );
};

export default AdminProductHandler;
