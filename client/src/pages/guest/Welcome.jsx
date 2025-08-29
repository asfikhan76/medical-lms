import React, { useEffect, useState } from "react"
import LandingHeader from "@components/LandingHeader"
import LandingHero from "@components/LandingHero"
import InstagramLoader from "@components/InstagramLoader"

const Welcome = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [videoLoading, setVideoLoading] = useState(true)

    useEffect(() => {
        setVideoLoading(true)
    }, [activeIndex])

    const featureItems = [
        {
            title: "Detailed Performance Tracking",
            description:
                "Track test scores, topic-wise strengths and weaknesses, and progress trends to focus your study where it matters most.",
            videoId: "dQw4w9WgXcQ",
        },
        {
            title: "Study from Anywhere",
            description:
                "Responsive web app optimized for mobile and desktop so you can learn on the go without missing a beat.",
            videoId: "a_pLEynHiPY",
        },
        {
            title: "Dynamic Study Planner",
            description:
                "An adaptive planner that prioritizes topics based on your performance and upcoming goals.",
            videoId: "9bZkp7q19f0",
        },
        {
            title: "Detailed Performance Tracking",
            description:
                "Track test scores, topic-wise strengths and weaknesses, and progress trends to focus your study where it matters most.",
            videoId: "dQw4w9WgXcQ",
        },
        {
            title: "Study from Anywhere",
            description:
                "Responsive web app optimized for mobile and desktop so you can learn on the go without missing a beat.",
            videoId: "a_pLEynHiPY",
        },
    ]


    return (
        <main>
            {/* Header  */}
            <LandingHeader />

            {/* Hero Section */}
            <LandingHero />

            {/* Features */}
            <section className="bg-[#020617]">
                <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 pt-12">
                    <h2 className="text-3xl font-bold text-white mb-4 md:text-center">Learn smarter with tools built for <span className="text-teal-600">Medical Mastery</span></h2>
                    <p className="text-white md:text-center md:w-[75%] mx-auto mb-6">Master complex topics faster with data‑driven insights, flexible access, and an adaptive study planner. Track your progress, study anywhere, and focus on what moves your score.</p>
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 mt-16">
                        {/* Left: 60% */}
                        <div className="lg:col-span-3">
                            <div className="divide-y divide-slate-800 rounded-xl border border-slate-800">
                                {featureItems.map((item, index) => {
                                    const isActive = index === activeIndex
                                    return (
                                        <div key={item.title} className="bg-slate-900/40">
                                            <button
                                                type="button"
                                                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-slate-900/60 transition-colors"
                                                onClick={() => setActiveIndex(index)}
                                            >
                                                <span className="text-white font-medium">
                                                    {item.title}
                                                </span>
                                                <span className={`ml-auto h-5 w-5 shrink-0 rounded-full border border-slate-700 grid place-items-center text-slate-300 transition-transform ${isActive ? "rotate-180" : "rotate-0"}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                                        <path fillRule="evenodd" d="M12 14.121l-5.303-5.304a1 1 0 10-1.414 1.415l6.01 6.01a1 1 0 001.414 0l6.01-6.01a1 1 0 10-1.414-1.415L12 14.12z" clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                            </button>
                                            {isActive && (
                                                <div className="px-5 pb-5 text-slate-300">
                                                    <p className="leading-relaxed">{item.description}</p>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Right: 40% */}
                        <div className="lg:col-span-2">
                            <div className="sticky top-6">
                                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-800 bg-black">
                                    {videoLoading && (
                                        <div className="absolute inset-0 grid place-items-center bg-black/60">
                                            <InstagramLoader />
                                        </div>
                                    )}
                                    <iframe
                                        title={featureItems[activeIndex].title}
                                        className="h-full w-full"
                                        src={`https://www.youtube.com/embed/${featureItems[activeIndex].videoId}?rel=0&modestbranding=1`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        onLoad={() => setVideoLoading(false)}
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="pt-10 bg-[#020617]"></section>


        </main>
    )
}

export default Welcome