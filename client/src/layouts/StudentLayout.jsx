import React from 'react'
import { useAuth } from '@contexts/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from '@components/Sidebar'
import Header from '@components/Header'
import { useSidebar } from '@contexts/SidebarContext'

const StudentLayout = () => {
    const { isStudent } = useAuth();
    const { collapsed } = useSidebar();

    if (!isStudent) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className='flex'>
            <div>
                <Sidebar userRole="student" />
            </div>
            <div className="bg-[#eee] h-screen" style={{ width: `calc(100% - ${collapsed ? '64px' : '192px'})` }}>
                <Header />
                <Outlet />
            </div>
        </div>
    )
}

export default StudentLayout