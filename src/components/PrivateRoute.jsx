import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const PrivateRoute = ({ requiredRole }) => {
    const token = localStorage.getItem('token');
    // console.log(token)
    if (!token) return <Navigate to="/login" />;

    try {
        const user = jwtDecode(token);
        if (user.role !== requiredRole) return <Navigate to="/allleads" />;
        return <Outlet />;
    } catch (error) {
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;