import React, { useEffect, useState } from 'react'
import Breadcrumb from '@components/Breadcrumb'
import { Plus } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { API_BASE_URL } from '@config/api'
import { toast } from 'react-toastify'

const AddTopic = () => {
    // states
    const [subSystems, setSubSystems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // form
    const
        {
            register,
            handleSubmit,
            formState: { errors },
            reset
        }
            = useForm()

    // breadcrumb items
    const breadcrumbItems = [
        { label: 'Dashboard', to: '/' },
        { label: 'Add New Topic' }
    ]

    // submit handler
    const SubmitHandler = async (data) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/topics`, data, {
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            reset();
            toast.success("Sub-System successfully added!")
            navigate('/admin/all-topics')
        } catch (error) {
            const serverMessage = error.response?.data?.error ? error.response.data.error : "Error adding Sub-System";
            toast.error(serverMessage);
        }
    }

    // fetching sub sytems
    useEffect(() => {
        const fetchSubSystems = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/subsystems`)
                setSubSystems(response.data)
                setLoading(false)

            } catch (err) {
                setError('Failed to fetch Sub-Systems')
                setLoading(false)
            }
        }
        fetchSubSystems()
    }, [])

    return (
        <div className='mx-4'>
            <form onSubmit={handleSubmit(SubmitHandler)}>
                <div className="space-y-8 bg-white p-6 shadow-sm sm:rounded-lg mt-5 relative">
                    {/* breadcrumb */}
                    <Breadcrumb items={breadcrumbItems} />

                    {/* content */}
                    <div className="border-b  border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">Topic Information</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">Provide details for the new subject.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="sm:col-span-3">
                                <label htmlFor="subSystem" className="block mb-1 text-sm/6 font-medium text-gray-900">
                                    Sub-System
                                </label>

                                <select
                                    {...register("subSystem", { required: "Sub-System is required" })}
                                    id="subSystem"
                                    className="block px-3 py-2.5  w-full rounded-md sm:text-sm outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                                >
                                    <option value="">Select a Sub-System</option>
                                    {
                                        subSystems.map((subSystem) => (
                                            <option key={subSystem._id} value={subSystem._id}>
                                                {subSystem.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                    Topic Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        {...register("name", { required: "Sub System name is required" })}
                                        type="text"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
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
                            Add Topic
                            <Plus size={18} color="#fff" />
                        </button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default AddTopic