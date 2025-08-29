import React from 'react'
import LandingHeroImg from "@assets/img/Researchers-cuate.png"

const LandingHero = () => {
    return (
        <div className="w-full bg-[#020617]  relative">
            {/* Magenta Orb Grid Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "#020617",
                    backgroundImage: `
                        linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
                        radial-gradient(circle at 50% 60%, rgba(13,148,136,0.15) 0%, rgba(13,148,136,0.05) 40%, transparent 70%)
                    `,
                    backgroundSize: "40px 40px, 40px 40px, 100% 100%",
                }}
            />
            {/* Your Content/Components */}
            <section className="lg:grid relative w-full z-2">
                <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 py-8"
        >
                    <div className="max-w-prose text-left">
                        <h1 className="text-4xl font-bold text-white sm:text-5xl leading-15 montserrat-700 italic">
                            Master Your <br /> Medical
                            <strong className="text-teal-600"> Exams </strong>
                            with Confidence ...
                        </h1>

                        <p className="mt-4 text-base text-pretty text-white sm:text-lg/relaxed">
                            Prepare with a vast collection of expertly designed questions, detailed explanations, and real exam simulations. Build your confidence, track your progress, and achieve your medical career goals.
                        </p>

                        <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:mt-6">
                            <a
                                className="inline-block rounded border border-teal-600 bg-teal-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-teal-700"
                                href="#"
                            >
                                Get Exam-Ready Today
                            </a>

                            <a
                                className="inline-block rounded border bg-white text-teal-900  sm:text-white sm:bg-transparent  border-gray-200 px-5 py-3 font-medium shadow-sm transition-colors hover:bg-gray-50 hover:text-teal-900"
                                href="#"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                    {/* svg */}
                    <div className='fade-edges flex justify-end mt-10 md:mt-0'>
                        <img src={LandingHeroImg} alt="" className='w-[100%] md:w-[90%]' />
                    </div>

                </div>
            </section>
        </div>
    )
}

export default LandingHero