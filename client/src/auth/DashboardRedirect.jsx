import React from "react"
import { useAuth } from "@contexts/AuthContext"
import { Navigate } from "react-router-dom";
import Loader from "@components/Loader"

const DashboardRedirect = () => {
    const { isLoading, getUserRole } = useAuth();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader />
            </div>
        )
    }

    const role = getUserRole();
    
    switch (role) {
        case "admin":
            return <Navigate to="/admin/dashboard" replace />;
        case "student":
            return <Navigate to="/student/dashboard" replace />;
        default:
            return <Navigate to="/login" replace />;
    }
}

export default DashboardRedirect