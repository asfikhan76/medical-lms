import React, { createContext, useContext, useState, useEffect } from "react"
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        const handleStorage = () => {
            return setIsAuth(!!localStorage.getItem("token"))
        }
        window.addEventListener('storage', handleStorage);
        return () => {
            return window.removeEventListener("storage", handleStorage)
        }
    }, [])

    const login = (token) => {
        localStorage.setItem("token", token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setIsAuth(true)
    }

    const logout = () => {
        localStorage.removeItem("token");
        setIsAuth(false)
    }

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext);
}