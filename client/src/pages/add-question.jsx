import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

const AddQuestion = () => {
    // breadcrumb items
    const breadcrumbItems = [
        { label: 'Dashboard', to: '/' },
        { label: 'Add New Question' }
    ]

    return (
        <div className='mx-4'>
            <form>
                <div className="space-y-8 bg-white p-6 shadow-sm sm:rounded-lg mt-5 relative">
                    {/* breadcrumb */}
                    <Breadcrumb items={breadcrumbItems} />

                    {/* content */}
                    <div className="border-b  border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">Question Information</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">Provide details for the new Question.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                            <div className="sm:col-span-1">
                                <label htmlFor="subSystem" className="block mb-1 text-sm/6 font-medium text-gray-900">
                                    Topic
                                </label>

                                <select
                                    id="subSystem"
                                    className="block px-3 py-2.5  w-full rounded-md sm:text-sm outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                >
                                    <option value="">Select a Topic</option>

                                </select>
                            </div>
                            <div className="sm:col-span-1">
                                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                    Sub-System
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        type="text"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                    System
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        type="text"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-1">
                                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                    Subject
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        type="text"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                    Subject
                                </label>
                                <div className="mt-2">
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* actions */}
                    <div className="flex  items-center justify-end gap-x-6">
                        <Link to="/" type="button" className="text-sm/6 font-semibold text-gray-900 cursor-pointer">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="rounded-md flex cursor-pointer items-center gap-2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add Question
                            <Plus size={18} color="#fff" />
                        </button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default AddQuestion