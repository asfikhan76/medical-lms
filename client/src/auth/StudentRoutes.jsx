import React from "react"
import { useAuth } from "@contexts/AuthContext"
import { Navigate, Outlet } from "react-router-dom";
import Loader from "@components/Loader"

const StudentRoutes = () => {
    const { isStudent, isLoading, getUserRole } = useAuth();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader />
            </div>
        )
    }

    // If not student, redirect based on role
    if (!isStudent) {
        const role = getUserRole();
        if (role === "admin") {
            return <Navigate to="/admin/dashboard" replace />;
        } else {
            return <Navigate to="/login" replace />;
        }
    }

    // If student, render the outlet
    return <Outlet />;
}

export default StudentRoutes