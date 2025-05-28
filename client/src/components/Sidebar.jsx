import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, School, Settings, Users, Layers, FileUser, FilePlus } from 'lucide-react'


const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(true)
    return (
        <div className={`flex h-screen ${collapsed ? 'w-16' : 'w-48'} flex-col  justify-between border-e border-gray-100 relative`}>
            <div>
                <div className="inline-flex size-16 items-center justify-center">

                    {/* logo icon */}
                    <span className="grid size-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
                        <School size={25} color='#28282B' />
                    </span>

                    {/* toggle btn */}
                    <span onClick={() => setCollapsed(!collapsed)} className='h-4 w-4 flex text-white items-center justify-center rounded-full bg-blue-500 absolute top-8 right-0 translate-x-1/2 -translate-y-1/2 border border-white shadow-sm'>
                        {
                            collapsed ? <ChevronRight /> : <ChevronLeft />
                        }
                    </span>
                </div>
                <div className="border-t border-gray-100">
                    <div className="px-2">
                        <div className="py-4">
                            <a href="#"
                                className="t group relative flex justify-center rounded-sm bg-blue-50 px-2 py-1.5 text-blue-700">
                                <Settings size={18} color='#6a7282' />
                                <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                                    General
                                </span>
                            </a>
                        </div>

                        <ul className="space-y-1 border-t border-gray-100 pt-4">
                            <li>
                                <a
                                    href="#"
                                    className="group relative flex justify-center rounded-sm px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                >
                                    <Users size={18} color='#6a7282' />
                                    <span
                                        className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                    >
                                        Students
                                    </span>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="group relative flex justify-center rounded-sm px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                >
                                    <Layers size={18} color='#6a7282' />

                                    <span
                                        className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white w-fit whitespace-nowrap group-hover:visible"
                                    >
                                        All Tests
                                    </span>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="group relative flex justify-center rounded-sm px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                >
                                    <FileUser size={18} color='#6a7282' />
                                    <span
                                        className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                    >
                                        Results
                                    </span>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="group relative flex justify-center rounded-sm px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                >
                                    <FilePlus size={18} color='#6a7282' />

                                    <span
                                        className="invisible absolute w-fit whitespace-nowrap start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                                    >
                                        Add Test
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
                <a
                    href="#"
                    className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5 opacity-75"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                    </svg>

                    <span
                        className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
                    >
                        Logout
                    </span>
                </a>
            </div>
        </div>
    )
}

export default Sidebar