import React from 'react'
import { useSidebar } from '../contexts/SidebarContext'
import { LayoutDashboard, School, Users, Layers, FileUser, FilePlus, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'


const Sidebar = () => {
    const { collapsed } = useSidebar()
    return (
        <div className={`flex h-screen ${collapsed ? 'w-16' : 'w-48'} flex-col  justify-between border-e border-gray-100 shadow-sm relative`}>
            <div>
                <div className="flex items-center justify-center py-3">

                    {/* logo icon */}
                    <div className="grid size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
                        <School size={25} color='#28282B' />
                    </div>

                    {/* logo text */}
                    <div className={`text-lg font-semibold whitespace-nowrap text-gray-800 ms-2 ${collapsed ? 'hidden' : 'block'}`}>
                        Exam Portal
                    </div>
                </div>
                <div className="border-t border-gray-100">
                    <div className="px-2">
                        <div className="py-4">
                            <Link to="/"
                                className={`group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm bg-blue-50 px-2 py-1.5 text-blue-700`}>
                                <LayoutDashboard size={18} color='#6a7282' />
                                <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                                    Dashboard
                                </span>
                                {
                                    collapsed ? null : <span className="text-sm font-normal text-[#6a7282]">Dashboard</span>
                                }
                            </Link>
                        </div>

                        <ul className="space-y-1 border-t border-gray-100 pt-4 p-0">
                            <li>
                                <Link to="#"
                                    className={`group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700`}>
                                    <Users size={18} color='#6a7282' />
                                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                                        Students
                                    </span>
                                    {
                                        collapsed ? null : <span className="text-sm font-normal text-[#6a7282]">Students</span>
                                    }
                                </Link>
                            </li>
                            <li>
                                <Link to="#"
                                    className={`group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700`}>
                                    <Layers size={18} color='#6a7282' />
                                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm whitespace-nowrap w-fit bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                                        All Tests
                                    </span>
                                    {
                                        collapsed ? null : <span className="text-sm font-normal w-fit text-[#6a7282]">All Tests</span>
                                    }
                                </Link>
                            </li>
                            <li>
                                <Link to="#"
                                    className={`group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700`}>
                                    <FileUser size={18} color='#6a7282' />
                                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                                        Results
                                    </span>
                                    {
                                        collapsed ? null : <span className="text-sm font-normal text-[#6a7282]">  Results</span>
                                    }
                                </Link>
                            </li>
                            <li>
                                <Link to="/add-question"
                                    className={`group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700`}>
                                    <FilePlus size={18} color='#6a7282' />
                                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 whitespace-nowrap w-fit px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                                        Add Question
                                    </span>
                                    {
                                        collapsed ? null : <span className="text-sm font-normal text-[#6a7282]">   Add Test</span>
                                    }
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
                <a href="#"
                    className={`group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700`}>
                    <LogOut size={18} color='#6a7282' />
                    <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                        Logout
                    </span>
                    {
                        collapsed ? null : <span className="text-sm font-normal text-[#6a7282]">Logout</span>
                    }
                </a>
            </div>
        </div>
    )
}

export default Sidebar