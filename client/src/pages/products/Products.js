import React, { Fragment } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ProductList from "../../components/products/product-list/ProductList";

const Products = () => {

    return (
        <Fragment>
            <Header />
            <ProductList />
            <Footer />
        </Fragment>
    )
}

export default Products