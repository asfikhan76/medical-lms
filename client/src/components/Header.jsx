import React from 'react'
import { Plus, BetweenHorizontalStart, BetweenHorizontalEnd } from 'lucide-react'
const Header = ({ collapsed, setCollapsed }) => {
    return (
        <header className="bg-white m-3 mx-4 rounded-lg shadow-sm">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                <button className='cursor-pointer' onClick={() => setCollapsed(!collapsed)}>
                    {
                        collapsed ? <BetweenHorizontalStart size={22} color='#6a7282' /> : <BetweenHorizontalEnd size={22} color='#6a7282' />
                    }
                </button>
                <div className="flex flex-1 items-center justify-end md:justify-between">
                    <nav aria-label="Global" className="hidden md:block">
                        <ul className="flex items-center gap-6 text-sm">
                            <li>
                                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> About </a>
                            </li>

                            <li>
                                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Careers </a>
                            </li>

                            <li>
                                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> History </a>
                            </li>

                            <li>
                                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Services </a>
                            </li>

                            <li>
                                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Projects </a>
                            </li>

                            <li>
                                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Blog </a>
                            </li>
                        </ul>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="sm:flex sm:gap-4">
                            <a className="flex items-center gap-2 rounded-md bg-blue-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                                href="#"  >
                                Add New Test
                                <Plus size={18} color="#fff" />
                            </a>

                            <a className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-blue-500 transition hover:text-blue-600 sm:block"
                                href="#" >
                                Logout
                            </a>
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