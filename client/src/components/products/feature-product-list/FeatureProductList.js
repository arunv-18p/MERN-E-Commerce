import React, { useEffect } from "react";

import "./FeatureProductList.scss"

import FeatureProduct from "../feature-product/FeatureProduct";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../loader/Loader";
import { fetchProducts, getProductSlice } from "../../../features/productSlice";

const FeatureProductList = () => {
    const dispatch = useDispatch();
    const { featureProducts, loading } = useSelector(getProductSlice);
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <h2 className="text-muted text-center mt-4 mb-3 pb-2">Feature Products</h2>
                    <div className="feature-products pb-2 px-2 px-lg-2">
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-6 g-4 px-md-2">
                            {Array.from(Object.values(featureProducts)).map((product, key) => {
                                return <FeatureProduct product={product} key={key} />;
                            })}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default FeatureProductList;
