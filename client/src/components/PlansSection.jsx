import React from "react"
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

    return (
        <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 pb-16">
            <div className="flex items-end justify-between gap-4 mb-6">
                <div className="">
                    <h2 className="text-3xl font-bold text-white mb-4 md:text-center">Find a plan that <span className="text-teal-600">fits</span> you</h2>
                    <p className="text-white md:text-center md:w-[65%] mx-auto mb-6">Master complex topics faster with data‑driven insights, flexible access, and an adaptive study planner. Track your progress, study anywhere, and focus on what moves your score.</p>
                </div>
            </div>

            <div
                className="flex flex-wrap gap-6 overflow-x-auto snap-x snap-mandatory scroll-p-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none]"
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