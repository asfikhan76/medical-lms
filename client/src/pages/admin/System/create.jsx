import React, { useState, useEffect } from 'react'
import Breadcrumb from '@components/Breadcrumb'
import { Plus } from "lucide-react"
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { API_BASE_URL } from '@config/api';
import axios from 'axios'

const AddSystem = () => {
    const [subjects, setSubjects] = useState([])
    const [selectedSubject, setSelectedSubject] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    // Breadcrumbs 
    const breadcrumbItems = [
        { label: 'Dashboard', to: '/' },
        { label: 'Add New System' }
    ]
    // Handling form submission
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()


    const SubmitHandler = async (data) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/systems`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            reset();
            toast.success("System successfully added!");
            navigate("/admin/all-systems")
        }
        catch (error) {
            const serverMessage =
                error.response?.data?.error ?
                    error.response.data.error :
                    "Error adding system!";
            toast.error(serverMessage);
        }
    }

    // Fetching subjects from the API

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


    return (
        <div className='mx-4'>
            <form onSubmit={handleSubmit(SubmitHandler)}>
                <div className="space-y-8 bg-white p-6 shadow-sm sm:rounded-lg mt-5 relative">
                    {/* breadcrumb */}
                    <Breadcrumb items={breadcrumbItems} />

                    {/* content */}
                    <div className="border-b  border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">System Information</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">Provide details for the new system.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="sm:col-span-3">
                                <label htmlFor="name" className="block mb-1 text-sm/6 font-medium text-gray-900">
                                    Subject
                                </label>

                                <select
                                    {...register("subject", { required: "Subject is required" })}
                                    name="subject"
                                    id="subject"
                                    className="block px-3 py-2.5  w-full rounded-md sm:text-sm outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                >
                                    <option value="">Select a Subject</option>
                                    {
                                        subjects.map((subject) => (
                                            <option key={subject._id} value={subject._id}>
                                                {subject.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                    System Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id='name'
                                        name="name"
                                        {...register("name", { required: true, minLength: { value: 5, message: "System name requires a minimum of 5 characters." } })}
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                    {errors.name && (
                                        <span className='text-red-500 text-sm'>{errors.name.message}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* actions */}
                    <div className="flex  items-center justify-end gap-x-6">
                        <Link to="/" type="button" className="text-sm/6 font-semibold text-gray-900 cursor-pointer">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="rounded-md flex cursor-pointer items-center gap-2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add System
                            <Plus size={18} color="#fff" />
                        </button>
                    </div>
                </div>

            </form >
        </div >
    )
}

export default AddSystem