import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import Breadcrumb from '@components/Breadcrumb'
import { Plus, PlusCircle } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { API_BASE_URL } from '@config/api'



const AddPlan = () => {

    // Breadcrumb
    const breadcrumbItems = [
        { label: 'Dashboard', to: '/' },
        { label: 'Add New Plan' }
    ]

    const navigate = useNavigate();

    // Handling form submission
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset
    } = useForm({
        defaultValues: {
            features: [
                {
                    value: ""
                }
            ]
        }
    })

    // Field array for options
    const { fields, append, remove } = useFieldArray({
        control,
        name: "features"
    })

    // handleAddFeature
    const HandleAddFeature = () => {
        append({ value: "" })
    }

    // handleRemoveFeature
    const handleRemoveFeature = (index) => {
        remove(index)
    }

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
        <div className='overflow-x-auto mx-4 bg-white shadow-sm sm:rounded-lg main-container'>
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
                                    <div className="sm:col-span-3">
                                        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                            Name
                                            <span className='text-red-600'>*</span>
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                name="name"
                                                {...register("name", { required: true, minLength: { value: 5, message: "Plan name requires a minimum of 5 characters." } })}
                                                type="text"
                                                placeholder='60 Days Access'
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                            {errors.name && (
                                                <span className='text-red-500 text-sm'>{errors.name.message}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* description */}
                                    <div className="sm:col-span-3 sm:row-span-2">
                                        <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                                            Description
                                        </label>
                                        <div className="mt-2">
                                            <textarea rows="5"
                                                name="description"
                                                {...register("description")}
                                                type="text"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            >
                                            </textarea>
                                            {errors.name && (
                                                <span className='text-red-500 text-sm'>{errors.name.message}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* price */}
                                    <div className="sm:col-span-1">
                                        <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">
                                            Price<sup className='text-red-600'>*</sup>
                                            (In Dollars)

                                        </label>
                                        <div className="mt-2">
                                            <input
                                                name="price"
                                                {...register("price", { required: true })}
                                                type="number"
                                                placeholder='i.e: 399'
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                            {errors.name && (
                                                <span className='text-red-500 text-sm'>{errors.name.message}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* duration */}
                                    <div className="sm:col-span-2">
                                        <label htmlFor="duration" className="block text-sm/6 font-medium text-gray-900">
                                            Duration<sup className='text-red-600'>*</sup>
                                            (In Days)

                                        </label>
                                        <div className="mt-2">
                                            <input
                                                name="duration"
                                                {...register("duration", { required: true })}
                                                type="number"
                                                placeholder='i.e: 60'
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                            {errors.name && (
                                                <span className='text-red-500 text-sm'>{errors.name.message}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* features */}
                                    <div className="sm:col-span-3">
                                        {fields.map((field, index) => (
                                            <div key={field.id} className="grid grid-cols-3 gap-5 mb-5">
                                                <div className='sm:col-span-3 flex items-end gap-3' id='feature'>
                                                    <div className='basis-3/4'>
                                                        <label htmlFor={`feature-${index}`}
                                                            className="block text-sm/6 font-medium text-gray-900">
                                                            Feature {index + 1}
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                {...register(`features.${index}.value`)}
                                                                id={`feature-${index}`}
                                                                type="text"
                                                                placeholder={`Enter feature ${index + 1}`}
                                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                            />
                                                            {
                                                                errors.features?.[index]?.value && (
                                                                    <p className="text-red-500 text-sm mt-1">
                                                                        {errors.features[index].value.message}
                                                                    </p>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    {index === 0 ? (
                                                        // Only first feature shows "Add feature" button
                                                        <button
                                                            onClick={HandleAddFeature}
                                                            type='button'
                                                            className='basis-1/4 shrink-0 rounded-md flex cursor-pointer items-center justify-center gap-2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                                        >
                                                            Add Feature
                                                            <PlusCircle size={18} color="#fff" />
                                                        </button>
                                                    ) : (
                                                        // All other features show "Remove feature" button
                                                        <button
                                                            onClick={() => handleRemoveFeature(index)}
                                                            type='button'
                                                            className='basis-1/4 shrink-0 rounded-md flex cursor-pointer items-center justify-center gap-2 bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500'
                                                        >
                                                            Remove Feature
                                                            <PlusCircle size={18} color="#fff" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
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