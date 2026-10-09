import { createContext, useContext, useState, useEffect } from 'react'

const SidebarContext = createContext()

export const SidebarProvider = ({ children }) => {
    const [collapsed, setCollapsed] = useState(() => {
        const stored = localStorage.getItem('sidebar-collapsed')
        return stored === null ? false : stored === 'true'
    })

    useEffect(() => {
        localStorage.setItem('sidebar-collapsed', collapsed)
    }, [collapsed])

    return (
        <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
            {children}
        </SidebarContext.Provider>
    )
}

export const useSidebar = () => {
    return useContext(SidebarContext)
}