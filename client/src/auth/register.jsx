import React from "react"

const Register = () => {
    return (
        <div>
            <h2 className="text-center text-2xl font-bold">Register</h2>

            <form action="" method="post">

                <div className="px-8 py-15">

                    {/*name*/}
                    <div className="sm:col-span-1">
                        <label htmlFor="" className="block text-sm/6 font-medium text-gray-900">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                autoComplete=""
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    {/*email*/}
                    <div className="sm:col-span-1 mt-5">
                        <label htmlFor="" className="block text-sm/6 font-medium text-gray-900">
                            Email
                        </label>
                        <div className="mt-2">
                            <input
                                type="email"
                                autoComplete=""
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>


                    {/*Phone No*/}
                    <div className="sm:col-span-1 mt-5">
                        <label htmlFor="" className="block text-sm/6 font-medium text-gray-900">
                            Phone No
                        </label>
                        <div className="mt-2">
                            <input
                                type="tel"
                                autoComplete=""
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <button
                        type='submit'
                        className='rounded-md flex cursor-pointer items-center justify-center gap-2 bg-indigo-600 mt-10 w-full mx-auto px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500'
                    >
                        Register
                    </button>


                </div>
            </form>
        </div>
    )
}
export default Register
