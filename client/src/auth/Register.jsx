import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react"
import usePasswordToggle from "../hooks/usePasswordToggle"
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_BASE_URL } from "@config/api";
import { toast } from "react-toastify";

const Register = () => {

    const { isPasswordVisible, inputType, togglePassword } = usePasswordToggle()
    const { isPasswordVisible: isConfirmVisible, inputType: confirmInputType, togglePassword: toggleConfirm } = usePasswordToggle()
    const navigate = useNavigate()



    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: {
            errors
        }
    } = useForm();


    const onSubmit = async (data) => {
        const { confirmPassword, ...payload } = data; //Exclude Confirm Password
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/signup`, payload);
            reset();
            navigate('/login')
            toast.success("You have successfully Registered!");

        } catch (error) {
            toast.error(error.response?.data.error)
        }
    }

    const values = watch()
    const password = watch("password")
    useEffect(() => {
        console.log(values)
    }, [values])

    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="overflow-y-auto">
                <h2 className="text-center text-2xl font-bold">Register</h2>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="px-1 lg:px-8 py-15">

                        <div className="grid grid-cols-12 gap-4">
                            {/*name*/}
                            <div className="col-span-12 lg:col-span-12">
                                <label htmlFor="" className="block text-sm/6 font-medium text-gray-900">
                                    Name
                                    <span className="text-red-600 ms-1">*</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register("username", { required: "Name is Required" })}
                                        placeholder="Enter your name"
                                        type="text"
                                        autoComplete=""
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                    {
                                        errors.username && <p className="text-red-600 block text-xs mt-1">
                                            {errors.username.message}
                                        </p>
                                    }
                                </div>
                            </div>

                            {/*email*/}
                            <div className="col-span-12 lg:col-span-6">
                                <label htmlFor="" className="block text-sm/6 font-medium text-gray-900">
                                    Email
                                    <span className="text-red-600 ms-1">*</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register("email", {
                                            required: "Email is Required", pattern:
                                            {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                message: "Invalid Email Address"
                                            },
                                        })}
                                        placeholder="Enter your email"
                                        type="email"
                                        autoComplete=""
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                    {
                                        errors.email && <p
                                            className="text-red-600 block text-xs mt-1">
                                            {errors.email.message}
                                        </p>
                                    }
                                </div>
                            </div>


                            {/*Phone No*/}
                            <div className="col-span-12 lg:col-span-6">
                                <label htmlFor="" className="block text-sm/6 font-medium text-gray-900">
                                    Phone No
                                    <span className="text-red-600 ms-1">*</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        {...register("phone", {
                                            required: "Phone is Required", pattern: {
                                                value: /^[0-9]+$/,
                                                message: "Only digits Allowed"
                                            }
                                        })}
                                        placeholder="Enter your phone number"
                                        type="tel"
                                        autoComplete=""
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                    {
                                        errors.phone && <p
                                            className="text-red-600 block text-xs mt-1">
                                            {errors.phone.message}
                                        </p>
                                    }
                                </div>
                            </div>

                            {/*password*/}
                            <div className="col-span-12 lg:col-span-6">
                                <label htmlFor="" className="block text-sm/6 font-medium text-gray-900">
                                    Password   <span className="text-red-600 ms-1">*</span>
                                </label>
                                <div className="mt-2 flex relative">
                                    <input
                                        {...register("password", {
                                            required: "Password is required", minLength: {
                                                value: 6,
                                                message: "Minimum 6 Characters"
                                            }
                                        })}
                                        id="password"

                                        placeholder="Enter your Password"
                                        type={inputType}
                                        className="block w-full rounded-md bg-white px-3 pe-8 py-1.5 text-base text-black-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />

                                    <span onClick={togglePassword} className="absolute end-3 top-1/2 -translate-y-1/2 cursor-pointer">
                                        {
                                            isPasswordVisible ? <EyeOff size={16} color="gray" /> : <Eye size={16} color="gray" />
                                        }
                                    </span>
                                </div>
                                {
                                    errors.password && <p className="text-red-600 block text-xs mt-2">{errors.password.message}</p>
                                }
                            </div>

                            {/*Confirm Password*/}
                            <div className="col-span-12 lg:col-span-6">
                                <label htmlFor="" className="block text-sm/6 font-medium text-gray-900">
                                    Confirm Password   <span className="text-red-600 ms-1">*</span>
                                </label>
                                <div className="mt-2 flex relative">
                                    <input
                                        {...register("confirmPassword", {
                                            required: "Please confirm your password",
                                            validate: (value) => value === password || "Password don't match",
                                        })}
                                        placeholder="Re-enter your Password"
                                        type={confirmInputType}
                                        className="block w-full block rounded-md bg-white px-3 pe-8 py-1.5 text-base text-black-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />

                                    <span onClick={toggleConfirm} className="absolute end-3 top-1/2 -translate-y-1/2 cursor-pointer">
                                        {
                                            isConfirmVisible ? <EyeOff size={16} color="gray" /> : <Eye size={16} color="gray" />
                                        }
                                    </span>
                                </div>
                                {
                                    errors.confirmPassword &&
                                    <p className="text-red-600 block text-xs mt-2">{errors.confirmPassword.message}
                                    </p>
                                }
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
