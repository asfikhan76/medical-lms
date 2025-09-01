import React from 'react'
import { useForm } from 'react-hook-form'
import Breadcrumb from '@components/Breadcrumb'
import { Plus } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'


const AddPlan = () => {

    // Breadcrumb
    const breadcrumbItems = [
        { label: 'Dashboard', to: '/' },
        { label: 'Add New Plan' }
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
            const response = await axios(`${API_BASE_URL}/plans`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify(data),
            })
            reset();
            toast.success("Plan successfully added!");
            navigate('/admin/all-plans');
        }
        catch (error) {
            const serverMessage =
                error.response.data.error ?
                    error.response.data.error :
                    "Error adding Plan!";
            toast.error(serverMessage);
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
                        <h2 className="text-base/7 font-semibold text-gray-900">Plan Information</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">Provide details for the new Plan.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="sm:col-span-2">

                                <div className="grid grid-cols-3 gap-x-6 gap-y-6">
                                    {/* name */}
                                    <div className="sm:col-span-1">
                                        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                            Plan Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                name="name"
                                                {...register("name", { required: true, minLength: { value: 5, message: "Plan name requires a minimum of 5 characters." } })}
                                                type="text"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                            {errors.name && (
                                                <span className='text-red-500 text-sm'>{errors.name.message}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* description */}
                                    <div className="sm:col-span-2">
                                        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                            Plan Description
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                name="name"
                                                {...register("name", { required: true, minLength: { value: 5, message: "Plan name requires a minimum of 5 characters." } })}
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
                            Add Plan
                            <Plus size={18} color="#fff" />
                        </button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default AddPlan