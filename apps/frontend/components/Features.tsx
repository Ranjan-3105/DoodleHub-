"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Zap, Users, Link2, Save, Palette, Smartphone } from 'lucide-react';

const Features = () => {
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

  const features = [
    {
      icon: Zap,
      title: "Real-time Collaboration",
      description: "See changes instantly as your team draws and edits together. No delays, no conflicts.",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: Palette,
      title: "Minimalist Drawing Tools",
      description: "Clean, intuitive tools that focus on creativity without overwhelming complexity.",
      gradient: "from-blue-400 to-blue-600"
    },
    {
      icon: Link2,
      title: "Shareable Link System",
      description: "One click to share your canvas. No accounts needed, just pure collaboration.",
      gradient: "from-green-400 to-green-600"
    },
    {
      icon: Save,
      title: "Offline Autosave",
      description: "Never lose your work. Everything saves automatically, even when offline.",
      gradient: "from-purple-400 to-purple-600"
    },
    {
      icon: Users,
      title: "Multi-user Cursors",
      description: "See exactly where your teammates are working with real-time cursor tracking.",
      gradient: "from-pink-400 to-pink-600"
    },
    {
      icon: Smartphone,
      title: "Cross-platform",
      description: "Works seamlessly on desktop, tablet, and mobile. Draw anywhere, anytime.",
      gradient: "from-indigo-400 to-indigo-600"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div ref={ref} className={`text-center mb-20 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need for seamless collaboration, wrapped in a beautiful, 
            distraction-free interface.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group transition-all duration-800 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 h-full">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover indicator */}
                <div className={`h-1 bg-gradient-to-r ${feature.gradient} rounded-full mt-6 w-0 group-hover:w-full transition-all duration-500`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature showcase */}
        <div className={`mt-20 bg-white rounded-3xl p-8 md:p-12 shadow-xl max-w-5xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`} style={{ transitionDelay: '800ms' }}>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">See It In Action</h3>
            <p className="text-gray-600">Experience the magic of real-time collaboration</p>
          </div>
          
          <div className="bg-gray-900 rounded-2xl p-6 relative overflow-hidden">
            {/* Mock terminal */}
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            
            {/* Animated demo */}
            <div className="grid grid-cols-2 gap-6 h-40">
              <div className="space-y-3">
                <div className="h-3 bg-blue-400 rounded animate-expand-repeat"></div>
                <div className="h-3 bg-purple-400 rounded animate-expand-repeat" style={{ animationDelay: '0.5s' }}></div>
                <div className="h-3 bg-pink-400 rounded animate-expand-repeat" style={{ animationDelay: '1s' }}></div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center animate-pulse-scale">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;