import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
const AddQuestion = () => {
    const breadcrumbItems = [
        { label: 'Dashboard', to: '/' },
        { label: 'Add New Question' }
    ]
    return (
        <div className='mx-4'>
            <Breadcrumb items={breadcrumbItems} />
            <form className='bg-white p-6 rounded shadow-md w-1/2 mx-auto mt-6'>
                <div className='mb-4'>
                    <label htmlFor="Email" className="relative">
                        <input
                            type="email"
                            id="Email"
                            placeholder=""
                            className="peer mt-0.5 w-full rounded border-gray-300 shadow-sm sm:text-sm h-10 pl-4 focus:outline-blue-500"
                        />

                        <span
                            className="absolute inset-y-0 start-3 -translate-y-5 bg-white px-0.5 text-sm font-medium text-gray-700 transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5"
                        >
                            Email
                        </span>
                    </label>
                </div>
                <button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                >
                    Add Question
                </button>
            </form>
        </div>
    )
}

export default AddQuestion