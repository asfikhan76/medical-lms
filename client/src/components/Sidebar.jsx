import React, { useEffect, useState } from 'react'
import { useSidebar } from '../contexts/SidebarContext'
import {
    LayoutDashboard,
    School,
    LogOut,
    ChevronDown,
    Book,
    Layers,
    Component,
    List,
    PlusCircle,
    ClipboardList,
    Users,
    FileText,
    Settings
} from 'lucide-react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Sidebar = ({ userRole }) => {
    const { collapsed } = useSidebar();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { pathname } = useLocation()

    const [isUserOpen, setIsUserOpen] = useState(false);
    const [isSubjectOpen, setIsSubjectOpen] = useState(false);
    const [isSystemOpen, setIsSystemOpen] = useState(false);
    const [isSubsystemOpen, setIsSubsystemOpen] = useState(false);
    const [isTopicOpen, setIsTopicOpen] = useState(false);
    const [isQuestionOpen, setIsQuestionOpen] = useState(false);

    useEffect(() => {
        const p = pathname.toLowerCase();
        setIsSubjectOpen(p.includes('subject'));
        setIsSystemOpen(p.includes('system') && !p.includes('subsystem'));
        setIsSubsystemOpen(p.includes('subsystem'));
        setIsTopicOpen(p.includes('topic'));
        setIsQuestionOpen(p.includes('question'));
    }, [pathname])

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // Render admin sidebar with all dropdowns
    const renderAdminSidebar = () => (
        <>
            {/* Users Dropdown */}
            <li>
                <details open={isUserOpen} className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className={`flex cursor-pointer relative items-center ${collapsed ? 'justify-center' : "justify-between"} rounded-lg rounded-sm  px-3 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700`}>
                        <div className='flex items-center gap-3'>
                            <Users size={18} color='#6a7282' />
                            {!collapsed && <span className="text-sm font-normal text-[#6a7282]"> Users </span>}
                        </div>
                        {!collapsed && (
                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <ChevronDown size={18} color='#6a7282' />
                            </span>
                        )}
                        <span className='invisible absolute z-3 start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 whitespace-nowrap w-fit px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
                            Users
                        </span>
                    </summary>
                    <ul className="mt-2 space-y-1 px-4">
                        <li>
                            <NavLink to="/admin/all-users" className={({ isActive }) =>
                                `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5
                                ${isActive ? 'bg-indigo-600 text-white  font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
                                {({ isActive }) => !collapsed && <span className={`text-sm font-normal flex items-center gap-1 ${isActive ? 'text-white' : 'text-[#6a7282]'}`}>
                                    <List size={16} />
                                    All Users
                                </span>}
                            </NavLink>
                        </li>
                    </ul>
                </details>
            </li>

            {/* Subjects Dropdown */}
            <li>
                <details open={isSubjectOpen} onToggle={(e) => setIsSubjectOpen(e.currentTarget.open)} className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className={`flex cursor-pointer relative items-center ${collapsed ? 'justify-center' : "justify-between"} rounded-lg rounded-sm  px-3 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700`}>
                        <div className='flex items-center gap-3'>
                            <Book size={18} color='#6a7282' />
                            {!collapsed && <span className="text-sm font-normal text-[#6a7282]"> Subjects </span>}
                        </div>
                        {!collapsed && (
                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <ChevronDown size={18} color='#6a7282' />
                            </span>
                        )}
                        <span className='invisible absolute z-3 start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 whitespace-nowrap w-fit px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
                            Subjects
                        </span>
                    </summary>
                    <ul className="mt-2 space-y-1 px-4">
                        <li>
                            <NavLink to="/admin/add-subject" className={({ isActive }) =>
                                `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'} rounded-sm px-2 py-1.5
                                ${isActive ? 'bg-indigo-600 text-white  font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
                                {({ isActive }) => !collapsed && <span className={`text-sm font-normal flex items-center gap-1 ${isActive ? 'text-white' : 'text-[#6a7282]'}`}>
                                    <PlusCircle size={16} />
                                    Add Subject
                                </span>}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/all-subjects" className={({ isActive }) =>
                                `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5
                                ${isActive ? 'bg-indigo-600 text-white  font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
                                {({ isActive }) => !collapsed && <span className={`text-sm font-normal flex items-center gap-1 ${isActive ? 'text-white' : 'text-[#6a7282]'}`}>
                                    <List size={16} />
                                    All Subjects
                                </span>}
                            </NavLink>
                        </li>
                    </ul>
                </details>
            </li>

            {/* Systems Dropdown */}
            <li>
                <details open={isSystemOpen} onToggle={(e) => setIsSystemOpen(e.currentTarget.open)} className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className={`flex cursor-pointer relative items-center ${collapsed ? 'justify-center' : "justify-between"} rounded-lg rounded-sm  px-3 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700`}>
                        <div className='flex items-center gap-3'>
                            <Layers size={18} color='#6a7282' />
                            {!collapsed && <span className="text-sm font-normal text-[#6a7282]"> Systems </span>}
                        </div>
                        {!collapsed && (
                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <ChevronDown size={18} color='#6a7282' />
                            </span>
                        )}
                        <span className='invisible absolute z-3 start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 whitespace-nowrap w-fit px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
                            Systems
                        </span>
                    </summary>
                    <ul className="mt-2 space-y-1 px-4">
                        <li>
                            <NavLink to="/admin/add-system" className={({ isActive }) =>
                                `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'} rounded-sm px-2 py-1.5
                                ${isActive ? 'bg-indigo-600 text-white  font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
                                {({ isActive }) => !collapsed && <span className={`text-sm font-normal flex items-center gap-1 ${isActive ? 'text-white' : 'text-[#6a7282]'}`}>
                                    <PlusCircle size={16} />
                                    Add System
                                </span>}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/all-systems" className={({ isActive }) =>
                                `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5
                                ${isActive ? 'bg-indigo-600 text-white  font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
                                {({ isActive }) => !collapsed && <span className={`text-sm font-normal flex items-center gap-1 ${isActive ? 'text-white' : 'text-[#6a7282]'}`}>
                                    <List size={16} />
                                    All Systems
                                </span>}
                            </NavLink>
                        </li>
                    </ul>
                </details>
            </li>

            {/* Subsystems Dropdown */}
            <li>
                <details open={isSubsystemOpen} onToggle={(e) => setIsSubsystemOpen(e.currentTarget.open)} className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className={`flex cursor-pointer relative items-center ${collapsed ? 'justify-center' : "justify-between"} rounded-lg rounded-sm  px-3 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700`}>
                        <div className='flex items-center gap-3'>
                            <Component size={18} color='#6a7282' />
                            {!collapsed && <span className="text-sm font-normal text-[#6a7282]"> Subsystems </span>}
                        </div>
                        {!collapsed && (
                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <ChevronDown size={18} color='#6a7282' />
                            </span>
                        )}
                        <span className='invisible absolute z-3 start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 whitespace-nowrap w-fit px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
                            Subsystems
                        </span>
                    </summary>
                    <ul className="mt-2 space-y-1 px-4">
                        <li>
                            <NavLink to="/admin/add-subsystem" className={({ isActive }) =>
                                `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'} rounded-sm px-2 py-1.5
                                ${isActive ? 'bg-indigo-600 text-white  font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
                                {({ isActive }) => !collapsed && <span className={`text-sm font-normal flex items-center gap-1 ${isActive ? 'text-white' : 'text-[#6a7282]'}`}>
                                    <PlusCircle size={16} />
                                    Add Subsystem
                                </span>}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/all-subsystems" className={({ isActive }) =>
                                `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5
                                ${isActive ? 'bg-indigo-600 text-white  font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
                                {({ isActive }) => !collapsed && <span className={`text-sm font-normal flex items-center gap-1 ${isActive ? 'text-white' : 'text-[#6a7282]'}`}>
                                    <List size={16} />
                                    All Subsystems
                                </span>}
                            </NavLink>
                        </li>
                    </ul>
                </details>
            </li>

            {/* Topics Dropdown */}
            <li>
                <details open={isTopicOpen} onToggle={(e) => setIsTopicOpen(e.currentTarget.open)} className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className={`flex cursor-pointer relative items-center ${collapsed ? 'justify-center' : "justify-between"} rounded-lg rounded-sm  px-3 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700`}>
                        <div className='flex items-center gap-3'>
                            <FileText size={18} color='#6a7282' />
                            {!collapsed && <span className="text-sm font-normal text-[#6a7282]"> Topics </span>}
                        </div>
                        {!collapsed && (
                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <ChevronDown size={18} color='#6a7282' />
                            </span>
                        )}
                        <span className='invisible absolute z-3 start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 whitespace-nowrap w-fit px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
                            Topics
                        </span>
                    </summary>
                    <ul className="mt-2 space-y-1 px-4">
                        <li>
                            <NavLink to="/admin/add-topic" className={({ isActive }) =>
                                `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'} rounded-sm px-2 py-1.5
                                ${isActive ? 'bg-indigo-600 text-white  font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
                                {({ isActive }) => !collapsed && <span className={`text-sm font-normal flex items-center gap-1 ${isActive ? 'text-white' : 'text-[#6a7282]'}`}>
                                    <PlusCircle size={16} />
                                    Add Topic
                                </span>}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/all-topics" className={({ isActive }) =>
                                `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5
                                ${isActive ? 'bg-indigo-600 text-white  font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
                                {({ isActive }) => !collapsed && <span className={`text-sm font-normal flex items-center gap-1 ${isActive ? 'text-white' : 'text-[#6a7282]'}`}>
                                    <List size={16} />
                                    All Topics
                                </span>}
                            </NavLink>
                        </li>
                    </ul>
                </details>
            </li>

            {/* Questions Dropdown */}
            <li>
                <details open={isQuestionOpen} onToggle={(e) => setIsQuestionOpen(e.currentTarget.open)} className="group [&_summary::-webkit-details-marker]:hidden">
                    <summary className={`flex cursor-pointer relative items-center ${collapsed ? 'justify-center' : "justify-between"} rounded-lg rounded-sm  px-3 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700`}>
                        <div className='flex items-center gap-3'>
                            <ClipboardList size={18} color='#6a7282' />
                            {!collapsed && <span className="text-sm font-normal text-[#6a7282]"> Questions </span>}
                        </div>
                        {!collapsed && (
                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                <ChevronDown size={18} color='#6a7282' />
                            </span>
                        )}
                        <span className='invisible absolute z-3 start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 whitespace-nowrap w-fit px-2 py-1.5 text-xs font-medium text-white group-hover:visible'>
                            Questions
                        </span>
                    </summary>
                    <ul className="mt-2 space-y-1 px-4">
                        <li>
                            <NavLink to="/admin/add-question" className={({ isActive }) =>
                                `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'} rounded-sm px-2 py-1.5
                                ${isActive ? 'bg-indigo-600 text-white  font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
                                {({ isActive }) => !collapsed && <span className={`text-sm font-normal flex items-center gap-1 ${isActive ? 'text-white' : 'text-[#6a7282]'}`}>
                                    <PlusCircle size={16} />
                                    Add Question
                                </span>}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/all-questions" className={({ isActive }) =>
                                `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'}  rounded-sm  px-2 py-1.5
                                ${isActive ? 'bg-indigo-600 text-white  font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
                                {({ isActive }) => !collapsed && <span className={`text-sm font-normal flex items-center gap-1 ${isActive ? 'text-white' : 'text-[#6a7282]'}`}>
                                    <List size={16} />
                                    All Questions
                                </span>}
                            </NavLink>
                        </li>
                    </ul>
                </details>
            </li>
        </>
    );

    // Render student sidebar
    const renderStudentSidebar = () => (
        <>
            {/* Plan Dropdown */}
            <li>
                <NavLink to="/student/plan" className={({ isActive }) =>
                    `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'} rounded-sm px-2 py-1.5
                    ${isActive ? 'bg-indigo-600 text-white font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
                    {({ isActive }) => (
                        <>
                            <Book size={18} color={`${isActive ? "#fff" : "#6a7282"}`} />
                            {!collapsed && <span className={`text-sm font-normal ${isActive ? "text-white" : "text-[#6a7282]"}`}>
                                My Plan
                            </span>}
                        </>
                    )}
                </NavLink>
            </li>

            {/* Test Dropdown */}
            <li>
                <NavLink to="/student/tests" className={({ isActive }) =>
                    `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'} rounded-sm px-2 py-1.5
                    ${isActive ? 'bg-indigo-600 text-white font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
                    {({ isActive }) => (
                        <>
                            <ClipboardList size={18} color={`${isActive ? "#fff" : "#6a7282"}`} />
                            {!collapsed && <span className={`text-sm font-normal ${isActive ? "text-white" : "text-[#6a7282]"}`}>
                                Tests
                            </span>}
                        </>
                    )}
                </NavLink>
            </li>
        </>
    );

    return (
        <div className={`flex h-screen ${collapsed ? 'w-16' : 'w-56'} flex-col justify-between border-e border-gray-100 shadow-sm relative`}>
            <div>
                <div className="flex items-center justify-center py-3">
                    <div className="grid size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
                        <School size={25} color='#28282B' />
                    </div>
                    {!collapsed && (
                        <div className="text-lg font-semibold whitespace-nowrap text-gray-800 ms-2">
                            Ques. Bank
                        </div>
                    )}
                </div>

                <div className="border-t border-gray-100">
                    <div className="px-2">
                        <div className="py-4">
                            {/* Dashboard link based on role */}
                            <NavLink to={userRole === 'admin' ? '/admin/dashboard' : '/student/dashboard'}
                                className={({ isActive }) => `group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'} rounded-sm px-2 py-1.5
                                ${isActive ? 'bg-indigo-600 text-white font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}>
                                {({ isActive }) => (
                                    <>
                                        <LayoutDashboard size={18} color={`${isActive ? "#fff" : "#6a7282"}`} />
                                        {!collapsed && (
                                            <span className={`text-sm font-normal ${isActive ? "text-white" : "text-[#6a7282]"}`}>
                                                Dashboard
                                            </span>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        </div>

                        <ul className="space-y-1 border-t border-gray-100 pt-2 p-0">
                            {/* Render different sidebar content based on user role */}
                            {userRole === 'admin' ? renderAdminSidebar() : renderStudentSidebar()}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Logout button */}
            <div className="border-t border-gray-100 p-2">
                <button
                    onClick={handleLogout}
                    className={`group relative flex ${collapsed ? 'justify-center' : 'justify-start items-center gap-3 px-3'} rounded-sm px-2 py-1.5 text-gray-500 cursor-pointer hover:bg-gray-50 hover:text-gray-700 w-full`}
                >
                    <LogOut size={18} color='#6a7282' />
                    {!collapsed && <span className="text-sm font-normal text-[#6a7282]">Logout</span>}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;