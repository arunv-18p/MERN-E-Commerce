import React from "react"
import "./Loader.scss"

const Loader = () => {
    return (
        <div className="loader">
            <div className="bg"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
        </div>
    );
};

export default Loader;