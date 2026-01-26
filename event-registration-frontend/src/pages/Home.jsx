import React from "react";
//import { CollegeLogo } from "components/CollegeLogo";
import { Button } from "@/components/ui/button";
import { HeroIllustration } from "components/HeroIllustration";
import { useNavigate } from "react-router-dom";
import { OurStory } from "@/components/OurStory";
import { MissionValues } from "@/components/MissionValues";
import { WhatWeOffer } from "@/components/WhatWeOffer";
import { JoinUsCTA } from "@/components/JoinUsCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 pb-16 relative overflow-hidden">
      
      {/* Decorative floating blobs */}
      <div 
        className="absolute top-40 right-[5%] w-64 h-64 rounded-full bg-gradient-to-br from-pink-200/40 to-purple-300/40 blur-3xl animate-float-slow" 
        style={{ animationDelay: "1s" }} 
      />
      <div 
        className="absolute bottom-40 left-[10%] w-80 h-80 rounded-full bg-gradient-to-tr from-blue-200/30 to-violet-300/30 blur-3xl animate-float" 
        style={{ animationDelay: "0.5s" }} 
      />
      <div 
        className="absolute top-[30%] left-[15%] w-40 h-40 rounded-full bg-gradient-to-br from-orange-200/30 to-pink-300/30 blur-3xl animate-float-slow" 
        style={{ animationDelay: "1.5s" }} 
      />

      <main className="container mx-auto px-4 pt-16">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Left Content */}
            <div className="space-y-8 max-w-lg">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-brand text-gray-800 leading-tight">
                Never Miss a College Event Again
              </h1>
              <p className="text-lg md:text-xl text-gray-600">
                All your campus events in one place – discover, register, and stay updated in real time.
              </p>
              <Button
                onClick={() => navigate("/search")}
                className="bg-gradient-to-r from-[#310C7E] to-[#9372C1] hover:from-[#9372c1] hover:to-[#310C7E] 
                           text-white text-lg py-6 px-8 rounded-full shadow-[0_4px_14px_-3px_rgba(226,73,157,0.5)]
                           hover:shadow-[0_8px_20px_-3px_rgba(226,73,157,0.7)] hover:scale-105 
                           transition-all duration-200 animate-float-slow"
              >
                🎟️ Start Exploring
              </Button>
            </div>

            {/* Right Illustration */}
            <div className="h-[400px] md:h-[500px] relative">
              <HeroIllustration />
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <OurStory />
        
        {/* Mission & Values Section */}
        <MissionValues />
        
        {/* What We Offer Section */}
        <WhatWeOffer />
      
        
        {/* Join Us CTA Section */}
        <JoinUsCTA />
      </main>
      <Footer />
    </div>
  );
}
