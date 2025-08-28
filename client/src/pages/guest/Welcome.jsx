import React from "react"
import LandingHeader from "@components/LandingHeader"
import LandingHero from "@components/LandingHero"

const Welcome = () => {
    return (
        <main>
            {/* Header  */}
            <LandingHeader />

            {/* Hero Section */}
            <LandingHero />
            <LandingHeader />
        </main>
    )
}

export default Welcome