import React, {useEffect} from "react"
import {useScript} from "../hooks/useScript"
import RINGS from "vanta/src/vanta.rings"

const AuthLayout = ({children}) => {

    const status = useScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js");

    useEffect(() => {
        if (status === "ready") {
            RINGS({
                el: "#vanta",
                THREE: window.THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                backgroundColor: 0x282020,
                color: 0x45d400
            })
        }
    }, [status])

    return (
        <div className="flex items-center  justify-center w-screen h-screen">
            <div className="flex flex-col lg:flex-row  lg:size-[70%] size-[85%] rounded-lg overflow-hidden shadow-lg">
                <div className="bg-red-100 lg:w-[50%] w-full hidden lg:block" id="vanta"/>
                <div className="lg:w-[50%] p-5 w-full">
                    {children}
                </div>
            </div>
        </div>)
}

export default AuthLayout