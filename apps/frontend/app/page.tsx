"use client"
import Hero from "@/components/Hero"
import Features from "@/components/Features";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/UseCases";


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <HowItWorks />
      <Features />
      <UseCases />
      <Footer />
      <FloatingCTA />
    </div>
  );
}
