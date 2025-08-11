import React, { useEffect, useState } from "react"
import Breadcrumb from "../../components/Breadcrumb"
import axios from "axios"
import { API_BASE_URL } from "../../config/api"
import Loader from "../../components/Loader"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

const AllUsers = () => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { isAuth } = useAuth()


    // Breadcrumbs
    const breadcrumbItems = [
        { label: 'Dashboard', to: '/' },
        { label: 'All Users' }
    ]

    // fetching all users
    useEffect(() => {
        if (!isAuth) return;

        const fetchUsers = async () => {
            setError(null)
            setLoading(true)
            try {
                const response = await axios.get(`${API_BASE_URL}/users`)
                // API returns { success, count, data }
                const data = Array.isArray(response?.data?.data)
                    ? response.data.data
                    : Array.isArray(response?.data)
                        ? response.data
                        : []
                setUsers(data)
            } catch (err) {
                const message = err?.response?.data?.message || err?.response?.data?.error || "Failed to fetch Users"
                setError(message)
            } finally {
                setLoading(false)
            }
        }
        fetchUsers()
    }, [isAuth])

    // Handling Loading State
    if (loading) {
        return (
            <div className="overflow-x-auto mx-4 bg-white p-6 shadow-sm sm:rounded-lg mt-5">
                <Breadcrumb items={breadcrumbItems} />
                <div className='flex items-center justify-center min-h-40'>
                    <Loader />
                </div>
            </div>
        )
    }

    // Handling Error State
    if (error) {
        return (
            <div className="overflow-x-auto mx-4 bg-white p-6 shadow-sm sm:rounded-lg mt-5">
                <Breadcrumb items={breadcrumbItems} />
                <div className="mt-7 text-center text-red-500">{error}</div>
            </div>
        )
    }



    return (
        <div className="overflow-x-auto mx-4 bg-white p-6 shadow-sm sm:rounded-lg main-container">
            <Breadcrumb items={breadcrumbItems} />
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">User Name</th>
                        <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Email</th>
                        <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Phone</th>
                        <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Role</th>
                        <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Created at</th>
                        <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.length === 0 ?
                            <tr>
                                <td colSpan={6} className='px-6 py-4 text-center text-gray-500'>
                                    No User found.
                                </td>
                            </tr>
                            : (users.map((user) => (
                                <tr key={user._id} className="border-b border-gray-200">
                                    <td className="px-6 py-4 text-sm text-gray-900 max-w-80">
                                        <div className='line-clamp-2'>
                                            {user.username}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 max-w-48 text-center">
                                        <span className='bg-yellow-100 text-yellow-600 p-1 rounded px-2'>{user.email}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 max-w-48 text-center">
                                        <span className='bg-green-100 text-green-600 p-1 rounded px-2'>{user.phone || '-'}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 max-w-48 text-center">
                                        <span className='bg-indigo-100 text-indigo-600 p-1 rounded px-2'>{user.role}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 text-center">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</td>
                                    <td className="px-6 py-4 text-sm text-blue-500 cursor-pointer">
                                        <div className='flex items-center justify-center gap-5'>
                                            <Link to={`/edit-user/${user._id}`} title='Edit' state={{ userData: user }}>
                                                Edit
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )))
                    }

                </tbody>
            </table>
        </div>
    )
}

export default AllUsers