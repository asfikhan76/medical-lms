import React, { useEffect, useState } from "react"
import LandingHeader from "@components/LandingHeader"
import LandingHero from "@components/LandingHero"
import PlansSection from "@components/PlansSection"
import Features from "@components/Features"
import Footer from "@components/Footer"

const Welcome = () => {


    return (
        <main className="bg-[#020617]">
            {/* Header  */}
            <header className="bg-gray-900 sticky top-0 z-3">
                <LandingHeader />
            </header>

            {/* Hero Section */}
            <div className="w-full bg-[#020617]  relative fade-bottom">
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
                    <LandingHero />
                </section>
            </div>

            {/* Features */}
            <section className="">
                <Features />
            </section>

            {/* Plans */}
            <section className="pt-20">
                <PlansSection />
            </section>

            <footer className="bg-slate-950 border-t border-slate-800">
                <Footer />
            </footer>

        </main>
    )
}

export default Welcome



