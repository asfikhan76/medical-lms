import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from '../../config/api'
import Loader from '../../components/Loader'

const AllSubsystems = () => {
    const [subsystems, setSubSystems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const breadcrumbItems = [
        { label: 'Dashboard', to: '/' },
        { label: 'All Sub-Systems' }
    ]

    useEffect(() => {

        const fetchSubSytems = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/subsystems`);
                setSubSystems(response.data);
                setLoading(false)
            } catch (err) {
                setError("Failed to fetch Sub-Systems")
                setLoading(false)
            }
        }
        fetchSubSytems()

    }, [])
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
    if (error) {
        return (
            <div className="overflow-x-auto mx-4 bg-white p-6 shadow-sm sm:rounded-lg mt-5">
                <Breadcrumb items={breadcrumbItems} />
                <div className="mt-7 text-center text-red-500">{error}</div>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto mx-4 bg-white p-6 shadow-sm sm:rounded-lg mt-5">
            <Breadcrumb items={breadcrumbItems} />
            <table className="min-w-full bg-white border border-gray-200 rounded-lg mt-7">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 w-2/5">Sub-System Name</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 w-2/5">System Name</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 w-2/5">Created at</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 w-1/5">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        subsystems.map((subSystem) => (
                            <tr key={subSystem._id} className="border-b border-gray-200">
                                <td className="px-6 py-4 text-sm text-gray-900 w-2/5">{subSystem.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 w-2/5">{subSystem.system.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-500 w-2/5">{new Date(subSystem.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-sm text-blue-500 cursor-pointer w-1/5">
                                    <Link to={`/edit-subsystem/${subSystem._id}`} state={{ subSystemData: subSystem }}>
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div >
    )
}

export default AllSubsystems