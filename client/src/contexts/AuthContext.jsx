import React, { createContext, useContext, useState, useEffect } from "react"
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (token && userData) {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setIsAuth(true);
                setUserData(userData)
            } catch (error) {
                console.error(error);
                setIsAuth(false);
                setUserData(null)
            }
        }
        setIsLoading(false)
    }, []);

    useEffect(() => {
        const handleStorage = () => {
            const token = localStorage.getItem("token");
            const userData = JSON.parse(localStorage.getItem("userData"));
            if (token && userData) {
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    setIsAuth(true);
                    setUserData(userData)
                } catch (error) {
                    setIsAuth(false);
                    setUserData(null)
                }
            } else {
                setIsAuth(false);
                setUserData(null);
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
        setIsAuth(true);
        setUserData(userData)
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData")
        delete axios.defaults.headers.common['Authorization'];
        setIsAuth(false);
        setUserData(null);
    }

    const isAdmin = () => userData?.role === "admin";
    const isStudent = () => userData?.role === "student";
    const getUserRole = () => userData?.role;

    return (
        <AuthContext.Provider value={{
            isAuth,
            login,
            logout,
            isLoading,
            userData,
            isAdmin: isAdmin(),
            isStudent: isStudent(),
            getUserRole
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext);
}