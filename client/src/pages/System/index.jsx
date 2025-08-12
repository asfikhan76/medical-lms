import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../../config/api'
import Loader from '../../components/Loader'
import axios from 'axios'
import { SquarePen, Trash2 } from 'lucide-react'
import ConfirmModal from '../../components/ConfirmModal'
import { toast } from 'react-toastify'


const AllSystems = () => {
    const [systems, setSystems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSystem, setSelectedSystem] = useState(null);

    const breadcrumbItems = [
        { label: 'Dashboard', to: '/' },
        { label: 'All Systems' }
    ]
    useEffect(() => {
        const fetchSystems = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/systems`)
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


    const handleDeleteClick = (system) => {
        setSelectedSystem(system);
        setModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        setModalOpen(false);
        try {
            await axios.delete(`${API_BASE_URL}/systems/${selectedSystem._id}`);
            setSystems(prev =>
                prev.filter(sub => sub._id !== selectedSystem._id)
            )
            toast.success('System deleted successfully!')
        }
        catch (err) {
            toast.error('Failed to delete System')
        }
        setSelectedSystem(null);
    };

    const handleCancel = () => {
        setModalOpen(false);
        setSelectedSystem(null);
    };

    return (
        <div className="overflow-x-auto mx-4 bg-white p-6 shadow-sm sm:rounded-lg main-container">
            <Breadcrumb items={breadcrumbItems} />
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">System Name</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Subject Name</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Created at</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        systems.length === 0 ? (
                            <tr>
                                <td colSpan={5} className='px-6 py-4 text-center text-gray-500'>
                                    No Systems found. Would you like to
                                    <Link to={"/add-system"} className='text-blue-500 underline ms-2'>add a new System ?</Link>
                                </td>
                            </tr>
                        ) :
                            (systems.map((system) => (

                                <tr key={system._id} className="border-b border-gray-200">

                                    <td className="px-6 py-4 text-sm text-gray-900">{system.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        <span className='bg-indigo-100 text-indigo-600 p-1 rounded px-2'>{system.subject.name}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">  {new Date(system.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-sm text-blue-500 cursor-pointer">
                                        <div className='flex items-center gap-5'>
                                            <Link to={`/edit-system/${system._id}`} state={{ systemData: system }}>
                                                <SquarePen size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteClick(system)}
                                                className="text-red-500 cursor-pointer" title='Delete'>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )))
                    }
                </tbody>
            </table>
            <ConfirmModal
                isOpen={modalOpen}
                title="Delete System"
                message={`Are you sure you want to delete "${selectedSystem?.name}" ? Deleting this System will automatically delete all Subsystems,Topics associated with it.`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancel}
            />
        </div>
    )
}

export default AllSystems