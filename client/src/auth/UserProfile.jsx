import React, { useState } from "react"
import Breadcrumb from "../components/Breadcrumb"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"


const UserProfile = () => {

    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);


    //   getting user Data
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData)


    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            username: userData.username,
            email: userData.email,
            phone: userData.phone

        }
    })

    // Breadcrumb
    const breadcrumbItems = [
        { label: 'Dashboard', to: '/' },
        { label: `${userData.role} Profile` }
    ]

    const onSubmit = () => {

    }


    return (
        <div className='mx-4' >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-8 bg-white p-6 shadow-sm sm:rounded-lg mt-5 relative">
                    {/* breadcrumb */}
                    <Breadcrumb items={breadcrumbItems} />

                    {/* content */}
                    <div className="border-b  border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900 capitalize">{userData.role} Profile</h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div className="sm:col-span-3">
                                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register("username")}
                                        type="text"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register("email")}
                                        type="email"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                    Phone
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register("phone")}
                                        type="tel"
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
                            {updating ? "Updating..." : "Update Profile"}
                        </button>
                    </div>
                </div>

            </form>
        </div>
    )
}

export default UserProfile