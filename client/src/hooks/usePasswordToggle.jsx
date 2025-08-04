import React, { useState } from "react"

const usePasswordToggle = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [inputType, setInputType] = useState("password");

    const togglePassword = () => {
        setIsPasswordVisible(!isPasswordVisible);
        setInputType(inputType === "password" ? "text" : "password")
    }
    return { isPasswordVisible, inputType, togglePassword }
}
export default usePasswordToggle