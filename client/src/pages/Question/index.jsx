import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ConfirmModal from '../../components/ConfirmModal'
import Loader from '../../components/Loader'
import { API_BASE_URL } from '../../config/api'
import { SquarePen, Trash2, Eye } from 'lucide-react'

const AllQuestions = () => {
    const [questions, setQuestions] = useState(14)
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    // Breadcrumb
    const breadcrumbItems = [
        { label: 'Dashboard', to: '/' },
        { label: 'All Questions' }
    ]


    // fetching Questions 
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/questions`);
                setQuestions(response.data.data)
                console.log(response.data.data)
                setLoading(false)
            } catch (error) {
                setError('Failed to fetch Questions')
                setLoading(false)
            }
        }
        fetchQuestions()
    }, [])


    // handleDeleteClick
    const handleDeleteClick = (question) => {
        setSelectedQuestion(question)
        setModalOpen(true)
    }


    // handleConfirmDelete
    const handleConfirmDelete = async () => {
        setModalOpen(false)
        try {
            await axios.delete(`${API_BASE_URL}/questions/${selectedQuestion._id}`);
            setQuestions(prev =>
                prev.filter(sub => sub._id !== selectedQuestion._id)
            )
            toast.success('Question deleted successfully!')
        } catch (err) {
            toast.error('Failed to delete Question')
        }
        setSelectedQuestion(null)
    }

    const handleCancel = () => {
        setModalOpen(false)
        setSelectedQuestion(null)
    }



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
        <div className="overflow-auto bg-white p-6 shadow-sm sm:rounded-lg main-container">
            <Breadcrumb items={breadcrumbItems} />
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 w-2/3">Question Name</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Created at</th>
                        <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        questions.length === 0 ? (
                            <tr>
                                <td colSpan={5} className='px-6 py-4 text-center text-gray-500'>
                                    No Questions found. Would you like to
                                    <Link to={"/add-question"} className='text-blue-500 underline ms-2'>add a new Question ?</Link>
                                </td>
                            </tr>
                        ) :
                            (questions.map((question) => (
                                <tr key={question._id} className="border-b border-gray-200">

                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        <div className='line-clamp-2'>
                                            <div className="question-text" dangerouslySetInnerHTML={{ __html: question.text }} />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">  {new Date(question.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-sm text-blue-500 cursor-pointer">
                                        <div className='flex items-center justify-center gap-5'>
                                            <Link to={`/show-question/${question._id}`} state={{ questionData: question }}>
                                                <Eye size={16} />
                                            </Link>
                                            <Link to={`/edit-question/${question._id}`} state={{ questionData: question }}>
                                                <SquarePen size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteClick(question)}
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
                title="Delete Question"
                message={
                    <span>
                        Are you sure you want to delete{" "}
                        <span dangerouslySetInnerHTML={{ __html: selectedQuestion?.text }} />?
                    </span>
                }
                onConfirm={handleConfirmDelete}
                onCancel={handleCancel}
            />
        </div>
    )
}

export default AllQuestions