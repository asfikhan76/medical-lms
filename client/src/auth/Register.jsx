import React, { useState } from "react"
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react"
import usePasswordToggle from "../hooks/usePasswordToggle"

const Register = () => {

    const { isPasswordVisible, inputType, togglePassword } = usePasswordToggle()
    const { isPasswordVisible: isConfirmVisible, inputType: confirmInputType, togglePassword: toggleConfirm } = usePasswordToggle()

    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="overflow-y-auto">
                <h2 className="text-center text-2xl font-bold">Register</h2>

                <form action="" method="post">

                    <div className="px-1 lg:px-8 py-15">

                        <div className="grid grid-cols-12 gap-4">
                            {/*name*/}
                            <div className="col-span-12 lg:col-span-12">
                                <label htmlFor="" className="block text-sm/6 font-medium text-gray-900">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        placeholder="Enter your name"
                                        type="text"
                                        autoComplete=""
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            {/*email*/}
                            <div className="col-span-12 lg:col-span-6">
                                <label htmlFor="" className="block text-sm/6 font-medium text-gray-900">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        placeholder="Enter your email"
                                        type="email"
                                        autoComplete=""
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>


                            {/*Phone No*/}
                            <div className="col-span-12 lg:col-span-6">
                                <label htmlFor="" className="block text-sm/6 font-medium text-gray-900">
                                    Phone No
                                </label>
                                <div className="mt-2">
                                    <input
                                        placeholder="Enter your phone number"
                                        type="tel"
                                        autoComplete=""
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            {/*password*/}
                            <div className="col-span-12 lg:col-span-6">
                                <label htmlFor="" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2 flex relative">
                                    <input
                                        id="password"
                                        placeholder="Enter your Password"
                                        type={inputType}
                                        autoComplete=""
                                        className="block w-full rounded-md bg-white px-3 pe-8 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                    <span onClick={togglePassword} className="absolute end-3 top-1/2 -translate-y-1/2 cursor-pointer">
                                        {
                                            isPasswordVisible ? <EyeOff size={16} color="gray" /> : <Eye size={16} color="gray" />
                                        }
                                    </span>
                                </div>
                            </div>

                            {/*Confirm Password*/}
                            <div className="col-span-12 lg:col-span-6">
                                <label htmlFor="" className="block text-sm/6 font-medium text-gray-900">
                                    Confirm Password
                                </label>
                                <div className="mt-2 flex relative">
                                    <input
                                        placeholder="Re-enter your Password"
                                        type={confirmInputType}
                                        autoComplete=""
                                        className="block w-full rounded-md bg-white px-3 pe-8 py-1.5 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                    <span onClick={toggleConfirm} className="absolute end-3 top-1/2 -translate-y-1/2 cursor-pointer">
                                        {
                                            isConfirmVisible ? <EyeOff size={16} color="gray" /> : <Eye size={16} color="gray" />
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            type='submit'
                            className='rounded-md flex cursor-pointer items-center justify-center gap-2 bg-indigo-600 mt-10 w-full mx-auto px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500'
                        >
                            Register
                        </button>

                        <p className="text-xs mt-2 text-center">Already have an Account ?
                            <Link to="/login" type="button"
                                className="text-sm/6 font-semibold text-blue-600 underline ms-2 cursor-pointer">
                                Login
                            </Link>
                        </p>


                    </div>
                </form>
            </div>
        </motion.div>
    )
}
export default Register
