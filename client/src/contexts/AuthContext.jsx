import React, { createContext, useContext, useState, useEffect } from "react"
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setIsAuth(true);
        }
        setIsLoading(false)
    }, []);

    useEffect(() => {
        const handleStorage = () => {
            const token = localStorage.getItem("token");
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
        }
        window.addEventListener('storage', handleStorage);
        return () => {
            return window.removeEventListener("storage", handleStorage)
        }
    }, [])

    const login = (token, userData) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(userData))
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setIsAuth(true)
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData")
        delete axios.defaults.headers.common['Authorization'];
        setIsAuth(false)
    }

    return (
        <AuthContext.Provider value={{ isAuth, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext);
}