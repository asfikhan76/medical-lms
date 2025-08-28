import React from 'react'
import { useSidebar } from '../contexts/SidebarContext'
import { LogOut, BetweenHorizontalStart, BetweenHorizontalEnd, SlidersHorizontal } from 'lucide-react'
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from 'react-router-dom'
import userImg from "../assets/img/user.webp"
import { Link } from "react-router-dom"


const Header = () => {
    const { collapsed, setCollapsed } = useSidebar()
    const { logout } = useAuth()
    const navigate = useNavigate()

    const userData = JSON.parse(localStorage.getItem("userData"));


    const handleLogout = () => {
        logout();
        navigate("/login")
    }
    return (
        <header className="bg-white mx-4 mt-2 rounded-lg shadow-sm">
            <div className="flex h-16  items-center gap-8 px-4 sm:px-6 lg:px-8">
                <button className='cursor-pointer' onClick={() => setCollapsed(!collapsed)}>
                    {
                        collapsed ? <BetweenHorizontalStart size={22} color='#6a7282' /> : <BetweenHorizontalEnd size={22} color='#6a7282' />
                    }
                </button>
                <div className="flex flex-1 items-center justify-end md:justify-between">
                    <nav aria-label="Global" className="hidden md:flex gap-5">
                        <div>
                            <input
                                type="search"
                                name=""
                                id=""
                                placeholder='Search...'
                                className="rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200 transition"
                            />
                        </div>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4">
                            <button onClick={handleLogout} className="hidden cursor-pointer rounded-md bg-gray-100 px-5 py-2.5 text-sm font-semibold text-[#b23b3b] transition hover:text-[#904e4e] sm:flex items-center gap-2"
                            >
                                Logout
                                <LogOut size={18} color='#b23b3b' />
                            </button>
                        </div>
                        <div className="sm:flex sm:gap-4">
                            <Link to="/userProfile">
                                <div className='flex item-start justify-start gap-2'>
                                    <img src={userImg} alt="" height="35px" width="35px" className='rounded-full cursor-pointer' />
                                    <div>
                                        <p className='text-xs'>{userData.role}</p>
                                        <h4 className='text-xs'>{userData.email}</h4>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <button
                            className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                        >
                            <span className="sr-only">Toggle menu</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header