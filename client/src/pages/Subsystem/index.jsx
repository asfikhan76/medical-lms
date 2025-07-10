import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from '../../config/api'
import Loader from '../../components/Loader'
import ConfirmModal from '../../components/confirmModal'
import { toast } from 'react-toastify'
import { SquarePen, Trash2 } from 'lucide-react'

const AllSubsystems = () => {
    const [subsystems, setSubSystems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSubSystem, setSelectedSubSystem] = useState(null);


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

    const handleDeleteClick = (subSystem) => {
        setSelectedSubSystem(subSystem);
        setModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        setModalOpen(false);
        try {
            await axios.delete(`${API_BASE_URL}/subsystems/${selectedSubSystem._id}`);
            setSubSystems(prev =>
                prev.filter(sub => sub._id !== selectedSubSystem._id)
            )
            toast.success('Sub-Sytem deleted successfully!')
        }
        catch (err) {
            toast.error('Failed to delete Sub-System')
        }
        setSelectedSubSystem(null);
    };

    const handleCancel = () => {
        setModalOpen(false);
        setSelectedSubSystem(null);
    };

    return (
        <div className="overflow-x-auto mx-4 bg-white p-6 shadow-sm sm:rounded-lg main-container">
            <Breadcrumb items={breadcrumbItems} />
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 ">Sub-System Name</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 ">System Name</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 ">Subject Name</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 ">Created at</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        subsystems.length === 0 ? (
                            <tr>
                                <td colSpan={5} className='px-6 py-4 text-center text-gray-500'>
                                    No Sub-Systems found. Would you like to
                                    <Link to={"/add-subsystem"} className='text-blue-500 underline ms-2'>add a new Sub-System ?</Link>
                                </td>
                            </tr>
                        ) :
                            (subsystems.map((subSystem) => (
                                <tr key={subSystem._id} className="border-b border-gray-200">
                                    <td className="px-6 py-4 text-sm text-gray-900 ">{subSystem.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 ">{subSystem.system?.name || "-"}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900 ">{subSystem.system?.subject?.name || "-"}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 ">{new Date(subSystem.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-sm text-blue-500 cursor-pointer">
                                        <div className='flex items-center gap-5'>
                                            <Link to={`/edit-subsystem/${subSystem._id}`} title='Edit' state={{ subSystemData: subSystem }}>
                                                <SquarePen size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteClick(subSystem)}
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
                title="Delete Sub-System"
                message={`Are you sure you want to delete "${selectedSubSystem?.name}" ? Deleting this subsystem will automatically delete all Topics associated with it.`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancel}
            />
        </div >
    )
}

export default AllSubsystems