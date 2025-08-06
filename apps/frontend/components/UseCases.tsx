"use client"
import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap, Users, Palette, Lightbulb } from 'lucide-react';

const UseCases = () => {
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

  const useCases = [
    {
      icon: GraduationCap,
      title: "Teachers & Students",
      description: "Interactive lessons, collaborative assignments, and visual learning experiences.",
      examples: ["Virtual whiteboards", "Collaborative problem solving", "Interactive presentations"],
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      icon: Users,
      title: "Remote Teams",
      description: "Bridge the distance with visual collaboration that brings remote teams together.",
      examples: ["Sprint planning", "Architecture diagrams", "Team brainstorming"],
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100"
    },
    {
      icon: Palette,
      title: "UI/UX Designers",
      description: "Sketch wireframes, create user flows, and collaborate on design concepts.",
      examples: ["Wireframe sketching", "User journey mapping", "Design critiques"],
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100"
    },
    {
      icon: Lightbulb,
      title: "Brainstormers",
      description: "Turn abstract ideas into visual concepts with unlimited creative freedom.",
      examples: ["Mind mapping", "Concept development", "Creative workshops"],
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div ref={ref} className={`text-center mb-20 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Perfect For Every Creator
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're teaching, designing, or brainstorming, 
            DoodleHub adapts to your creative workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className={`group transition-all duration-800 ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : `opacity-0 ${index % 2 === 0 ? '-translate-x-12' : 'translate-x-12'}`
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className={`bg-gradient-to-br ${useCase.bgColor} rounded-3xl p-8 h-full border border-gray-100 transition-all duration-300 group-hover:shadow-xl hover:scale-105`}>
                {/* Icon and title */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${useCase.color} rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <useCase.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{useCase.title}</h3>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                  {useCase.description}
                </p>

                {/* Examples */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Use Cases
                  </p>
                  <div className="space-y-2">
                    {useCase.examples.map((example, exampleIndex) => (
                      <div
                        key={exampleIndex}
                        className={`flex items-center gap-3 transition-all duration-500 ${
                          isVisible 
                            ? 'opacity-100 translate-x-0' 
                            : 'opacity-0 -translate-x-5'
                        }`}
                        style={{ transitionDelay: `${(index * 200) + (exampleIndex * 100)}ms` }}
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${useCase.color} rounded-full`}></div>
                        <span className="text-gray-700">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative element */}
                <div className={`h-1 bg-gradient-to-r ${useCase.color} rounded-full mt-6 w-0 group-hover:w-full transition-all duration-500`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className={`mt-20 bg-gradient-to-r from-gray-900 to-blue-900 rounded-3xl p-8 md:p-12 text-white transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Trusted by Creative Teams</h3>
            <p className="text-blue-200 text-lg">Join thousands of creators worldwide</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className={`transition-all duration-800 ${isVisible ? 'scale-100' : 'scale-0'}`} style={{ transitionDelay: '1000ms' }}>
              <div className="text-4xl font-bold mb-2">10+</div>
              <p className="text-blue-200">Active Users</p>
            </div>
            <div className={`transition-all duration-800 ${isVisible ? 'scale-100' : 'scale-0'}`} style={{ transitionDelay: '1200ms' }}>
              <div className="text-4xl font-bold mb-2">2k+</div>
              <p className="text-blue-200">Drawings Created</p>
            </div>
            <div className={`transition-all duration-800 ${isVisible ? 'scale-100' : 'scale-0'}`} style={{ transitionDelay: '1400ms' }}>
              <div className="text-4xl font-bold mb-2">99%</div>
              <p className="text-blue-200">Uptime</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;