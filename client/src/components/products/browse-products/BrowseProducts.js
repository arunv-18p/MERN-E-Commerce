import React from "react";

import { Link } from "react-router-dom";

const BrowseProducts = () => {
    return (
        <div className="d-flex flex-column bg-white pb-0 py-4">
        <p className="text-center px-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="d-flex justify-content-center">
          <Link to="/products" className="btn btn-primary">
            Browse products
          </Link>
        </div>
      </div>
    )
}

export default BrowseProducts