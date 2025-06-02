import React,{useState,useEffect} from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { Link } from 'react-router-dom'
import { SYSTEM_API } from '../../config/api'
import Loader from '../../components/Loader'
import axios from 'axios'

const AllSystems = () => {
    const [systems, setSystems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const breadcrumbItems = [
        { label: 'Dashboard', to: '/' },
        { label: 'All Systems' }
    ]
    useEffect(() => {
        const fetchSystems = async () => {
            try {
                const response = await axios.get(SYSTEM_API)
                console.log(response.data)
                setSystems(response.data)
                setLoading(false)
            } catch (err) {
                setError('Failed to fetch systems')
                setLoading(false)
            }
        }

        fetchSystems()
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
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 w-2/5">System Name</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 w-2/5">Created at</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 w-1/5">Subject Name</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 w-1/5">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        systems.map((system) => (
                            <tr key={system._id} className="border-b border-gray-200">

                                <td className="px-6 py-4 text-sm text-gray-900 w-2/5">{system.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-500 w-2/5">  {new Date(system.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 w-2/5">{system.subject.name}</td>
                                <td className="px-6 py-4 text-sm text-blue-500 cursor-pointer w-1/5">
                                    <Link to={`/edit-system/${system._id}`} state={{ systemData: system }}>
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AllSystems