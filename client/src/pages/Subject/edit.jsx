import React, { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { Plus, SquarePen } from "lucide-react"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { SUBJECTS_API } from '../../config/api'
import Loader from "../../components/Loader"

const EditSubject = () => {
    const { id } = useParams();
    const [subject, setSubject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const breadcrumbItems = [
        { label: 'Dashboard', to: '/' },
        { label: 'Edit Subject' }
    ]

    useEffect(() => {
        const fetchSubject = async () => {
            try {
                const response = await axios.get(`${SUBJECTS_API}/${id}`);
                // console.log(response)
                setSubject(response.data);
                // console(response.data)
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch subject details');
                setLoading(false);
            }
        };

        fetchSubject();
    }, [id]);

    if (loading) {
        return (
            <div className="overflow-x-auto mx-4 bg-white p-6 shadow-sm sm:rounded-lg mt-5">
                <Breadcrumb items={breadcrumbItems} />
                <div className='flex items-center justify-center min-h-40'>
                    <Loader />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="overflow-x-auto mx-4 bg-white p-6 shadow-sm sm:rounded-lg mt-5">
                <Breadcrumb items={breadcrumbItems} />
                <div className="mt-7 text-center text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className='mx-4'>
            <form>
                <div className="space-y-8 bg-white p-6 shadow-sm sm:rounded-lg mt-5 relative">
                    {/* breadcrumb */}
                    <Breadcrumb items={breadcrumbItems} />

                    {/* content */}
                    <div className="border-b  border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">Edit Subject Information</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">Edit details of the subject.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="sm:col-span-3">
                                <label htmlFor="subject_name" className="block text-sm/6 font-medium text-gray-900">
                                    Subject Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="subject_name"
                                        name="subject_name"
                                        type="text"
                                        defaultValue={subject?.name}
                                        autoComplete="given-name"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* actions */}
                    <div className="flex  items-center justify-end gap-x-6">
                        <Link to="/all-subjects" type="button" className="text-sm/6 font-semibold text-gray-900 cursor-pointer">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="rounded-md flex cursor-pointer items-center gap-2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Edit Subject
                            <SquarePen size={18} color="#fff" />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditSubject