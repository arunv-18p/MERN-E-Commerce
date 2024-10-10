import React, { Fragment, useEffect } from "react";

import Header from "../../components/header/Header";
import Banner from "../../components/banner/Banner";

import "./Home.scss";

import FeatureProductList from "../../components/products/feature-product-list/FeatureProductList";
import Footer from "../../components/footer/Footer";
import BrowseProducts from "../../components/products/browse-products/BrowseProducts";

const Home = () => {
    return (
        <Fragment>
            <Header />
            <Banner />
            <BrowseProducts />
            <FeatureProductList />
            <Footer />
        </Fragment>
    );
};

export default Home;
