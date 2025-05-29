import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { Plus } from "lucide-react"
const AddSubject = () => {
    const breadcrumbItems = [
        { label: 'Dashboard', to: '/' },
        { label: 'Add New Subject' }
    ]
    return (
        <div className='mx-4'>
            <form>
                <div className="space-y-12 bg-white p-6 shadow-sm sm:rounded-lg mt-5 relative">
                    <Breadcrumb items={breadcrumbItems} />
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">Subject Information</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">Provide details for the new subject.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="subject_name" className="block text-sm/6 font-medium text-gray-900">
                                    Subject Name
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

                    <div className="flex items-center justify-end gap-x-6">
                        <button type="button" className="text-sm/6 font-semibold text-gray-900">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md flex items-center gap-2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add Subject
                            <Plus size={18} color="#fff" />
                        </button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default AddSubject