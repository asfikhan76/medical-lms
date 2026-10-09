import React from "react"
import heroImg from "@assets/img/hero-img.jpg"
import PlanCard from "@components/PlanCard"


const PlansSection = () => {
    const plans = [
        {
            id: "starter",
            name: "30 Days Access",
            image: heroImg,
            price: "$319",
            features: ["Full Question Bank Access"],
        },
        {
            id: "plus",
            name: "90 Days Access",
            image: heroImg,
            price: "$439",
            features: ["Full Question Bank Access", "1 Self Assessment"],
        },
        {
            id: "pro",
            name: "180 Days Access",
            image: heroImg,
            price: "$479",
            features: ["Full Question Bank Access", "2 Self Assessment", "Study Planner"],
        },
    ]

    return (
        <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 pb-16">
            <div className="flex items-end justify-between gap-4 mb-6">
                <div className="">
                    <h2 className="text-3xl font-bold text-white mb-4 md:text-center">Find a plan that <span className="text-teal-600">Fits</span> you</h2>
                    <p className="text-white md:text-center md:w-[65%] mx-auto mb-6">Master complex topics faster with data‑driven insights, flexible access, and an adaptive study planner. Track your progress, study anywhere, and focus on what moves your score.</p>
                </div>
            </div>

            <div
                className="flex justify-evenly flex-wrap gap-6 overflow-x-auto snap-x snap-mandatory scroll-p-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none]"
            >
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className="shrink-0 basis-[85%] sm:basis-[60%] md:basis-1/2 lg:basis-1/4"
                    >
                        <PlanCard plan={plan} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PlansSection