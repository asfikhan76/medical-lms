import React, { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Breadcrumb from "@components/Breadcrumb"

const ShowQuestion = () => {
    // states
    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const questionData = location.state?.questionData
    console.log(questionData)
    const [error, setError] = useState(null)

    const breadcrumbItems = [
        { label: 'Dashboard', to: '/' },
        { label: 'Questions', to: '/all-questions' },
        { label: 'Question Details', }
    ]

    if (!questionData) {
        return <div className="p-8">No question data found.</div>
    }

    return (
        <div className="space-y-8 overflow-auto bg-white p-6 shadow-sm sm:rounded-lg mt-5 relative main-container">
            <Breadcrumb items={breadcrumbItems} />

            <div className="pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">

                    {/* Meta Info Section */}
                    <div className="mb-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <div>
                                <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Subject</div>
                                <div className="text-base font-medium bg-indigo-100 text-indigo-600  w-fit px-3 my-2 rounded">{questionData.subject?.name}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">System</div>
                                <div className="text-base font-medium bg-green-100 text-green-600 rounded my-2 w-fit px-3">{questionData.system?.name}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Subsystem</div>
                                <div className="text-base font-medium bg-yellow-100 text-yellow-600 px-3 w-fit my-2 rounded">{questionData.subSystem?.name}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">Topic</div>
                                <div className="text-base font-medium bg-pink-100 text-pink-600 px-3 w-fit my-2 rounded">{questionData.topic?.name}</div>
                            </div>
                        </div>
                    </div>

                    {/* Question Text */}
                    <h2 className="text-2xl font-semibold mb-2" dangerouslySetInnerHTML={{ __html: questionData.text }} />

                    {/* Options */}
                    <div className="mb-6">
                        <h4 className="mb-2 font-semibold">Options:</h4>
                        <ul className="space-y-2">
                            {questionData.options?.map((opt, idx) => (
                                <li
                                    key={idx}
                                    className={`flex items-center px-4 py-2 rounded-lg border text-base font-normal ${opt.isCorrect ? 'bg-green-50 border-green-400 font-semibold text-green-800' : 'bg-gray-50 border-gray-200 text-gray-800'}`}
                                >
                                    <span className="mr-3 font-mono">{String.fromCharCode(65 + idx)}.</span>
                                    <span>{opt.value}</span>
                                    {opt.isCorrect && (
                                        <span className="ml-auto text-xs bg-green-500 text-white rounded px-2 py-0.5">Correct</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Explanation */}
                    {questionData.explanation && (
                        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-6">
                            <strong className="block mb-1">Explanation:</strong>
                            <div dangerouslySetInnerHTML={{ __html: questionData.explanation }} />
                        </div>
                    )}

                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="px-5 py-2 bg-blue-600 w-fit text-white rounded-md hover:bg-blue-700 font-medium"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div >
    )
}

export default ShowQuestion