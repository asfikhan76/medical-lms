import React, { useState, useRef, useEffect } from "react"
import heroImg from "@assets/img/hero-img.jpg"
import researchersImg from "@assets/img/Researchers-cuate.png"
import studentImg from "@assets/img/student-setting-next-to-laptop.jpeg"
import userImg from "@assets/img/user.webp"
import PlanCard from "@components/PlanCard"


const PlansSection = () => {
    const plans = [
        {
            id: "starter",
            name: "Ques.Bank 30 Days Access",
            image: userImg,
            price: "$319",
            cta: "Buy Now",
            features: ["Full Question Bank Access", "Basic performance summary", "Mobile access"],
        },
        {
            id: "plus",
            name: "Ques.Bank 90 Days Access",
            image: studentImg,
            price: "$439",
            cta: "Buy Now",
            features: ["Full Question Bank Access", "Topic-wise analytics", "Priority support"],
        },
        {
            id: "pro",
            name: "Ques.Bank 180 Days Access",
            image: heroImg,
            price: "$479",
            cta: "Buy Now",
            features: ["Full Question Bank Access", "Detailed trend reports", "Offline mode"],
        },
        {
            id: "team",
            name: "Ques.Bank 360 Days Access",
            image: researchersImg,
            price: "$559",
            cta: "Buy Now",
            features: ["Full Question Bank Access", "Cohort analytics", "Bulk licensing"],
        },
    ]

    const trackRef = useRef(null)
    const [showArrows, setShowArrows] = useState(false)

    useEffect(() => {
        const el = trackRef.current
        if (!el) return
        const checkOverflow = () => {
            setShowArrows(el.scrollWidth > el.clientWidth)
        }
        checkOverflow()
        const observer = new ResizeObserver(checkOverflow)
        observer.observe(el)
        window.addEventListener("resize", checkOverflow)
        return () => {
            observer.disconnect()
            window.removeEventListener("resize", checkOverflow)
        }
    }, [])

    const scrollByAmount = (direction) => {
        const el = trackRef.current
        if (!el) return
        const amount = el.clientWidth * 0.9 * (direction === "left" ? -1 : 1)
        el.scrollBy({ left: amount, behavior: "smooth" })
    }

    return (
        <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 pb-16">
            <div className="flex items-end justify-between gap-4 mb-6">
                <div className="">
                    <h2 className="text-3xl font-bold text-white mb-4 md:text-center">Find a plan that <span className="text-teal-600">fits</span> you</h2>
                    <p className="text-white md:text-center md:w-[65%] mx-auto mb-6">Master complex topics faster with data‑driven insights, flexible access, and an adaptive study planner. Track your progress, study anywhere, and focus on what moves your score.</p>
                </div>
            </div>
            {showArrows && (
                <div className="hidden md:flex items-center justify-end gap-2 mb-5">
                    <button onClick={() => scrollByAmount("left")} className="h-9 w-9 rounded-md border border-slate-700 text-slate-200 hover:bg-slate-800">
                        <span className="sr-only">Previous</span>
                        ◀
                    </button>
                    <button onClick={() => scrollByAmount("right")} className="h-9 w-9 rounded-md border border-slate-700 text-slate-200 hover:bg-slate-800">
                        <span className="sr-only">Next</span>
                        ▶
                    </button>
                </div>
            )}

            <div
                ref={trackRef}
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-p-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none]"
                style={{ scrollbarWidth: "none" }}
            >
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className="snap-start shrink-0 basis-[85%] sm:basis-[60%] md:basis-1/2 lg:basis-1/4"
                    >
                        <PlanCard plan={plan} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlansSection