import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserSlice } from "../../features/userSlice";
import Loader from "../loader/Loader";

const ProtectedRoute = ({ children }) => {
    const { currentUser, loading } = useSelector(getUserSlice);
    if (loading || currentUser === null) return <Loader />
    else return currentUser.role === 'admin' ? children : <Navigate to="/" />
}

export default ProtectedRoute;
