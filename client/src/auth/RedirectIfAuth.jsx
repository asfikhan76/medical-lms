import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import Loader from "@components/Loader"

const RedirectIfAuth = () => {

    const { isAuth, isLoading } = useAuth()

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader />
            </div>
        )
    }

    return isAuth ? <Navigate to="/" replace /> : <Outlet />
}

export default RedirectIfAuth