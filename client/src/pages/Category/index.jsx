import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { Link } from 'react-router-dom'

const AllCategories = () => {
    const breadcrumbItems = [
        { label: 'Dashboard', to: '/' },
        { label: 'All Categories' }
    ]
    return (
        <div className="overflow-x-auto mx-4 bg-white p-6 shadow-sm sm:rounded-lg mt-5">
            <Breadcrumb items={breadcrumbItems} />
            <table className="min-w-full bg-white border border-gray-200 rounded-lg mt-7">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 w-2/5">Category Name</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 w-2/5">Created at</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 w-1/5">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-gray-200">
                        <td className="px-6 py-4 text-sm text-gray-900 w-2/5">Immunology</td>
                        <td className="px-6 py-4 text-sm text-gray-500 w-2/5">12 Jan 2025</td>
                        <td className="px-6 py-4 text-sm text-blue-500 cursor-pointer w-1/5">
                            <Link to="/edit-category">
                                Edit
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default AllCategories