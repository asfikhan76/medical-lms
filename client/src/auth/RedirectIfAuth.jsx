import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const RedirectIfAuth = () => {
    const { isAuth } = useAuth()
    return isAuth ? <Navigate to="/" replace /> : <Outlet />
}

export default RedirectIfAuth