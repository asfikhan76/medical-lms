import React from 'react'
import { useSidebar } from '../contexts/SidebarContext'
import { LayoutDashboard, School, LogOut, ChevronDown, Book, Layers, Component, List, PlusCircle, ClipboardList } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'


const Sidebar = () => {
    const { collapsed } = useSidebar();
    const location = useLocation();

    // Define which routes belongs to which dropdown 
    const subjectRoutes = ['/add-subject', '/edit-subject', '/all-subjects']
    const systemRoutes = ['/add-system', '/edit-system', '/all-systems']
    const subSystemRoutes = ['/add-subsystem', '/edit-subsystem', '/all-subsystems']
    const topicRoutes = ['/add-topic', '/edit-topic', '/all-topics']
    const questionRoutes = ['/add-question', '/edit-question', '/all-questions', '/show-question']

    //Check if current Route is in any dropdown
    const isSubjectOpen = subjectRoutes.some(route =>
        location.pathname === route || location.pathname.startsWith(route + '/')
    );
    const isSystemOpen = systemRoutes.some(route =>
        location.pathname === route || location.pathname.startsWith(route + '/')
    );
    const isSubSystemOpen = subSystemRoutes.some(route =>
        location.pathname === route || location.pathname.startsWith(route + '/')
    );
    const isTopicOpen = topicRoutes.some(route =>
        location.pathname === route || location.pathname.startsWith(route + '/')
    );
    const isQuestionOpen = questionRoutes.some(route =>
        location.pathname === route || location.pathname.startsWith(route + '/')
    );

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
                        Ques. Bank
                    </div>
                </div>
                <div className="border-t border-gray-100">
                    <div className="px-2">
                        <div className="py-4">
                            <NavLink to="/"
                                className={({ isActive }) => `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'} rounded-sm px-2 py-1.5
                                ${isActive
                                        ? 'bg-indigo-600 text-white font-semibold'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                    }`}>
                                {({ isActive }) => (
                                    <>
                                        <LayoutDashboard size={18} color={`${isActive ? "#fff" : "#6a7282"}`} />
                                        <span className="invisible absolute z-3 start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                                            Dashboard
                                        </span>
                                        {!collapsed && (
                                            <span
                                                className={`text-sm font-normal ${isActive ? "text-white" : "text-[#6a7282]"
                                                    }`}
                                            >
                                                Dashboard
                                            </span>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        </div>

                        <ul className="space-y-1 border-t border-gray-100 pt-2 p-0">
                            {/* subject dropdown */}
                            <li>
                                <details open={isSubjectOpen} className="group [&_summary::-webkit-details-marker]:hidden">
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
                                                        ? 'bg-indigo-600 text-white  font-semibold'
                                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                                    }`
                                                }
                                            >
                                                {({ isActive }) => collapsed ? null : <span className={`text-sm font-normal flex items-center gap-1 ${isActive} ? 'text-white' : 'text-[#6a7282]'`}>
                                                    <PlusCircle size={16} />
                                                    Add Subject
                                                </span>}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/all-subjects"
                                                className={({ isActive }) =>
                                                    `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5
                                                   ${isActive
                                                        ? 'bg-indigo-600 text-white  font-semibold'
                                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                                    }
                                                `}>
                                                {
                                                    ({ isActive }) => collapsed ? null : <span className={`text-sm font-normal flex items-center gap-1 ${isActive} ? 'text-white' : 'text-[#6a7282]'`}>
                                                        <List size={16} />
                                                        All Subjects</span>
                                                }
                                            </NavLink>
                                        </li>
                                    </ul>
                                </details>
                            </li>

                            {/* system dropdown */}
                            <li>
                                <details open={isSystemOpen} className="group [&_summary::-webkit-details-marker]:hidden">
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
                                            <NavLink to="/add-system"
                                                className={({ isActive }) => `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5
                                                ${isActive
                                                        ? 'bg-indigo-600 text-white font-semibold'
                                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                                    }`}>

                                                {
                                                    ({ isActive }) => collapsed ? null : <span className={`text-sm font-normal flex items-center gap-1 ${isActive} ? 'text-white' : 'text-[#6a7282]'`}>
                                                        <PlusCircle size={16} />
                                                        Add System</span>
                                                }
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/all-systems"
                                                className={({ isActive }) => `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5
                                                ${isActive
                                                        ? 'bg-indigo-600 text-white  font-semibold'
                                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                                    }`}>
                                                {
                                                    ({ isActive }) => collapsed ? null : <span className={`text-sm font-normal flex items-center gap-1 ${isActive} ? 'text-white' : 'text-[#6a7282]'`}>
                                                        <List size={16} />
                                                        All Systems</span>
                                                }
                                            </NavLink>
                                        </li>
                                    </ul>
                                </details>
                            </li>

                            {/* Subsystem dropdown */}
                            <li>
                                <details open={isSubSystemOpen} className="group [&_summary::-webkit-details-marker]:hidden">
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
                                            <NavLink to="/add-subsystem"
                                                className={({ isActive }) => `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5
                                                ${isActive
                                                        ? 'bg-indigo-600 text-white font-semibold'
                                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                                    }`}>

                                                {
                                                    ({ isActive }) => collapsed ? null : <span className={`text-sm font-normal flex items-center gap-1 ${isActive} ? 'text-white' : 'text-[#6a7282]'`}>
                                                        <PlusCircle size={16} />
                                                        Add S-System</span>
                                                }
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/all-subsystems"
                                                className={({ isActive }) => `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5
                                                ${isActive
                                                        ? 'bg-indigo-600 text-white font-semibold'
                                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                                    }`}>
                                                {
                                                    ({ isActive }) => collapsed ? null : <span className={`text-sm font-normal flex items-center gap-1 ${isActive} ? 'text-white' : 'text-[#6a7282]'`}>
                                                        <List size={16} />
                                                        All S-Systems</span>
                                                }
                                            </NavLink>
                                        </li>
                                    </ul>
                                </details>
                            </li>

                            {/* topic dropdown */}
                            <li>
                                <details open={isTopicOpen} className="group [&_summary::-webkit-details-marker]:hidden">
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
                                            <NavLink to="/add-topic"
                                                className={({ isActive }) => `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5
                                                ${isActive
                                                        ? 'bg-indigo-600 text-white font-semibold'
                                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                                    }`}>

                                                {
                                                    ({ isActive }) => collapsed ? null : <span className={`text-sm flex items-center gap-1 font-normal ${isActive} ? 'text-white' : 'text-[#6a7282]'`}>
                                                        <PlusCircle size={16} />
                                                        Add Topic</span>
                                                }
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/all-topics"
                                                className={({ isActive }) => `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5
                                                ${isActive
                                                        ? 'bg-indigo-600 text-white font-semibold'
                                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                                    }`}>
                                                {
                                                    ({ isActive }) => collapsed ? null : <span className={`text-sm font-normal flex items-center gap-1 ${isActive} ? 'text-white' : 'text-[#6a7282]'`}>
                                                        <List size={16} />
                                                        All Topics</span>
                                                }
                                            </NavLink>
                                        </li>
                                    </ul>
                                </details>
                            </li>

                            {/* Question dropdown */}
                            <li>
                                <details open={isQuestionOpen} className="group [&_summary::-webkit-details-marker]:hidden">
                                    <summary className={`flex cursor-pointer relative items-center ${collapsed ? 'justify-center' : "justify-between"} rounded-lg rounded-sm  px-3 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700`}>
                                        <div className='flex items-center gap-3'>
                                            <ClipboardList size={18} color='#6a7282' />
                                            {
                                                collapsed ? null : <span className="text-sm font-normal text-[#6a7282]"> Questions </span>
                                            }
                                        </div>

                                        {
                                            collapsed ? null :
                                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                                    <ChevronDown size={18} color='#6a7282' />
                                                </span>
                                        }
                                        <span className='invisible absolute z-3 start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 whitespace-nowrap w-fit px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
                                            Questions
                                        </span>
                                    </summary>
                                    <ul className="mt-2 space-y-1 px-4">
                                        <li>
                                            <NavLink to="/add-question"
                                                className={({ isActive }) => `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5
                                                ${isActive
                                                        ? 'bg-indigo-600 text-white font-semibold'
                                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                                    }`}>

                                                {
                                                    ({ isActive }) => collapsed ? null : <span className={`text-sm flex items-center gap-1 font-normal ${isActive} ? 'text-white' : 'text-[#6a7282]'`}>
                                                        <PlusCircle size={16} />
                                                        Add Question</span>
                                                }
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/all-questions"
                                                className={({ isActive }) => `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5
                                                ${isActive
                                                        ? 'bg-indigo-600 text-white font-semibold'
                                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                                    }`}>
                                                {
                                                    ({ isActive }) => collapsed ? null : <span className={`text-sm font-normal flex items-center gap-1 ${isActive} ? 'text-white' : 'text-[#6a7282]'`}>
                                                        <List size={16} />
                                                        All Questions</span>
                                                }
                                            </NavLink>
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