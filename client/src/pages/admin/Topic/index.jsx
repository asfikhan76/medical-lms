import React, { useEffect, useState } from 'react'
import Breadcrumb from '@components/Breadcrumb'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { API_BASE_URL } from '@config/api';
import Loader from '@components/Loader';
import { SquarePen, Trash2 } from 'lucide-react';
import ConfirmModal from '@components/ConfirmModal';

const AllTopics = () => {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);

    // Breadcrumbs
    const breadcrumbItems = [
        { label: 'Dashboard', to: '/' },
        { label: 'All Topics' }
    ]

    // Fetching Topic List
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/topics`)
                setTopics(response.data)
                setLoading(false)
            } catch (error) {
                setError("Failed to fetch Topics")
                setLoading(false)
            }
        }
        fetchTopics()
    }, [])

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

    // Handling Deleting Topic State
    const handleDeleteClick = (topic) => {
        setSelectedTopic(topic);
        setModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        setModalOpen(false);
        try {
            await axios.delete(`${API_BASE_URL}/topics/${selectedTopic._id}`);
            setTopics(prev =>
                prev.filter(sub => sub._id !== selectedTopic._id)
            )
            toast.success('Sub-Sytem deleted successfully!')
        }
        catch (err) {
            toast.error('Failed to delete Sub-System')
        }
        setSelectedTopic(null);
    };

    const handleCancel = () => {
        setModalOpen(false);
        setSelectedTopic(null);
    };


    return (
        <div className="overflow-x-auto mx-4 bg-white p-6 shadow-sm sm:rounded-lg main-container">
            <Breadcrumb items={breadcrumbItems} />
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Topic Name</th>
                        <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Sub-System Name</th>
                        <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">System Name</th>
                        <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Subject Name</th>
                        <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Created at</th>
                        <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        topics.length === 0 ?
                            <tr>
                                <td colSpan={5} className='px-6 py-4 text-center text-gray-500'>
                                    No Topics found. Would you like to
                                    <Link to={"/add-topic"} className='text-blue-500 underline ms-2'>add a new Topic ?</Link>
                                </td>
                            </tr>
                            : (topics.map((topic) => (
                                <tr key={topic._id} className="border-b border-gray-200">
                                    <td className="px-6 py-4 text-sm text-gray-900 max-w-80">
                                        <div className='line-clamp-2'>
                                            {topic.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 max-w-48 text-center">
                                        <span className='bg-yellow-100 text-yellow-600 p-1 rounded px-2'>{topic.subSystem?.name || "-"}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 max-w-48 text-center">
                                        <span className='bg-green-100 text-green-600 p-1 rounded px-2'>{topic.subSystem?.system?.name || "-"}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 max-w-48 text-center">
                                        <span className='bg-indigo-100 text-indigo-600 p-1 rounded px-2'>{topic.subSystem?.system?.subject?.name || "-"}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 text-center">{new Date(topic.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-sm text-blue-500 cursor-pointer">
                                        <div className='flex items-center justify-center gap-5'>
                                            <Link to={`/admin/edit-topic/${topic._id}`} title='Edit' state={{ topicData: topic }}>
                                                <SquarePen size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteClick(topic)}
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
                title="Delete Topic"
                message={`Are you sure you want to delete "${selectedTopic?.name}" ? Deleting this Topic will automatically delete all Questions associated with it.`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancel}
            />
        </div>
    )
}

export default AllTopics