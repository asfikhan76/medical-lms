import React, {useEffect} from "react"
import {useScript} from "../hooks/useScript"
// import studentImg from "../assets/img/student-setting-next-to-laptop.jpeg";
import GLOBE from "vanta/src/vanta.globe"

const AuthLayout = ({children}) => {

    const status = useScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js");

    useEffect(() => {
        if (status === "ready") {
            GLOBE({
                el: "#vanta",
                THREE: window.THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
            })
        }
    }, [status])

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="flex  size-[70%] rounded-lg overflow-hidden shadow-lg ">
                <div className="bg-red-100 w-[50%]" id="vanta"/>
                <div className="w-[50%] p-5">
                    {children}
                </div>
            </div>
        </div>)
}

export default AuthLayout