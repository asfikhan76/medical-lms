import React from "react"
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import usePasswordToggle from "../hooks/usePasswordToggle";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form"
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { toast } from "react-toastify"
import { useAuth } from "../contexts/AuthContext";

const Login = () => {

    const { isPasswordVisible, inputType, togglePassword } = usePasswordToggle();
    const { login } = useAuth()
    const navigate = useNavigate()

    const {
        register,
        reset,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
            const token = response.data.token;
            login(token);
            reset();
            navigate('/');
            toast.success("Login successful");

        } catch (error) {
            toast.error(error.response.data?.error)
        }
    }



    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div>
                <h2 className="text-center text-2xl font-bold">Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="px-1 lg:px-8 py-15">


                        {/*email*/}
                        <div className="sm:col-span-1 mt-5">
                            <label htmlFor="" className="block text-sm/6 font-medium text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    {...register("email", { required: "Email is Required" })}
                                    placeholder="Enter your email"
                                    type="email"
                                    autoComplete=""
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                {
                                    errors.email && <p className="text-red-600 block text-xs mt-1">{errors.email.message}</p>
                                }
                            </div>
                        </div>

                        {/*name*/}
                        <div className="sm:col-span-1 mt-5">
                            <label htmlFor="" className="block text-sm/6 font-medium text-gray-900">
                                password
                            </label>
                            <div className="mt-2 flex relative">
                                <input
                                    {...register("password", { required: "Password is Required" })}
                                    placeholder="Enter your Password"
                                    type={inputType}
                                    autoComplete=""
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black-500 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                                <span onClick={togglePassword} className="absolute end-3 top-1/2 -translate-y-1/2 cursor-pointer">
                                    {
                                        isPasswordVisible ? <EyeOff size={16} color="gray" /> : <Eye size={16} color="gray" />
                                    }
                                </span>
                            </div>
                            {
                                errors.password && <p className="text-red-600 block text-xs mt-1">{errors.password.message}</p>
                            }
                        </div>

                        <button
                            type='submit'
                            className='rounded-md flex cursor-pointer items-center justify-center gap-2 bg-indigo-600 mt-10 w-full mx-auto px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500'
                        >
                            Login
                        </button>

                        <p className="text-xs mt-2 text-center">New to our platform ?
                            <Link to="/register" type="button"
                                className="text-sm/6 font-semibold text-blue-600 underline ms-2 cursor-pointer">
                                Create an Account
                            </Link>
                        </p>


                    </div>
                </form>
            </div>
        </motion.div>
    )
}
export default Login
