import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { Plus, SquarePen } from "lucide-react"
import { Link } from 'react-router-dom'
const EditTopic = () => {
    const breadcrumbItems = [
        { label: 'Dashboard', to: '/' },
        { label: 'Edit Topic' }
    ]
    return (
        <div className='mx-4'>
            <form>
                <div className="space-y-8 bg-white p-6 shadow-sm sm:rounded-lg mt-5 relative">
                    {/* breadcrumb */}
                    <Breadcrumb items={breadcrumbItems} />

                    {/* content */}
                    <div className="border-b  border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">Edit Topic Information</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">Edit details of the topic.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="sm:col-span-3">
                                <label htmlFor="subject_name" className="block text-sm/6 font-medium text-gray-900">
                                    Topic Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="subject_name"
                                        name="subject_name"
                                        type="text"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* actions */}
                    <div className="flex  items-center justify-end gap-x-6">
                        <Link to="/" type="button" className="text-sm/6 font-semibold text-gray-900 cursor-pointer">
                            Cancel
                        </Link>
                        <Link to="/edit-topic"
                            type="submit"
                            className="rounded-md flex cursor-pointer items-center gap-2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Edit Topic
                            <SquarePen size={18} color="#fff" />
                        </Link>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default EditTopic