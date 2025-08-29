import React from "react";

const PlanCard = ({ plan }) => {
    return (
        <div className="h-full rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900/70 transition-colors">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-t-xl p-3">
                <img src={plan.image} alt={plan.name} className="h-full w-full object-cover rounded-lg bg-white" />
            </div>
            <div className="p-5 flex flex-col gap-4">
                <div className="flex items-baseline justify-between">
                    <h4 className="text-white text-lg font-semibold">{plan.name}</h4>
                    <span className="text-teal-600 font-bold text-xl">{plan.price}</span>
                </div>
                <ul className="space-y-2 h-[90px]">
                    {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-slate-300">
                            <span className="mt-1 inline-flex h-4 w-4 items-center justify-center rounded-full border border-teal-600 text-teal-600 text-[10px]">✓</span>
                            <span>{f}</span>
                        </li>
                    ))}
                </ul>
                <button className="mt-2 inline-flex items-center cursor-pointer justify-center rounded-lg border border-teal-600 px-4 py-2 text-teal-600 hover:bg-teal-600 hover:text-white transition-colors">
                    Buy Now
                </button>
            </div>
        </div>
    )
}

export default PlanCard