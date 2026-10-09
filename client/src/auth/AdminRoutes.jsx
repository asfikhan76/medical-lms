import React from "react"
import { useAuth } from "@contexts/AuthContext"
import { Navigate, Outlet } from "react-router-dom";
import Loader from "@components/Loader"

const AdminRoutes = () => {
    const { isAdmin, isLoading, getUserRole } = useAuth();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader />
            </div>
        )
    }

    // If not admin, redirect based on role
    if (!isAdmin) {
        const role = getUserRole();
        if (role === "student") {
            return <Navigate to="/student/dashboard" replace />;
        } else {
            return <Navigate to="/login" replace />;
        }
    }

    // If admin, render the outlet
    return <Outlet />;
}

export default AdminRoutes