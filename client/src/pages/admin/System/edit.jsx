import React, { useState } from 'react'
import Breadcrumb from '@components/Breadcrumb'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { Plus, SquarePen } from "lucide-react"
import axios from 'axios'
import { API_BASE_URL } from '@config/api'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'


const EditSystem = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const systemData = location.state?.systemData;
    console.log("system data:", systemData);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: systemData?.name || ''
        }
    });

    const breadcrumbItems = [
        { label: 'Dashboard', to: '/' },
        { label: 'Edit System' }
    ]

    const onSubmit = async (data) => {
        setUpdating(true);
        try {
            await axios.put(`${API_BASE_URL}/systems/${id}`, data);
            toast.success('System updated successfully');
            navigate('/admin/all-systems');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to update system';
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setUpdating(false);
        }
    };


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
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-8 bg-white p-6 shadow-sm sm:rounded-lg mt-5 relative">
                    {/* breadcrumb */}
                    <Breadcrumb items={breadcrumbItems} />

                    {/* content */}
                    <div className="border-b  border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">Edit System Information</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">Edit details of the system.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="sm:col-span-3">
                                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                    System Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        {...register('name', {
                                            required: 'System name is required',
                                            minLength: {
                                                value: 5,
                                                message: 'System name must be at least 5 characters'
                                            }
                                        })}
                                        type="text"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
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
                            disabled={updating}
                            className="rounded-md flex cursor-pointer items-center gap-2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {updating ? 'Updating...' : 'Edit System'}
                            <SquarePen size={18} color="#fff" />
                        </button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default EditSystem