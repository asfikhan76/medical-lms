import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import { Plus } from "lucide-react"
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { SUBJECTS_API } from '../../config/api';
import axios from 'axios'
// /api/subjects

const AddSubject = () => {
    // Breadcrumb
    const breadcrumbItems = [
        { label: 'Dashboard', to: '/' },
        { label: 'Add New Subject' }
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
            const response = await axios(SUBJECTS_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify(data),
            })
            reset();
            toast.success("Subject successfully added!");
        }
        catch (error) {
            toast.error("Error adding subject!");
        }
    }



    return (
        <div className='mx-4'>
            <form onSubmit={handleSubmit(SubmitHandler)}>
                <div className="space-y-8 bg-white p-6 shadow-sm sm:rounded-lg mt-5 relative">
                    {/* breadcrumb */}
                    <Breadcrumb items={breadcrumbItems} />

                    {/* content */}
                    <div className="border-b  border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">Subject Information</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">Provide details for the new subject.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="sm:col-span-3">
                                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                    Subject Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        name="name"
                                        {...register("name", { required: true, minLength: { value: 5, message: "Subject name requires a minimum of 5 characters." } })}
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
                            Add Subject
                            <Plus size={18} color="#fff" />
                        </button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default AddSubject