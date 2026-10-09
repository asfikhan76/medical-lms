import React, { useState, useEffect } from 'react'
import Breadcrumb from '@components/Breadcrumb'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from '@config/api'
import Loader from "@components/Loader"
import { SquarePen, Trash2 } from 'lucide-react'
import ConfirmModal from '@components/ConfirmModal'
import { toast } from 'react-toastify'


const AllSubjects = () => {
    const [subjects, setSubjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);



    // Breadcrumb
    const breadcrumbItems = [
        { label: 'Dashboard', to: '/' },
        { label: 'All Subjects' }
    ]

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/subjects`)
                setSubjects(response.data)
                setLoading(false)
            } catch (err) {
                setError('Failed to fetch subjects')
                setLoading(false)
            }
        }

        fetchSubjects()
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

    const handleDeleteClick = (subject) => {
        setSelectedSubject(subject)
        setModalOpen(true)
    }


    const handleConfirmDelete = async () => {
        setModalOpen(false)
        try {
            await axios.delete(`${API_BASE_URL}/subjects/${selectedSubject._id}`);
            setSubjects(prev =>
                prev.filter(sub => sub._id !== selectedSubject._id)
            )
            toast.success('Subject deleted successfully!')
        } catch (err) {
            toast.error('Failed to delete Subject')
        }
        setSelectedSubject(null)
    }


    const handleCancel = () => {
        setModalOpen(false)
        setSelectedSubject(null)
    }

    return (
        <div className="overflow-auto bg-white p-6 shadow-sm sm:rounded-lg main-container">
            <Breadcrumb items={breadcrumbItems} />
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 w-2/5">Subject Name</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 w-2/5">Created at</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 w-1/5">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        subjects.length === 0 ? (
                            <tr>
                                <td colSpan={5} className='px-6 py-4 text-center text-gray-500'>
                                    No Subjects found. Would you like to
                                    <Link to={"/add-subject"} className='text-blue-500 underline ms-2'>add a new Subject ?</Link>
                                </td>
                            </tr>
                        ) :
                            (subjects.map((subject) => (
                                <tr key={subject._id} className="border-b border-gray-200">

                                    <td className="px-6 py-4 text-sm text-gray-900 w-2/5">{subject.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 w-2/5">  {new Date(subject.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-sm text-blue-500 cursor-pointer w-1/5">
                                        <div className='flex items-center gap-5'>
                                            <Link to={`/admin/edit-subject/${subject._id}`} state={{ subjectData: subject }}>
                                                <SquarePen size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteClick(subject)}
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
                title="Delete Subject"
                message={`Are you sure you want to delete "${selectedSubject?.name}" ? Deleting this Subject will automatically delete all Systems,Subsystems,Topics associated with it.`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancel}
            />
        </div>
    )
}

export default AllSubjects