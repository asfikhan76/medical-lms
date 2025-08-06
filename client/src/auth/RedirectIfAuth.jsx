import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { isAuthenticated } from "./authUtils"

const RedirectIfAuth = () => {
    return isAuthenticated() ? <Navigate to="/" replace /> : <Outlet />
}

export default RedirectIfAuth