"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Plus, UserPlus, Paintbrush } from 'lucide-react';

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '-100px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      icon: Plus,
      title: "Create Room",
      description: "Start a new collaborative canvas in seconds. No signup required.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: UserPlus,
      title: "Invite Collaborators",
      description: "Share your room link and invite team members to join instantly.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Paintbrush,
      title: "Draw Together",
      description: "Create, sketch, and brainstorm in real-time with your team.",
      color: "from-pink-500 to-pink-600"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div ref={ref} className={`text-center mb-20 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started with DoodleHub in three simple steps. 
            No complex setup, just pure collaborative creativity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative transition-all duration-800 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-transparent z-0"></div>
              )}
              
              <div className="text-center relative z-10">
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 text-gray-400 rounded-full font-bold text-xl mb-6">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl mb-6 shadow-lg hover:scale-110 hover:rotate-3 transition-all duration-300`}>
                  <step.icon className="w-10 h-10 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed max-w-sm mx-auto">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Demo flow visualization */}
        <div className={`mt-20 max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="space-y-4">
                <div className="w-full h-2 bg-blue-200 rounded animate-pulse"></div>
                <div className="w-3/4 h-2 bg-blue-200 rounded animate-pulse"></div>
                <div className="w-1/2 h-2 bg-blue-200 rounded animate-pulse"></div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full mx-auto mb-4 animate-spin"></div>
                <p className="text-purple-600 font-semibold">Real-time Sync</p>
              </div>
              <div className="space-y-4">
                <div className="w-full h-2 bg-purple-200 rounded animate-pulse"></div>
                <div className="w-2/3 h-2 bg-purple-200 rounded animate-pulse"></div>
                <div className="w-5/6 h-2 bg-purple-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;