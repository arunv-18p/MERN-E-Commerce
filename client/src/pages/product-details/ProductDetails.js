import React, { Fragment, useEffect } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ProductDetailsItem from "../../components/products/product-details-item/ProductDetailsItem";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { getProductSlice, fetchProductById } from "../../features/productSlice";

const ProductDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { product, loading } = useSelector(getProductSlice);
    useEffect(() => {
        dispatch(fetchProductById(id))
    }, [dispatch, id])

    if (loading) return <Loader />

    return (
        <Fragment>
            <Header />
            <ProductDetailsItem product={product}/>
            <Footer />
        </Fragment>
    )
}

export default ProductDetails