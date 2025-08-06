"use client"
import React, { useState, useEffect } from 'react';
import { Palette, X } from 'lucide-react';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the floating CTA after scrolling 100vh
      const scrolled = window.scrollY > window.innerHeight;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartDoodling = () => {
    // Simulate starting a new doodle session
    console.log('Starting new doodle session...');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-scale-in">
      {isMinimized ? (
        // Minimized state - just the icon
        <button
          onClick={() => setIsMinimized(false)}
          className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
        >
          <Palette className="w-6 h-6 text-white" />
        </button>
      ) : (
        // Full CTA state
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 max-w-sm animate-slide-in-right">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Palette className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Ready to create?</span>
            </div>
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <p className="text-gray-600 text-sm mb-4">
            Start your collaborative drawing session now!
          </p>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleStartDoodling}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Start Doodling
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg text-sm hover:bg-gray-200 hover:scale-105 transition-all duration-300">
              Join Room
            </button>
          </div>

          {/* Pulse indicator */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping">
            <div className="w-full h-full bg-green-400 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingCTA;