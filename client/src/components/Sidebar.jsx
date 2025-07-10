import React from 'react'
import { useSidebar } from '../contexts/SidebarContext'
import { LayoutDashboard, School, Users, LogOut, ChevronDown, Book, Layers, Component, List } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'


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
                                <span className="invisible absolute z-3 start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
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
                                    <span className="invisible absolute z-3 start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                                        Students
                                    </span>
                                    {
                                        collapsed ? null : <span className="text-sm font-normal text-[#6a7282]">Students</span>
                                    }
                                </Link>
                            </li>

                            {/* subject dropdown */}
                            <li>
                                <details className="group [&_summary::-webkit-details-marker]:hidden">
                                    <summary className={`flex cursor-pointer relative items-center ${collapsed ? 'justify-center' : "justify-between"} rounded-lg rounded-sm  px-3 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700`}>
                                        <div className='flex items-center gap-3'>
                                            <Book size={18} color='#6a7282' />
                                            {
                                                collapsed ? null : <span className="text-sm font-normal text-[#6a7282]"> Subjects </span>
                                            }
                                        </div>

                                        {
                                            collapsed ? null :
                                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                    <ChevronDown size={18} color='#6a7282' />
                                                </span>
                                        }
                                        <span className='invisible absolute z-3 start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 whitespace-nowrap w-fit px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
                                            Subjects
                                        </span>
                                    </summary>
                                    <ul className="mt-2 space-y-1 px-4">
                                        <li>
                                            <NavLink
                                                to="/add-subject"
                                                className={({ isActive }) =>
                                                    `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'} rounded-sm px-2 py-1.5
                                                   ${isActive
                                                        ? 'bg-indigo-600 text-white hover:bg-indigo-500 font-semibold'
                                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                                    }`
                                                }
                                            >
                                                {({ isActive }) => collapsed ? null : <span className={`text-sm font-normal ${isActive} ? 'text-white' : 'text-[#6a7282]'`}>Add Subject</span>}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/all-subjects"
                                                className={({ isActive }) =>
                                                    `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5
                                                   ${isActive
                                                        ? 'bg-indigo-600 text-white hover:bg-indigo-500 font-semibold'
                                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                                    }
                                                `}>
                                                {
                                                    ({ isActive }) => collapsed ? null : <span className={`text-sm font-normal ${isActive} ? 'text-white' : 'text-[#6a7282]'`}>All Subjects</span>
                                                }
                                            </NavLink>
                                        </li>
                                    </ul>
                                </details>
                            </li>

                            {/* system dropdown */}
                            <li>
                                <details className="group [&_summary::-webkit-details-marker]:hidden">
                                    <summary className={`flex cursor-pointer relative items-center ${collapsed ? 'justify-center' : "justify-between"} rounded-lg rounded-sm  px-3 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700`}>
                                        <div className='flex items-center gap-3'>
                                            <Layers size={18} color='#6a7282' />
                                            {
                                                collapsed ? null : <span className="text-sm font-normal text-[#6a7282]"> Systems </span>
                                            }
                                        </div>

                                        {
                                            collapsed ? null :
                                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                    <ChevronDown size={18} color='#6a7282' />
                                                </span>
                                        }
                                        <span className='invisible absolute z-3 start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 whitespace-nowrap w-fit px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
                                            Systems
                                        </span>
                                    </summary>
                                    <ul className="mt-2 space-y-1 px-4">
                                        <li>
                                            <Link to="/add-system"
                                                className={`group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700`}>

                                                {
                                                    collapsed ? null : <span className="text-sm font-normal text-[#6a7282]">   Add System</span>
                                                }
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/all-systems"
                                                className={`group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700`}>
                                                {
                                                    collapsed ? null : <span className="text-sm font-normal text-[#6a7282]">All Systems</span>
                                                }
                                            </Link>
                                        </li>
                                    </ul>
                                </details>
                            </li>

                            {/* Subsystem dropdown */}
                            <li>
                                <details className="group [&_summary::-webkit-details-marker]:hidden">
                                    <summary className={`flex cursor-pointer relative items-center ${collapsed ? 'justify-center' : "justify-between"} rounded-lg rounded-sm  px-3 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700`}>
                                        <div className='flex items-center gap-3'>
                                            <Component size={18} color='#6a7282' />
                                            {
                                                collapsed ? null : <span className="text-sm font-normal text-[#6a7282]"> Sub-Systems </span>
                                            }
                                        </div>

                                        {
                                            collapsed ? null :
                                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                    <ChevronDown size={18} color='#6a7282' />
                                                </span>
                                        }
                                        <span className='invisible absolute z-3 start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 whitespace-nowrap w-fit px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
                                            Sub Systems
                                        </span>
                                    </summary>
                                    <ul className="mt-2 space-y-1 px-4">
                                        <li>
                                            <Link to="/add-subsystem"
                                                className={`group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700`}>

                                                {
                                                    collapsed ? null : <span className="text-sm font-normal text-[#6a7282]">   Add Sub-System</span>
                                                }
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/all-subsystems"
                                                className={`group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700`}>
                                                {
                                                    collapsed ? null : <span className="text-sm font-normal text-[#6a7282]">All Sub-Systems</span>
                                                }
                                            </Link>
                                        </li>
                                    </ul>
                                </details>
                            </li>

                            {/* topic dropdown */}
                            <li>
                                <details className="group [&_summary::-webkit-details-marker]:hidden">
                                    <summary className={`flex cursor-pointer relative items-center ${collapsed ? 'justify-center' : "justify-between"} rounded-lg rounded-sm  px-3 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700`}>
                                        <div className='flex items-center gap-3'>
                                            <List size={18} color='#6a7282' />
                                            {
                                                collapsed ? null : <span className="text-sm font-normal text-[#6a7282]"> Topics </span>
                                            }
                                        </div>

                                        {
                                            collapsed ? null :
                                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                    <ChevronDown size={18} color='#6a7282' />
                                                </span>
                                        }
                                        <span className='invisible absolute z-3 start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 whitespace-nowrap w-fit px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
                                            Topics
                                        </span>
                                    </summary>
                                    <ul className="mt-2 space-y-1 px-4">
                                        <li>
                                            <Link to="/add-topic"
                                                className={`group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700`}>

                                                {
                                                    collapsed ? null : <span className="text-sm font-normal text-[#6a7282]">   Add Topic</span>
                                                }
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/all-topics"
                                                className={`group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700`}>
                                                {
                                                    collapsed ? null : <span className="text-sm font-normal text-[#6a7282]">All Topics</span>
                                                }
                                            </Link>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
                <a href="#"
                    className={`group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700`}>
                    <LogOut size={18} color='#6a7282' />
                    <span className="invisible absolute z-3 start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
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